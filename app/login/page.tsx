'use client';

import { signIn } from 'next-auth/react';
import { FormEvent, useState } from 'react';

const Page = () => {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
      const res = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (res?.ok) {
        window.location.href = '/'; // ✅ change to your desired page
      } else {
        alert('Invalid username or password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-64'>
        <input
          type='text'
          name='username'
          placeholder='Username'
          className='border p-2'
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          className='border p-2'
        />
        <button
          type='submit'
          className='bg-blue-500 text-white py-2 disabled:opacity-50'
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Page;
