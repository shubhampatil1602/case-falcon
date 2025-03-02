'use client';

import Link from 'next/link';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { DottedSeparator } from '@/components/DottedSeperator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { loginSchema, loginSchemaType } from '@/lib/schemas';

import Socials from './Socials';
import FormError from './FormError';
import { handleCredentialsSignIn } from '@/actions/authActions';
import { Loader } from 'lucide-react';

const SignIn = () => {
  const [errorMsg, setErrorMsg] = useState<string | undefined>();

  const form = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: loginSchemaType) => {
    try {
      await handleCredentialsSignIn(values);
    } catch (error) {
      setErrorMsg('Invalid Credentials or Try with Socials');
    }
  };

  return (
    <Card className='w-full h-full md:w-[487px] border-none md:mt-14 m-4 shadow-none'>
      <CardHeader className='flex items-center justify-center text-center p-7'>
        <CardTitle className='text-2xl'>Welcome Back!</CardTitle>
      </CardHeader>
      <div className='px-7'>
        <DottedSeparator />
      </div>
      <CardContent className='p-7'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder='Enter email address'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='Enter your password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormError message={errorMsg} />
            <Button
              size='lg'
              className='w-full font-semibold'
              variant='primary'
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Loader className='animate-spin' />
              )}
              Sign In
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className='px-7'>
        <DottedSeparator />
      </div>

      {/* Social Providers */}
      <Socials />

      <div className='px-7'>
        <DottedSeparator />
      </div>
      <CardContent className='p-7 flex items-center justify-center'>
        <p className='text-sm text-neutral-500'>
          Don&apos;t have an account?
          <Link href='/sign-up'>
            <span className='text-blue-700'>&nbsp;Sign Up</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignIn;
