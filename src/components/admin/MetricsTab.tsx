import { useState, useEffect } from 'react';
import { ApiError, AdminMetrics } from '@/types';
import { fetchAdminMetrics } from '@/utils/api';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function MetricsTab() {
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const data = await fetchAdminMetrics();
        setMetrics(data);
      } catch (err) {
        const error = err as ApiError;
        setError(error.error);
        console.error('Error fetching metrics:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadMetrics();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-400">Error loading metrics: {error}</div>;
  }

  if (!metrics) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-gray-800 p-4 rounded border border-gray-700">
        <h3 className="text-lg font-semibold mb-2">Teams</h3>
        <p className="text-3xl font-bold text-blue-400">{metrics.totalTeams}</p>
      </div>
      <div className="bg-gray-800 p-4 rounded border border-gray-700">
        <h3 className="text-lg font-semibold mb-2">Users</h3>
        <p className="text-3xl font-bold text-blue-400">{metrics.totalUsers}</p>
      </div>
      <div className="bg-gray-800 p-4 rounded border border-gray-700">
        <h3 className="text-lg font-semibold mb-2">Challenges</h3>
        <p className="text-3xl font-bold text-blue-400">{metrics.totalChallenges}</p>
      </div>
      <div className="bg-gray-800 p-4 rounded border border-gray-700">
        <h3 className="text-lg font-semibold mb-2">Possible Points</h3>
        <p className="text-3xl font-bold text-blue-400">{metrics.totalPossiblePoints}</p>
      </div>
      <div className="bg-gray-800 p-4 rounded border border-gray-700">
        <h3 className="text-lg font-semibold mb-2">Submissions</h3>
        <p className="text-3xl font-bold text-blue-400">{metrics.totalSubmissions}</p>
      </div>
      <div className="bg-gray-800 p-4 rounded border border-gray-700">
        <h3 className="text-lg font-semibold mb-2">Points Earned</h3>
        <p className="text-3xl font-bold text-blue-400">{metrics.totalPointsEarned}</p>
      </div>
    </div>
  );
}
