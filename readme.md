# Booklio - Local Service Booking Platform

A full-stack web application that connects service providers with customers in their local area. Users can browse services, book appointments, manage profiles, and leave reviews.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Folder Structure Details](#folder-structure-details)

## ✨ Features

### For Customers
- Browse services by categories
- Search and filter service providers
- Book appointments with providers
- View provider profiles and reviews
- Leave reviews and ratings
- Manage booking history
- Edit profile information
- Receive notifications

### For Service Providers
- Create and manage service listings
- Set availability and pricing
- View and accept bookings
- Track schedule with calendar
- Manage reviews and ratings
- Upload service images
- Manage provider profile

### For Administrators
- Approve/reject service providers
- Manage service categories
- Monitor platform activities
- View analytics and bookings
- User and provider management

## 🛠 Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible component library
- **FullCalendar** - Calendar and scheduling
- **React Router** - Navigation
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Cloudinary** - Image hosting
- **Multer** - File upload handling
- **Zod** - Schema validation
- **OTP Generator** - Two-factor authentication

## 📁 Project Structure

```
Local-service-app/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   │   ├── admin/     # Admin dashboard components
│   │   │   ├── customer/  # Customer-specific components
│   │   │   ├── provider/  # Provider-specific components
│   │   │   └── ui/        # UI component library
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities and auth logic
│   │   ├── slice/         # Redux slices
│   │   ├── types/         # TypeScript type definitions
│   │   ├── utilis/        # Helper utilities
│   │   ├── App.tsx        # Main app component
│   │   └── main.tsx       # Entry point
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── eslint.config.js
│
├── server/                 # Backend (Node.js + Express)
│   ├── controllers/       # Route handlers for different features
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── middleware/        # Express middleware (auth, etc.)
│   ├── validations/       # Input validation schemas
│   ├── utils/             # Helper utilities
│   ├── uploads/           # File upload directory
│   ├── db.ts              # Database connection
│   ├── index.ts           # Server entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── nodemon.json
│
├── package.json           # Root package file
└── readme.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas)
- **Cloudinary account** (for image uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Local-service-app
   ```

2. **Install dependencies for the client**
   ```bash
   cd client
   npm install
   ```

3. **Install dependencies for the server**
   ```bash
   cd ../server
   npm install
   ```

## 🔧 Environment Variables

### Server `.env` file
Create a `.env` file in the `/server` directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/booklio
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/booklio

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRY=7d

# Cloudinary
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Server
PORT=5000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:5173
```

### Client `.env` file
Create a `.env.local` file in the `/client` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

## ▶️ Running the Application

### Development Mode

**Terminal 1 - Start the Backend Server:**
```bash
cd server
npm run dev
```
The server will start at `http://localhost:5000`

**Terminal 2 - Start the Frontend Dev Server:**
```bash
cd client
npm run dev
```
The client will start at `http://localhost:5173`

### Production Build

**Build the client:**
```bash
cd client
npm run build
```

**Build the server:**
```bash
cd server
npm run build
```

**Start the production server:**
```bash
cd server
npm start
```

## 📚 API Documentation

The backend provides RESTful APIs organized by feature:

- **Authentication** - User login/register, JWT tokens
- **Categories** - Browse and manage service categories
- **Services** - CRUD operations for services
- **Bookings** - Create, view, and manage bookings
- **Providers** - Provider profiles and approval
- **Reviews** - Leave and view reviews
- **Admin** - Administrative operations
- **Search** - Search and filter services
- **Suggestions** - Service suggestions

Each route module in `/server/routes` contains the endpoint definitions.

## 📂 Folder Structure Details

### Client Components

- **`admin/`** - Admin dashboard, category management, provider approval
- **`customer/`** - Customer-specific views and components
- **`provider/`** - Provider dashboard and management
- **`ui/`** - Reusable UI components (buttons, forms, modals, etc.)

### Server Logic

- **`controllers/`** - Business logic for each feature
  - `admin.controller.ts` - Admin operations
  - `booking.controller.ts` - Booking management
  - `category.controller.ts` - Category operations
  - `provider.controller.ts` - Provider management
  - `review.controller.ts` - Review operations
  - `search.controller.ts` - Search functionality
  - And more...

- **`models/`** - MongoDB schemas for data structure
- **`routes/`** - API endpoint definitions
- **`middleware/`** - Authentication and authorization
- **`utils/`** - Error handling, API responses, Cloudinary integration

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. Users register/login through the authentication endpoints
2. JWT tokens are issued on successful login
3. Tokens are stored in httpOnly cookies
4. Protected routes verify tokens through middleware
5. Different role-based access control for Admin, Customer, and Provider

## 📝 Notes

- Make sure MongoDB is running before starting the server
- Cloudinary credentials are required for image uploads
- The application supports multiple user roles with different access levels
- Database models support relationships between users, bookings, reviews, and services

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is private. All rights reserved.
