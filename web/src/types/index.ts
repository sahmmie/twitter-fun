export interface User {
  id: string;
  email: string;
  name: string;
  createdAt?: string;
}

export interface Tweet {
  id: string;
  content: string;
  authorId: string;
  author?: User;
  sharedWith: string[];
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface TweetState {
  tweets: Tweet[];
  sharedTweets: Tweet[];
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface CreateTweetData {
  content: string;
  sharedWith: string[];
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  statusCode?: number;
}

