# Twitter App - Frontend

A modern React application for sharing tweets with other users, built with React, Redux, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## ✨ Features

- ✅ User registration and authentication
- ✅ Login with email and password
- ✅ Post tweets and share with specific users
- ✅ View your tweets and tweets shared with you
- ✅ Change password functionality
- ✅ Mock email notifications (logged to console)
- ✅ Protected routes with authentication
- ✅ Responsive design for mobile and desktop
- ✅ Form validation
- ✅ Loading states and error handling

## 🛠 Tech Stack

- **React 18** - UI library with hooks
- **TypeScript** - Type safety and better DX
- **Redux Toolkit** - State management
- **React Router 7** - Client-side routing
- **Tailwind CSS 4** - Utility-first styling
- **Axios** - HTTP client with interceptors
- **Vite 7** - Fast build tool and dev server

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running (see expected endpoints below)

## 🔧 Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the `.env` file with your backend API URL:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### 3. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### 5. Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
web/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Button.tsx      # Button with variants and loading state
│   │   ├── Input.tsx       # Input field with label and error
│   │   ├── Textarea.tsx    # Textarea with label and error
│   │   ├── Layout.tsx      # Main layout with navigation
│   │   ├── ProtectedRoute.tsx  # Auth guard wrapper
│   │   ├── CreateTweet.tsx # Tweet composer with user selection
│   │   └── TweetCard.tsx   # Tweet display card
│   │
│   ├── pages/             # Page components
│   │   ├── Login.tsx      # Login page with validation
│   │   ├── Register.tsx   # Registration page
│   │   ├── Dashboard.tsx  # Main dashboard with tabs
│   │   └── ChangePassword.tsx  # Password change page
│   │
│   ├── store/             # Redux store and slices
│   │   ├── index.ts       # Store configuration
│   │   ├── hooks.ts       # Typed Redux hooks
│   │   ├── authSlice.ts   # Authentication state
│   │   └── tweetsSlice.ts # Tweets state
│   │
│   ├── services/          # API service layer
│   │   ├── api.ts         # Axios instance with interceptors
│   │   ├── authService.ts # Auth API calls
│   │   └── tweetService.ts # Tweet API calls
│   │
│   ├── types/             # TypeScript definitions
│   │   └── index.ts       # All interfaces and types
│   │
│   ├── utils/             # Utility functions
│   │   └── emailService.ts # Mock email sender
│   │
│   ├── App.tsx            # Main app with routing
│   ├── main.tsx           # Application entry point
│   └── index.css          # Tailwind CSS imports
│
├── public/                # Static assets
├── .env                   # Environment variables (create from .env.example)
├── .env.example           # Environment variables template
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
├── vite.config.ts         # Vite configuration
└── tsconfig.json          # TypeScript configuration
```

## 🎯 Application Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | All | Redirects to `/dashboard` |
| `/login` | Public | User login page |
| `/register` | Public | User registration page |
| `/dashboard` | Protected | Main dashboard with tweets |
| `/change-password` | Protected | Change password form |

## 🔌 API Integration

The frontend expects the backend to implement the following REST API endpoints:

### Authentication Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `POST` | `/api/auth/register` | Register new user | `{ name, email, password }` | `{ user, token }` |
| `POST` | `/api/auth/login` | Login user | `{ email, password }` | `{ user, token }` |
| `PATCH` | `/api/auth/change-password` | Change password | `{ currentPassword, newPassword }` | `{ message }` |
| `GET` | `/api/auth/me` | Get current user | - | `{ user }` |
| `POST` | `/api/auth/logout` | Logout user | - | `{ message }` |

### Tweet Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `POST` | `/api/tweets` | Create tweet | `{ content, sharedWith: [userIds] }` | `{ tweet }` |
| `GET` | `/api/tweets/my-tweets` | Get user's tweets | - | `{ tweets: [] }` |
| `GET` | `/api/tweets/shared-with-me` | Get shared tweets | - | `{ tweets: [] }` |

### User Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `GET` | `/api/users` | Get all users | - | `{ users: [] }` |

### Authentication

- Uses JWT tokens for authentication
- Token stored in `localStorage` as `token`
- Token automatically included in API requests via Axios interceptor
- Auto-logout on 401 responses
- User data cached in `localStorage` as `user`

### Expected Response Format

```typescript
// Success response
{
  data: T,
  message?: string
}

