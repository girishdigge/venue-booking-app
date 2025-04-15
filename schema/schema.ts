import { z } from 'zod';
import { isValidDDMMYYYY, parseDDMMYYYY } from '@/lib/dateValidate';

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

export const eventSchema = z
  .object({
    name: z.string().min(3, 'name is required, min 3 characters long.'),
    email: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!val) return true; // Allow empty/undefined
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(val);
        },
        { message: 'Invalid email format' }
      ),
    date: z
      .string({ required_error: 'Event date is required' })
      .refine(isValidDDMMYYYY, {
        message: 'Date must be in DD/MM/YYYY format and be a valid date',
      })
      .transform(parseDDMMYYYY),
    startTime: z.coerce
      .date({ invalid_type_error: 'Invalid start time format' })
      .optional(),
    endTime: z.coerce
      .date({ invalid_type_error: 'Invalid end time format' })
      .optional(),
    contact: z.string().optional(),
    address: z.string().optional(),
    event: z
      .string()
      .min(1, 'Event type is required (e.g., Wedding, Birthday)'),
    hall: z.string().min(1, 'Hall/Venue name is required'),
    details: z.string().optional(),
    amount: z
      .number()
      .int('Amount must be an integer')
      .min(0, 'Amount cannot be negative')
      .default(0),
    advance: z
      .number()
      .int('Advance must be an integer')
      .min(0, 'Advance cannot be negative')
      .default(0),
  })
  .refine(
    (data) => {
      // If both startTime and endTime are provided, endTime must be after startTime
      if (data.startTime && data.endTime) {
        return data.endTime > data.startTime;
      }
      // If one or both are missing, this validation passes
      return true;
    },
    {
      message: 'End time must be after start time',
      // Specify the path to show the error message near the endTime field
      path: ['endTime'],
    }
  );

export type SignInSchema = z.infer<typeof signInSchema>;
export type EventSchema = z.infer<typeof eventSchema>;
