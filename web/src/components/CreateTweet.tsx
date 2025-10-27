import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createTweet, clearError } from '../store/tweetsSlice';
import { tweetService } from '../services/tweetService';
import type { User } from '../types';
import Textarea from './Textarea';
import Button from './Button';

const CreateTweet: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.tweets);
  
  const [content, setContent] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [showUserSelect, setShowUserSelect] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const fetchedUsers = await tweetService.getAllUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      return;
    }

    const result = await dispatch(createTweet({
      content: content.trim(),
      sharedWith: selectedUsers,
    }));

    if (createTweet.fulfilled.match(result)) {
      setContent('');
      setSelectedUsers([]);
      setShowUserSelect(false);
    }
  };

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Create a Tweet</h2>
      
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Textarea
          placeholder="What's happening?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="mb-4"
          required
        />

        <div className="mb-4">
          <button
            type="button"
            onClick={() => setShowUserSelect(!showUserSelect)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Share with users ({selectedUsers.length} selected)
          </button>

          {showUserSelect && (
            <div className="mt-3 border border-gray-200 rounded-lg p-4 max-h-60 overflow-y-auto">
              {loadingUsers ? (
                <p className="text-gray-500">Loading users...</p>
              ) : users.length === 0 ? (
                <p className="text-gray-500">No other users available</p>
              ) : (
                <div className="space-y-2">
                  {users.map((user) => (
                    <label
                      key={user.id}
                      className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleUserSelection(user.id)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            isLoading={loading}
            disabled={!content.trim()}
          >
            Post Tweet
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTweet;

