import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { TweetState, CreateTweetData } from '../types';
import { tweetService } from '../services/tweetService';

const initialState: TweetState = {
  tweets: [],
  sharedTweets: [],
  loading: false,
  error: null,
};

export const createTweet = createAsyncThunk(
  'tweets/createTweet',
  async (data: CreateTweetData, { rejectWithValue }) => {
    try {
      const tweet = await tweetService.createTweet(data);
      return tweet;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to create tweet');
    }
  }
);

export const fetchUserTweets = createAsyncThunk(
  'tweets/fetchUserTweets',
  async (_, { rejectWithValue }) => {
    try {
      const tweets = await tweetService.getUserTweets();
      return tweets;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch tweets');
    }
  }
);

export const fetchSharedTweets = createAsyncThunk(
  'tweets/fetchSharedTweets',
  async (_, { rejectWithValue }) => {
    try {
      const tweets = await tweetService.getSharedTweets();
      return tweets;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch shared tweets');
    }
  }
);

const tweetsSlice = createSlice({
  name: 'tweets',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Create Tweet
    builder.addCase(createTweet.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createTweet.fulfilled, (state, action) => {
      state.loading = false;
      state.tweets.unshift(action.payload);
      state.error = null;
    });
    builder.addCase(createTweet.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch User Tweets
    builder.addCase(fetchUserTweets.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserTweets.fulfilled, (state, action) => {
      state.loading = false;
      state.tweets = action.payload;
      state.error = null;
    });
    builder.addCase(fetchUserTweets.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch Shared Tweets
    builder.addCase(fetchSharedTweets.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchSharedTweets.fulfilled, (state, action) => {
      state.loading = false;
      state.sharedTweets = action.payload;
      state.error = null;
    });
    builder.addCase(fetchSharedTweets.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearError } = tweetsSlice.actions;
export default tweetsSlice.reducer;

