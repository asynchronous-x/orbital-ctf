'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import PageLayout from '@/components/layouts/PageLayout';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import TabButton from '@/components/common/TabButton';
import ChallengesTab from '@/components/admin/ChallengesTab';
import UsersTab from '@/components/admin/UsersTab';
import TeamsTab from '@/components/admin/TeamsTab';
import AnnouncementsTab from '@/components/admin/AnnouncementsTab';
import GameConfigurationTab from '@/components/admin/GameConfigurationTab';
import SiteConfigurationTab from '@/components/admin/SiteConfigurationTab';
import { Tab } from '@/types';

const TABS = [
  { id: 'challenges' as Tab, label: 'Challenges' },
  { id: 'users' as Tab, label: 'Users' },
  { id: 'teams' as Tab, label: 'Teams' },
  { id: 'announcements' as Tab, label: 'Announcements' },
  { id: 'siteconfig' as Tab, label: 'Site Configuration' },
  { id: 'configuration' as Tab, label: 'Game Configuration' },
] as const;

export default function AdminDashboard() {
  const { status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('challenges');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  return (
    <PageLayout title="Admin Dashboard" maxWidth="6xl">
      <div className="mt-6">
        {/* Navigation Tabs - Horizontal scroll on mobile */}
        <div className="flex overflow-x-auto pb-2 gap-2 hide-scrollbar">
          {TABS.map(tab => (
            <TabButton
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </TabButton>
          ))}
        </div>

        {/* Content Area - Conditionally render the active tab */}
        <div className="mt-6">
          {activeTab === 'challenges' && <ChallengesTab />}
          {activeTab === 'users' && <UsersTab />}
          {activeTab === 'teams' && <TeamsTab />}
          {activeTab === 'announcements' && <AnnouncementsTab />}
          {activeTab === 'siteconfig' && <SiteConfigurationTab />}
          {activeTab === 'configuration' && <GameConfigurationTab />}
        </div>
      </div>
    </PageLayout>
  );
}