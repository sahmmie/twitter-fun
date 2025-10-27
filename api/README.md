# Twitter App - Backend API

A RESTful API backend for a Twitter-like application built with NestJS, MongoDB, and Mongoose.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start MongoDB (if running locally)
mongod

# Run in development mode
npm run start:dev
```

The API will be available at `http://localhost:3000/api`

## 📚 API Documentation

Interactive Swagger documentation is available at: `http://localhost:3000/api/docs`

## ✨ Features

- ✅ User registration and authentication with JWT
- ✅ Password hashing with bcrypt
- ✅ Create and share tweets with specific users
- ✅ View own tweets and tweets shared with you
- ✅ Change password functionality
- ✅ Mock email notifications (console logging)
- ✅ Global error handling and response formatting
- ✅ Input validation with class-validator
- ✅ MongoDB with Mongoose ODM
- ✅ Swagger/OpenAPI documentation

## 🛠 Tech Stack

- **NestJS** - Progressive Node.js framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **TypeScript** - Type-safe development
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **class-validator** - DTO validation
- **Swagger** - API documentation

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## 🔧 Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/twitter-app
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
```

### 3. Start MongoDB

If running MongoDB locally:

```bash
mongod
```

Or use MongoDB Atlas (cloud) and update the `MONGODB_URI` in `.env`.

### 4. Run the Application

**Development mode with hot-reload:**
```bash
npm run start:dev
```

**Production mode:**
```bash
npm run build
npm run start:prod
```

## 📁 Project Structure

```
api/
├── src/
│   ├── auth/                  # Authentication module
│   │   ├── decorators/        # Custom decorators (CurrentUser)
│   │   ├── dto/               # Data Transfer Objects
│   │   ├── guards/            # JWT auth guard
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   ├── users/                 # Users module
│   │   ├── schemas/           # Mongoose schemas
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   ├── tweets/                # Tweets module
│   │   ├── dto/               # Data Transfer Objects
│   │   ├── schemas/           # Mongoose schemas
│   │   ├── tweets.controller.ts
│   │   ├── tweets.service.ts
│   │   └── tweets.module.ts
│   ├── common/                # Shared utilities
│   │   ├── filters/           # Global exception filter
│   │   ├── interceptors/      # Response transform interceptor
│   │   └── services/          # Email service (mock)
│   ├── app.module.ts
│   └── main.ts
├── .env
├── .env.example
├── package.json
└── tsconfig.json
```

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Register new user | No |
| `POST` | `/api/auth/login` | Login user | No |
| `PATCH` | `/api/auth/change-password` | Change password | Yes |
| `GET` | `/api/auth/me` | Get current user | Yes |
| `POST` | `/api/auth/logout` | Logout user | Yes |

### Users

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/users` | Get all users (excluding current user) | Yes |

### Tweets

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/tweets` | Create new tweet | Yes |
| `GET` | `/api/tweets/my-tweets` | Get user's tweets | Yes |
| `GET` | `/api/tweets/shared-with-me` | Get tweets shared with user | Yes |

## 📝 Request/Response Examples

### Register User

**POST** `/api/auth/register`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2025-10-27T00:00:00.000Z",
      "updatedAt": "2025-10-27T00:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Login

**POST** `/api/auth/login`

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Create Tweet

**POST** `/api/tweets`

Headers: `Authorization: Bearer <token>`

```json
{
  "content": "Hello, this is my first tweet!",
  "sharedWith": ["507f1f77bcf86cd799439012", "507f1f77bcf86cd799439013"]
}
```

**Response:**
```json
{
  "data": {
    "id": "507f1f77bcf86cd799439014",
    "content": "Hello, this is my first tweet!",
    "author": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "sharedWith": ["507f1f77bcf86cd799439012", "507f1f77bcf86cd799439013"],
    "createdAt": "2025-10-27T00:00:00.000Z",
    "updatedAt": "2025-10-27T00:00:00.000Z"
  }
}
```

### Get My Tweets

**GET** `/api/tweets/my-tweets`

Headers: `Authorization: Bearer <token>`

**Response:**
```json
{
  "data": [
    {
      "id": "507f1f77bcf86cd799439014",
      "content": "Hello, this is my first tweet!",
      "author": {
        "id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "sharedWith": ["507f1f77bcf86cd799439012"],
      "createdAt": "2025-10-27T00:00:00.000Z"
    }
  ]
}
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### How it works:

1. User registers or logs in
2. Server returns a JWT token
3. Client stores the token (localStorage/cookie)
4. Client includes token in subsequent requests: `Authorization: Bearer <token>`
5. Server validates token on protected routes

### Protected Routes

All endpoints except registration and login require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📧 Email Service

The application includes a mock email service that logs email notifications to the console when tweets are shared.

**Example Console Output:**
```
============ SENDING EMAIL ============
To: recipient@example.com
Subject: New Tweet Shared With You
Body:
    Hi Jane Doe,
    
    You have received a new tweet:
    
    "Hello, this is my first tweet!"
    
    Shared by: John Doe
    
    Log in to view and interact with this tweet.
    
    Best regards,
    The Twitter App Team
=======================================

✅ Mock emails sent to 2 recipient(s)
```

In production, replace this with a real email service like SendGrid, AWS SES, or Mailgun.

## 🗄️ Database Schema

### User Collection

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique, lowercase),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Tweet Collection

```javascript
{
  _id: ObjectId,
  content: String,
  author: ObjectId (ref: User),
  sharedWith: [ObjectId] (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 🐛 Error Handling

The API uses a global exception filter for consistent error responses:

**Error Response Format:**
```json
{
  "statusCode": 400,
  "message": "Email already exists",
  "error": "Bad Request",
  "timestamp": "2025-10-27T00:00:00.000Z"
}
```

**Common Error Codes:**
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `404` - Not Found
- `409` - Conflict (duplicate email)
- `500` - Internal Server Error

## 📦 Available Scripts

```bash
# Development
npm run start          # Start the application
npm run start:dev      # Start with hot-reload
npm run start:debug    # Start in debug mode

# Production
npm run build          # Build the application
npm run start:prod     # Start in production mode

# Testing
npm run test           # Run unit tests
npm run test:e2e       # Run end-to-end tests
npm run test:cov       # Generate test coverage

# Linting
npm run lint           # Run ESLint
npm run format         # Format code with Prettier
```

## 🔒 Security Features

- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT token expiration (7 days default)
- ✅ Email uniqueness enforced at database level
- ✅ Input validation with class-validator
- ✅ CORS enabled for specified origin only
- ✅ Sensitive data (passwords) excluded from responses
- ✅ Environment variables for secrets

## 🚀 Deployment

### Environment Variables

Make sure to set these environment variables in your deployment platform:

- `NODE_ENV` - Set to "production"
- `PORT` - Server port (default: 3000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Strong secret key for JWT
- `JWT_EXPIRES_IN` - Token expiration time
- `CORS_ORIGIN` - Frontend URL

### Deployment Platforms

- Heroku
- AWS (ECS, Elastic Beanstalk, Lambda)
- Google Cloud Platform
- DigitalOcean
- Railway
- Render

### MongoDB Hosting

- MongoDB Atlas (recommended)
- AWS DocumentDB
- mLab

## 📄 License

MIT

## 🤝 Contributing

DO NOT CONTRIBUTE TO THIS PROJECT.

---

**Built with ❤️ using NestJS**
