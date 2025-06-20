'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import TeamIconSelection from '@/components/auth/TeamIconSelection';
import { signUp } from '@/utils/api';

export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [teamOption, setTeamOption] = useState<'create' | 'join'>('create');
  const [selectedIcon, setSelectedIcon] = useState('GiSpaceship');
  const [selectedColor, setSelectedColor] = useState('#ffffff');

  const handleTeamOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamOption(e.target.value as 'create' | 'join');
  };

  useEffect(() => {
    const createTeamFields = document.getElementById('createTeamFields');
    const joinTeamFields = document.getElementById('joinTeamFields');
    
    if (createTeamFields && joinTeamFields) {
      if (teamOption === 'create') {
        createTeamFields.classList.remove('hidden');
        joinTeamFields.classList.add('hidden');
      } else {
        createTeamFields.classList.add('hidden');
        joinTeamFields.classList.remove('hidden');
      }
    }
  }, [teamOption]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const alias = formData.get('alias') as string;
    const password = formData.get('password') as string;
    const teamName = formData.get('teamName') as string;
    const teamCode = formData.get('teamCode') as string;

    try {
      const data = await signUp({ 
        name,
        alias, 
        password,
        teamOption,
        teamName,
        teamCode,
        teamIcon: selectedIcon,
        teamColor: selectedColor
      });

      toast.success('Account created successfully! Signing you in...');

      const result = await signIn('credentials', {
        alias: data.user.alias,
        password: data.user.password,
        redirect: false,
      });

      if (result?.error) throw new Error('Failed to sign in automatically');

      router.push('/dashboard');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        toast.error(error.message);
      } else {
        setError('An error occurred');
        toast.error('An error occurred');
      }
    }
  };

  return (
    <div className="h-screen w-full overflow-y-auto">
      <div className="min-h-full w-full flex items-center justify-center py-20 px-4 md:py-0">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Create your account and team</h2>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="sr-only">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="input-field"
                placeholder="Full Name"
                maxLength={48}
              />
            </div>
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

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  id="createTeam"
                  name="teamOption"
                  value="create"
                  defaultChecked
                  className="h-4 w-4 text-blue-600"
                  onChange={handleTeamOptionChange}
                />
                <label htmlFor="createTeam">Create a new team</label>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  id="joinTeam"
                  name="teamOption"
                  value="join"
                  className="h-4 w-4 text-blue-600"
                  onChange={handleTeamOptionChange}
                />
                <label htmlFor="joinTeam">Join existing team</label>
              </div>
            </div>

            <div id="createTeamFields">
              <label htmlFor="teamName" className="sr-only">Team Name</label>
              <input
                id="teamName"
                name="teamName"
                type="text"
                className="input-field"
                placeholder="Team Name"
                maxLength={32}
              />
              
              <div className="mt-4">
                <TeamIconSelection
                  selectedIcon={selectedIcon}
                  selectedColor={selectedColor}
                  onIconSelect={setSelectedIcon}
                />

                <div className="mt-4">
                  <label className="block mb-2">Team Color</label>
                  <input
                    type="color"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="w-full h-12 rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div id="joinTeamFields" className="hidden">
              <label htmlFor="teamCode" className="sr-only">Team Code</label>
              <input
                id="teamCode"
                name="teamCode"
                type="text"
                className="input-field"
                placeholder="Team Code"
                maxLength={12}
              />
            </div>

            {error && <div className="text-red-500 text-sm text-center">{error}</div>}

            <button
              type="submit"
              className="button w-full hover:bg-white hover:text-black"
            >
              Sign up
            </button>
            <div className="text-center">
              <Link href="/auth/signin" className="text-gray-500 hover:text-blue-500">
                Already have an account? Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}