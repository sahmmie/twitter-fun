import React from 'react';
import type { Tweet } from '../types';

interface TweetCardProps {
  tweet: Tweet;
  isShared?: boolean;
}

const TweetCard: React.FC<TweetCardProps> = ({ tweet, isShared = false }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
              {tweet.author?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="ml-3">
              <p className="text-sm font-semibold text-gray-900">
                {tweet.author?.name || 'Unknown User'}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(tweet.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          
          <p className="text-gray-800 mt-3 whitespace-pre-wrap">{tweet.content}</p>
          
          {isShared && (
            <div className="mt-3 flex items-center text-sm text-blue-600">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Shared with you
            </div>
          )}
          
          {!isShared && tweet.sharedWith && tweet.sharedWith.length > 0 && (
            <div className="mt-3 text-sm text-gray-500">
              Shared with {tweet.sharedWith.length} user{tweet.sharedWith.length > 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TweetCard;

