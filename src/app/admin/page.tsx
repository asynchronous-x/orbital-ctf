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
import SubmissionsTab from '@/components/admin/SubmissionsTab';
import ActivityLogTab from '@/components/admin/ActivityLogTab';
import GameConfigurationTab from '@/components/admin/GameConfigurationTab';
import SiteConfigurationTab from '@/components/admin/SiteConfigurationTab';
import MetricsTab from '@/components/admin/MetricsTab';
import { Tab } from '@/types';

const TABS = [
  { id: 'metrics' as Tab, label: 'Metrics' },
  { id: 'challenges' as Tab, label: 'Challenges' },
  { id: 'users' as Tab, label: 'Users' },
  { id: 'teams' as Tab, label: 'Teams' },
  { id: 'submissions' as Tab, label: 'Submissions' },
  { id: 'announcements' as Tab, label: 'Announcements' },
  { id: 'activity' as Tab, label: 'Activity Log' },
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
          {activeTab === 'metrics' && <MetricsTab />}
          {activeTab === 'users' && <UsersTab />}
          {activeTab === 'teams' && <TeamsTab />}
          {activeTab === 'submissions' && <SubmissionsTab />}
          {activeTab === 'announcements' && <AnnouncementsTab />}
          {activeTab === 'activity' && <ActivityLogTab />}
          {activeTab === 'siteconfig' && <SiteConfigurationTab />}
          {activeTab === 'configuration' && <GameConfigurationTab />}
        </div>
      </div>
    </PageLayout>
  );
}