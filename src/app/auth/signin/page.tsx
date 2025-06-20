'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function SignIn() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const alias = formData.get('alias') as string;
    const password = formData.get('password') as string;

    try {
      const result = await signIn('credentials', {
        alias,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid credentials');
      } else {
        toast.success('Successfully logged in!');
        router.push('/dashboard');
      }
    } catch (error) {
      setError('An error occurred: ' + (error as Error).message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Log in to the CTF</h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="alias" className="sr-only">Alias</label>
            <input
              id="alias"
              name="alias"
              type="text"
              required
              className="input-field"
              placeholder="Alias"
              maxLength={32}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="input-field"
              placeholder="Password"
              maxLength={128}
            />
          </div>

          {error && <div className="text-red-500 text-sm text-center">{error}</div>}

          <button
            type="submit"
            className="button w-full hover:bg-white hover:text-black"
          >
            Log in
          </button>
        </form>
        <div className="text-center pt-6">
          <Link href="/auth/signup" className="text-gray-500 hover:text-blue-500">
            {"Don't have an account? Sign up"}
          </Link>
        </div>
      </div>
    </div>
  );
} 