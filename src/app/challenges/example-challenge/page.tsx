'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Righteous } from 'next/font/google';
import { MarkdownComponents } from '@/components/MarkdownComponents';
import toast from 'react-hot-toast';
import { IoArrowBack } from 'react-icons/io5';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });


interface Challenge {
  id: string;
  title: string;
  description?: string;
  points: number;
  difficulty: string;
  isSolved?: boolean;
  category: string;
  solvedByTeamId?: string;
  files?: {
    name: string;
    path: string;
    size: number;
  }[];
  isLocked?: boolean;
  unlockReason?: string;
}

interface Hint {
  id: string;
  content: string;
  cost: number;
  isPurchased: boolean;
}

// Mock data for example challenge
const mockChallenge: Challenge = {
  id: 'example-challenge',
  title: 'Web Challenge 1',
  description: 'Find the hidden flag in this web application. The flag format is CTF{...}',
  points: 100,
  difficulty: 'Easy',
  isSolved: false,
  category: 'Web',
  files: [
    {
      name: 'web-challenge.zip',
      path: '/files/web-challenge.zip',
      size: 1024
    }
  ],
  isLocked: false
};

const mockHints: Hint[] = [
  {
    id: '1',
    content: 'Check the source code of the page',
    cost: 10,
    isPurchased: true
  },
  {
    id: '2',
    content: 'Look for hidden directories',
    cost: 20,
    isPurchased: false
  },
  {
    id: '3',
    content: 'The flag is in a file named flag.txt',
    cost: 30,
    isPurchased: false
  }
];

export default function ExampleChallengePage() {
  const router = useRouter();
  const [flag, setFlag] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState<{
    message: string;
    isCorrect: boolean;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(`/api/files/download?filename=${encodeURIComponent(filename)}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Error downloading file. Please try again.');
    }
  };

  const handlePurchaseHint = async () => {
    setIsPurchasing(true);
    try {
      // Simulate hint purchase
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      toast.success('Hint purchased successfully!');
    } catch (error) {
      console.error('Error purchasing hint:', error);
      toast.error('Error purchasing hint');
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);

    try {
      // Simulate flag submission
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      const isCorrect = flag === 'CTF{example_flag}';
      setSubmissionStatus({
        message: isCorrect ? 'Correct flag! Challenge solved!' : 'Incorrect flag. Try again.',
        isCorrect
      });
      if (isCorrect) {
        toast.success('Flag submitted successfully!');
      }
    } catch (error) {
      console.error('Error submitting flag:', error);
      setSubmissionStatus({
        message: 'Error submitting flag. Please try again.',
        isCorrect: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (mockChallenge.isLocked) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-8 border bg-black/90 max-w-md">
          <h1 className="text-3xl font-bold mb-4">Challenge Locked</h1>
          <p className="text-gray-300 mb-2">Title: {mockChallenge.title}</p>
          <p className="text-gray-300 mb-2">Category: {mockChallenge.category}</p>
          <p className="text-gray-300 mb-4">Points: {mockChallenge.points}</p>
          <p className="text-yellow-400 mb-6">Reason: {mockChallenge.unlockReason || 'Unlock conditions not met.'}</p>
          <button 
            onClick={() => router.back()} 
            className="px-4 py-2 border border-white hover:bg-white hover:text-black flex items-center mx-auto"
          >
            <IoArrowBack className="mr-2" /> Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="container mx-auto px-4 py-8 flex justify-center items-center">
        <div className="w-full max-w-5xl overflow-hidden">
          <div className="h-[80vh] overflow-y-auto">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
              <h1 className={`text-5xl font-bold ${righteous.className}`}>{mockChallenge.title}</h1>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-2 md:mt-0">
                <span className="px-3 py-1 bg-green-500/10 border border-green-500 text-green-400 rounded-full font-mono text-sm">
                  {mockChallenge.points} POINTS
                </span>
                <span className="px-3 py-1 bg-blue-500/10 border border-blue-500 text-blue-400 rounded-full font-mono text-sm">
                  {mockChallenge.category.toUpperCase()}
                </span>
              </div>
            </div>
            <div className="border border-gray-400 w-full h-5 flex items-center justify-center relative clear-both">
              <div className="absolute inset-x-0 border-t-2 border-gray-400 w-full"></div>
            </div>
            <div className="prose prose-invert max-w-none mb-6 min-h-52">
              <ReactMarkdown
                components={MarkdownComponents}
                remarkPlugins={[remarkGfm]}
                skipHtml={false}
              >
                {mockChallenge.description || ''}
              </ReactMarkdown>
            </div>

            {mockChallenge.files && mockChallenge.files.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Files</h2>
                <div className="border-t-2 border-b-2 border-gray-700 mb-4" />
                <div className="space-y-2">
                  {mockChallenge.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-800">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">📎</span>
                        <span>{file.name}</span>
                        <span className="text-gray-400 text-sm">({file.size} bytes)</span>
                      </div>
                      <button
                        onClick={() => handleDownload(file.path, file.name)}
                        className="px-3 py-1 border border-white hover:bg-white hover:text-black"
                      >
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {mockHints.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Hints</h2>
                <div className="border-t-2 border-b-2 border-gray-700 mb-6" />
                <div className="space-y-4">
                  {mockHints.map((hint) => (
                    <div key={hint.id}>
                      <div className="flex justify-between items-center mb-2">
                        <span>Cost: {hint.cost} points</span>
                        {!hint.isPurchased ? (
                          <button
                            onClick={() => handlePurchaseHint()}
                            disabled={isPurchasing}
                            className="px-4 py-2 border-2 border-white hover:bg-white hover:text-black disabled:opacity-50"
                          >
                            {isPurchasing ? 'Purchasing...' : 'Purchase Hint'}
                          </button>
                        ) : (
                          <span className="px-3 py-1">Purchased</span>
                        )}
                      </div>
                      {hint.isPurchased && (
                        <div className="mt-2 p-3 border-2 border-white">
                          {hint.content}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!mockChallenge.isSolved && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Submit Flag</h2>
                <div className="border-t-2 border-b-2 border-gray-700 mb-6" />
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex gap-4">
                    <input
                      type="text"
                      value={flag}
                      onChange={(e) => setFlag(e.target.value)}
                      placeholder="Enter flag"
                      className="flex-1 px-4 py-2 bg-black border border-white"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 border-2 border-white hover:bg-white hover:text-black disabled:opacity-50"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                  </div>
                  {submissionStatus && (
                    <div className={`p-4 border-2 ${submissionStatus.isCorrect ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'}`}>
                      {submissionStatus.message}
                    </div>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}