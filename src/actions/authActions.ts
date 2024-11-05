'use server';

import bcryptjs from 'bcryptjs';

import { signIn, signOut } from '@/auth';

import {
  loginSchemaType,
  registerSchema,
  registerSchemaType,
} from '@/lib/schemas';
import db from '@/lib/db';

export async function handleCredentialsSignUp({
  name,
  email,
  password,
}: registerSchemaType) {
  try {
    const parsedCredentials = registerSchema.safeParse({
      name,
      email,
      password,
    });
    if (!parsedCredentials.success) {
      return {
        success: false,
        message: 'Invalid credentials',
      };
    }

    // Check if the email is already in the db
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return {
        success: false,
        message: 'Account already exists. Sign in to continue',
      };
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return {
      success: true,
      message: 'Welcome to casefalcon',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong',
    };
  }
}

export async function handleCredentialsSignIn({
  email,
  password,
}: loginSchemaType) {
  await signIn('credentials', {
    email,
    password,
    redirectTo: '/',
  });
}

export async function handleGoogleSignIn() {
  await signIn('google', {
    redirectTo: '/',
  });
}

export async function handleGithubSignIn() {
  await signIn('github', {
    redirectTo: '/',
  });
}

export async function handleSignout() {
  await signOut({
    redirectTo: '/',
  });
}
