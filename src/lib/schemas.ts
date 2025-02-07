import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: 'Required' }),
});

export type loginSchemaType = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().trim().min(1, { message: 'Required' }),
  email: z.string().email(),
  password: z.string().min(8, { message: 'Minimum of 8 characters required' }),
});

export type registerSchemaType = z.infer<typeof registerSchema>;
