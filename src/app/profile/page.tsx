'use client';

import React, { useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as GiIcons from 'react-icons/gi';
import PageLayout from '@/components/layouts/PageLayout';
import { fetchTeam } from '@/utils/api';
import { Team } from '@/types';

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);

  const loadTeamData = useCallback(async () => {
    try {
      if (session?.user?.teamId) {
        const data = await fetchTeam(session.user.teamId);
        setTeam(data);
      }
    } catch (error) {
      console.error('Error fetching team data:', error);
    } finally {
      setLoading(false);
    }
  }, [session?.user?.teamId]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated' && session?.user?.teamId) {
      loadTeamData();
    }
  }, [status, session, router, loadTeamData]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <PageLayout title="Profile" maxWidth="6xl">

      <div className="prose prose-invert max-w-none mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* User Information */}
          <div className="bg-gray-900/50 p-6 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-6 text-blue-400">User Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm">Name</label>
                <p className="text-white text-lg">{session?.user?.name}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Alias</label>
                <p className="text-white text-lg">{session?.user?.alias}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Role</label>
                <p className="text-white text-lg">
                  {session?.user?.isAdmin ? 'Admin' : session?.user?.isTeamLeader ? 'Team Leader' : 'Member'}
                </p>
              </div>
            </div>
          </div>

          {/* Team Information */}
          {team && (
            <div className="bg-gray-900/50 p-6 border border-gray-700">
              <h2 className="text-2xl font-semibold mb-6 text-blue-400">Team Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm">Team Name</label>
                  <p className="text-white text-lg">{team.name}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Team Code</label>
                  <p className="text-white text-lg font-mono">{team.code}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Team Score</label>
                  <p className="text-white text-lg">{team.score} points</p>
                </div>
                {team.icon && (
                  <div>
                    <label className="text-gray-400 text-sm">Team Icon</label>
                    <div className="mt-2">
                      <span style={{ color: team.color || 'white' }} className="inline-block">
                        {GiIcons[team.icon as keyof typeof GiIcons] ?
                          React.createElement(GiIcons[team.icon as keyof typeof GiIcons], { size: 32 })
                          : team.icon}
                      </span>
                    </div>
                  </div>
                )}
                <div>
                  <label className="text-gray-400 text-sm">Team Members</label>
                  <div className="mt-2 space-y-2">
                    {team.members.map((member) => (
                      <div key={member.id} className="flex items-center space-x-2">
                        <span className="text-white">{member.alias}</span>
                        {member.isTeamLeader && (
                          <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                            Leader
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}