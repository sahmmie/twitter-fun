import api from './api';
import type { Tweet, CreateTweetData, User, ApiResponse } from '../types';

export const tweetService = {
  async createTweet(data: CreateTweetData): Promise<Tweet> {
    const response = await api.post<ApiResponse<Tweet>>('/tweets', data);
    return response.data.data;
  },

  async getUserTweets(): Promise<Tweet[]> {
    const response = await api.get<ApiResponse<Tweet[]>>('/tweets/my-tweets');
    return response.data.data;
  },

  async getSharedTweets(): Promise<Tweet[]> {
    const response = await api.get<ApiResponse<Tweet[]>>('/tweets/shared-with-me');
    return response.data.data;
  },

  async getAllUsers(): Promise<User[]> {
    const response = await api.get<ApiResponse<User[]>>('/users');
    return response.data.data;
  },
};

