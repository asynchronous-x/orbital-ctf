import { useState, useEffect, useCallback } from 'react';
import { FaPlus } from "react-icons/fa";
import { Announcement, ApiError, NewAnnouncement } from '@/types';
import { fetchAnnouncements, createAnnouncement, deleteAnnouncement } from '@/utils/api';
import AnnouncementModal from './AnnouncementModal';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { toast } from 'react-hot-toast';

export default function AnnouncementsTab() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [announcementToDelete, setAnnouncementToDelete] = useState<Announcement | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newAnnouncement, setNewAnnouncement] = useState<NewAnnouncement>({
    title: '',
    content: '',
  });

  const fetchAnnouncementsData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchAnnouncements();
      setAnnouncements(data);
    } catch (error) {
      const err = error as ApiError;
      setError(err.error);
      toast.error(`Error fetching announcements: ${err.error}`);
      console.error('Error fetching announcements:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnnouncementsData();
  }, [fetchAnnouncementsData]);

  const handleCreateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAnnouncement(newAnnouncement);
      setNewAnnouncement({ title: '', content: '' });
      setIsModalOpen(false);
      await fetchAnnouncementsData();
      toast.success('Announcement created successfully');
    } catch (error) {
      const err = error as ApiError;
      console.error('Error creating announcement:', err);
      toast.error(`Error creating announcement: ${err.error}`);
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    try {
      await deleteAnnouncement(id);
      setAnnouncementToDelete(null);
      await fetchAnnouncementsData();
      toast.success('Announcement deleted successfully');
    } catch (error) {
      const err = error as ApiError;
      console.error('Error deleting announcement:', err.error);
      toast.error(`Error deleting announcement: ${err.error}`);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-400">Error loading announcements: {error}</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-semibold mb-6">Announcements</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
        >
          <FaPlus className="h-5 w-5 mr-2" />
          Add Announcement
        </button>
      </div>

      <div className="space-y-4">
        {announcements.length === 0 ? (
          <p className="text-gray-400 italic">No announcements yet</p>
        ) : (
          announcements.map((announcement) => (
            <div key={announcement.id} className="bg-gray-800/50 hover:bg-gray-800 transition-colors rounded-lg border border-gray-700">
              <div className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium truncate">{announcement.title}</h3>
                    <p className="text-gray-300 mt-1 break-words">{announcement.content}</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Created: {new Date(announcement.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => announcementToDelete?.id === announcement.id
                      ? handleDeleteAnnouncement(announcement.id)
                      : setAnnouncementToDelete(announcement)
                    }
                    onMouseLeave={() => setAnnouncementToDelete(null)}
                    className={`shrink-0 px-4 py-2 rounded-md border transition-colors ${
                      announcementToDelete?.id === announcement.id
                        ? 'bg-red-600 text-white hover:bg-red-700 border-red-600'
                        : 'bg-transparent hover:bg-gray-700 border-gray-600 text-gray-300'
                    }`}
                  >
                    {announcementToDelete?.id === announcement.id ? 'Confirm?' : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <AnnouncementModal
          title="Create New Announcement"
          announcement={newAnnouncement}
          setAnnouncement={setNewAnnouncement}
          onSubmit={handleCreateAnnouncement}
          onClose={() => setIsModalOpen(false)}
          submitText="Create Announcement"
        />
      )}
    </div>
  );
}