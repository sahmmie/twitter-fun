# Twitter App - Full Stack Application

A full-stack Twitter-like application for sharing tweets with specific users, built with modern web technologies.

## 🎯 Project Overview

This application allows users to:
- ✅ Create accounts and authenticate
- ✅ Post tweets and share them with selected users
- ✅ View their own tweets and tweets shared with them
- ✅ Change their password
- ✅ Receive email notifications (mock implementation)

## 🏗️ Architecture

```
barnksforte/
├── web/          # React Frontend
└── api/          # NestJS Backend
```

### Frontend (`/web`)
- **Framework**: React 18 + TypeScript
- **State Management**: Redux Toolkit
- **Routing**: React Router 7
- **Styling**: Tailwind CSS 4
- **HTTP Client**: Axios
- **Build Tool**: Vite

### Backend (`/api`)
- **Framework**: NestJS + TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (without Passport)
- **Password Hashing**: bcrypt
- **Validation**: class-validator
- **Documentation**: Swagger/OpenAPI

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- MongoDB 4.4+
- npm or yarn

### Backend Setup

```bash
cd api

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Start MongoDB (if local)
mongod

# Run development server
npm run start:dev
```

Backend will run at: `http://localhost:3000/api`  
Swagger docs: `http://localhost:3000/api/docs`

### Frontend Setup

```bash
cd web

# Install dependencies
npm install

# Configure environment (backend URL)
# .env is already set to http://localhost:3000/api

# Run development server
npm run dev
```

Frontend will run at: `http://localhost:5173`

## 📚 Documentation

- **Frontend README**: `/web/README.md`
- **Backend README**: `/api/README.md`
- **Backend API Docs**: `http://localhost:3000/api/docs` (when running)
- **Implementation Plan**: `/api/IMPLEMENTATION_PLAN.md`

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `PATCH /api/auth/change-password` - Change password
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Users
- `GET /api/users` - Get all users

### Tweets
- `POST /api/tweets` - Create tweet
- `GET /api/tweets/my-tweets` - Get user's tweets
- `GET /api/tweets/shared-with-me` - Get shared tweets

## 🎨 Features

### User Management
- User registration with validation
- Email/password authentication
- JWT token-based session management
- Password change functionality
- Secure password hashing with bcrypt

### Tweet Management
- Create tweets with text content
- Share tweets with specific users
- View own tweets
- View tweets shared with you
- Mock email notifications when tweets are shared

### UI/UX
- Modern, responsive design
- Loading states and error handling
- Form validation
- Protected routes
- Intuitive navigation

## 🔐 Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT authentication with 7-day expiration
- Protected API routes
- CORS configuration
- Input validation on both frontend and backend
- Environment-based configuration

## 📧 Email Notifications

The application includes a mock email service that logs notifications to the console when tweets are shared. In production, this can be replaced with:
- SendGrid
- AWS SES
- Mailgun
- Any other email service provider

## 🧪 Testing

### Backend Tests
```bash
cd api
npm run test        # Unit tests
npm run test:e2e    # E2E tests
npm run test:cov    # Coverage
```

### Frontend Tests
```bash
cd web
npm run test        # Run tests
```

## 📦 Production Build

### Backend
```bash
cd api
npm run build
npm run start:prod
```

### Frontend
```bash
cd web
npm run build
# Deploy the dist/ folder
```

## 🚀 Deployment

### Backend Deployment Options
- Heroku
- AWS (ECS, Elastic Beanstalk, Lambda)
- Google Cloud Platform
- DigitalOcean
- Railway
- Render

### Frontend Deployment Options
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages
- Railway

### Database Hosting
- MongoDB Atlas (recommended)
- AWS DocumentDB
- Self-hosted MongoDB

## 📊 Tech Stack Summary

| Layer | Technology |
|-------|-----------|
| Frontend Framework | React 18 |
| Frontend State | Redux Toolkit |
| Frontend Routing | React Router 7 |
| Frontend Styling | Tailwind CSS 4 |
| Backend Framework | NestJS |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JWT |
| Password Hashing | bcrypt |
| API Documentation | Swagger/OpenAPI |
| Language | TypeScript |
| Package Manager | npm |

## 🔧 Environment Variables

### Backend (`.env`)
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/twitter-app
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
```

### Frontend (`.env`)
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## 📝 Project Status

✅ **Completed Features:**
- User registration and login
- JWT authentication
- Password hashing and security
- Tweet creation and sharing
- User selection for tweet sharing
- View own tweets
- View shared tweets
- Password change
- Mock email notifications
- Responsive UI
- Form validation
- Error handling
- API documentation

## 📄 License

MIT

## 👥 Contributors
DO NOT CONTRIBUTE TO THIS PROJECT.

---

**Built with ❤️ using React, NestJS, MongoDB, and TypeScript**

# twitter-fun
