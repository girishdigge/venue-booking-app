import { z } from 'zod';

export const signInSchema = z.object({
  username: z.string().min(3, 'Username must contain atleast 3 characters.'),
  password: z.string().min(4, 'Password must contain atleast 4 characters.'),
});

export const signUpSchema = z.object({
  id: z.string().min(1, 'Id cannot be empty'),
  username: z.string().min(3, 'Username must contain atleast 3 characters.'),
  password: z.string().min(4, 'Password must contain atleast 4 characters.'),
  contact: z.string().optional(),
  firstName: z.string().min(1, 'Name must contain atleast 1 characters.'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Surname must contain atleast 1 characters.'),
  role: z.enum(['ROOT', 'ADMIN', 'MANAGER', 'USER']),
  image: z.string().optional(),
});

export type SignInSchema = z.infer<typeof signInSchema>;
