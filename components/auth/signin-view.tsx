'use client';

import UserAuthForm from './user-auth-form';
import { useSearchParams } from 'next/navigation';

export default function SignInViewPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className='relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
        <div className='absolute inset-0 bg-zinc-900' />
        <div className='relative z-20 flex items-center text-lg font-medium'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='mr-2 h-6 w-6'
          >
            <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
          </svg>
          Venue Booking
        </div>
        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg'>
              &ldquo;Book your perfect venue with ease. Our platform helps you
              find and reserve the perfect space for any occasion.&rdquo;
            </p>
            <footer className='text-sm'>Venue Booking Team</footer>
          </blockquote>
        </div>
      </div>
      <div className='flex h-full items-center p-4 lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>
              Login to your account
            </h1>
            <p className='text-sm text-muted-foreground'>
              Enter your username and password below to login to your account
            </p>
            {error && (
              <div className='p-3 bg-red-100/70 border border-red-300 rounded-md text-red-500 text-sm'>
                {error === 'CredentialsSignin'
                  ? 'Invalid username or password'
                  : 'An error occurred during sign in. Please try again.'}
              </div>
            )}
          </div>
          <UserAuthForm />
        </div>
      </div>
    </div>
  );
}
