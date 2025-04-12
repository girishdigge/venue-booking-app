'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const formSchema = z.object({
  username: z.string().min(1, { message: 'Please enter username' }),
  password: z
    .string()
    .min(4, { message: 'Password must be at least 4 characters' }),
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [loading, startTransition] = useTransition();
  const [authError, setAuthError] = useState<string | null>(null);

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: UserFormValue) => {
    setAuthError(null);

    startTransition(async () => {
      try {
        const result = await signIn('credentials', {
          username: data.username,
          password: data.password,
          redirect: false,
        });

        if (result?.error) {
          setAuthError(result.error);
          toast.error('Login failed. Please check your credentials.');
        } else {
          toast.success('Signed in successfully!');
          router.push(callbackUrl);
          router.refresh();
        }
      } catch (error) {
        console.error('Sign in error:', error);
        toast.error('An unexpected error occurred');
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-4'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Enter your username'
                  disabled={loading}
                  autoComplete='username'
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='Enter your password'
                  disabled={loading}
                  autoComplete='current-password'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {authError && (
          <div className='p-2 text-sm text-red-500'>{authError}</div>
        )}

        <Button disabled={loading} className='w-full' type='submit'>
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
    </Form>
  );
}
