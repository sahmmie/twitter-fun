import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchUserTweets, fetchSharedTweets } from '../store/tweetsSlice';
import Layout from '../components/Layout';
import CreateTweet from '../components/CreateTweet';
import TweetCard from '../components/TweetCard';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tweets, sharedTweets, loading } = useAppSelector((state) => state.tweets);
  const [activeTab, setActiveTab] = useState<'my-tweets' | 'shared'>('my-tweets');

  useEffect(() => {
    dispatch(fetchUserTweets());
    dispatch(fetchSharedTweets());
  }, [dispatch]);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

        <CreateTweet />

        <div className="bg-white shadow rounded-lg">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('my-tweets')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'my-tweets'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                My Tweets ({tweets.length})
              </button>
              <button
                onClick={() => setActiveTab('shared')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'shared'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Shared with Me ({sharedTweets.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <>
                {activeTab === 'my-tweets' && (
                  <>
                    {tweets.length === 0 ? (
                      <div className="text-center py-8">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No tweets yet</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by creating a new tweet above.</p>
                      </div>
                    ) : (
                      tweets.map((tweet) => (
                        <TweetCard key={tweet.id} tweet={tweet} />
                      ))
                    )}
                  </>
                )}

                {activeTab === 'shared' && (
                  <>
                    {sharedTweets.length === 0 ? (
                      <div className="text-center py-8">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No shared tweets</h3>
                        <p className="mt-1 text-sm text-gray-500">Tweets shared with you will appear here.</p>
                      </div>
                    ) : (
                      sharedTweets.map((tweet) => (
                        <TweetCard key={tweet.id} tweet={tweet} isShared />
                      ))
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