// Error response
{
  message: string,
  statusCode?: number
}
```

## 🧪 Features Walkthrough

### 1. User Registration
- Navigate to `/register`
- Fill in name, email, password, and confirm password
- Client-side validation (email format, password length, password match)
- On success, auto-login and redirect to dashboard

### 2. User Login
- Navigate to `/login`
- Enter email and password
- On success, store token and redirect to dashboard
- Auto-redirect if already logged in

### 3. Dashboard
- View tweets in two tabs: "My Tweets" and "Shared with Me"
- Create new tweets from the top section
- Select multiple users to share tweets with
- See tweet author, timestamp, and content

### 4. Tweet Creation
- Write tweet content (required)
- Optionally select users to share with
- Click "Post Tweet" to create
- Mock emails logged to console for each selected user
- New tweet appears immediately in "My Tweets" tab

### 5. Change Password
- Access from navigation bar
- Enter current password and new password
- Client-side validation (password length, match confirmation)
- Success message displayed
- Auto-redirect to dashboard after 2 seconds

### 6. Logout
- Click "Logout" in navigation bar
- Clears token and user data from localStorage
- Redirects to login page

## 📧 Mock Email Service

When a tweet is shared with users, the `emailService` logs mock emails to the browser console:

```javascript
// Example console output
============ SENDING EMAIL ============
To: user@example.com
Subject: New Tweet Shared With You
Body:
  Hi John Doe,
  
  You have received a new tweet:
  
  "Hello, this is a test tweet!"
  
  Shared by: Jane Smith
  
  Log in to view and interact with this tweet.
  
  Best regards,
  The Twitter App Team
=======================================

✅ Mock emails sent to 2 recipient(s)
```

## 🎨 Styling & UI

- **Tailwind CSS** for utility-first styling
- **Responsive design** - works on mobile, tablet, and desktop
- **Loading states** - spinners for async operations
- **Error handling** - red alerts for errors
- **Success messages** - green alerts for success
- **Form validation** - inline error messages
- **Hover effects** - interactive elements
- **Color scheme** - Blue primary, gray secondary

## 🐛 Debugging

### Browser DevTools
- Open DevTools (F12)
- **Console tab**: View mock email logs and errors
- **Network tab**: Monitor API requests and responses
- **Application tab**: View localStorage (token, user)

### Redux DevTools
Install the Redux DevTools browser extension to:
- Inspect Redux state
- Track dispatched actions
- Time-travel debugging

### Common Issues

1. **API calls failing**: Check if backend is running and `.env` has correct URL
2. **CORS errors**: Backend needs to allow CORS from `http://localhost:5173`
3. **401 errors**: Token expired or invalid, will auto-logout
4. **Build errors**: Run `npm install` to ensure all dependencies are installed

## 📦 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 🏗 State Management

### Redux Store Structure

```typescript
{
  auth: {
    user: User | null,
    token: string | null,
    loading: boolean,
    error: string | null
  },
  tweets: {
    tweets: Tweet[],
    sharedTweets: Tweet[],
    loading: boolean,
    error: string | null
  }
}
```

### Available Actions

**Auth Actions:**
- `register(data)` - Register new user
- `login(credentials)` - Login user
- `logout()` - Logout user
- `changePassword(data)` - Change password
- `getCurrentUser()` - Fetch current user

**Tweet Actions:**
- `createTweet(data)` - Create new tweet
- `fetchUserTweets()` - Fetch user's tweets
- `fetchSharedTweets()` - Fetch shared tweets

## 🔐 Security

- Passwords never stored in state
- JWT token stored in localStorage
- Auto-logout on token expiry
- Protected routes require authentication
- XSS protection via React's built-in escaping
- CSRF protection via token-based auth

## 📝 Type Safety

All components, services, and state are fully typed with TypeScript:

```typescript
// Example types
interface User {
  id: string;
  email: string;
  name: string;
  createdAt?: string;
}

interface Tweet {
  id: string;
  content: string;
  authorId: string;
  author?: User;
  sharedWith: string[];
  createdAt: string;
}
```

## 🚀 Deployment

### Build the application
```bash
npm run build
```

### Deploy `dist/` folder to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages
- Any static hosting service

### Environment Variables
Make sure to set `VITE_API_BASE_URL` in your deployment platform's environment variables.

## 📄 License

MIT

## 🤝 Contributing

This is a project assignment. Please refer to the project requirements for contribution guidelines.

---

**Need Help?** Make sure your backend API is running and implements all the required endpoints listed above.
