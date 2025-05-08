'use client';

import React, { useCallback } from 'react';
import { useEffect, useState } from 'react';
import * as GiIcons from 'react-icons/gi';
import PageLayout from '@/components/layouts/PageLayout';


interface User {
  id: string;
  name: string;
  alias: string;
  isAdmin: boolean;
  isTeamLeader: boolean;
}

interface Team {
  id: string;
  name: string;
  code: string;
  score: number;
  icon?: string;
  color?: string;
  members: {
    id: string;
    alias: string;
    name: string;
    isTeamLeader: boolean;
  }[];
}

export default function Profile() {
  const [team, setTeam] = useState<Team | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      // Static placeholder data for user
      const userData: User = {
        id: '1',
        name: 'John Doe',
        alias: 'captain',
        isAdmin: false,
        isTeamLeader: true
      };

      // Static placeholder data for team
      const teamData: Team = {
        id: '1',
        name: 'Team Alpha',
        code: 'ALPHA',
        score: 1000,
        icon: '🚀',
        color: '#FF0000',
        members: [
          {
            id: '1',
            alias: 'captain',
            name: 'John Doe',
            isTeamLeader: true
          },
          {
            id: '2',
            alias: 'hacker',
            name: 'Jane Smith',
            isTeamLeader: false
          },
          {
            id: '3',
            alias: 'coder',
            name: 'Bob Johnson',
            isTeamLeader: false
          }
        ]
      };

      setUser(userData);
      setTeam(teamData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
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
                <p className="text-white text-lg">{user?.name}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Alias</label>
                <p className="text-white text-lg">{user?.alias}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Role</label>
                <p className="text-white text-lg">
                  {user?.isAdmin ? 'Admin' : user?.isTeamLeader ? 'Team Leader' : 'Member'}
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