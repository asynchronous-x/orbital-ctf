'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import TeamIconSelection from '@/components/auth/TeamIconSelection';

export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [teamOption, setTeamOption] = useState('create');
  const [selectedIcon, setSelectedIcon] = useState('GiSpaceship');
  const [selectedColor, setSelectedColor] = useState('#ffffff');

  const handleTeamOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamOption(e.target.value);
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
    const teamName = formData.get('teamName') as string;
    const teamCode = formData.get('teamCode') as string;

    try {
      // Static placeholder data
      const signupResponse = {
        success: true,
        message: 'Account created successfully',
        user: {
          id: '1',
          name: name,
          alias: alias,
          teamId: '1',
          teamName: teamName,
          teamCode: teamCode
        }
      };

      if (signupResponse.success) {
        router.push('/dashboard');
      } else {
        setError(signupResponse.message);
      }
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
            <h2 className="text-2xl md:text-3xl font-bold">Create your account or team</h2>
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