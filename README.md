# TravelEase

A comprehensive travel booking platform built with React, TypeScript, Express.js, and Node.js. This project provides a full-stack solution for booking flights, hotels, buses, trains, cabs, and travel insurance.

## 🚀 Features

### Core Services
- ✈️ **Flight Booking**: Search and book flights with seat selection
- 🏨 **Hotel Booking**: Find and reserve hotels with room selection
- 🚂 **Train Booking**: Train ticket booking with class selection
- 🚌 **Bus Booking**: Bus ticket booking with seat layout
- 🚗 **Cab Booking**: Point-to-point cab booking service
- 🏠 **HomeStay Booking**: Alternative accommodation options
- 🛡️ **Travel Insurance**: Comprehensive travel insurance plans
- 💳 **Payment Processing**: Secure payment gateway integration

### Technical Features
- 🔥 **Hot Reloading**: Development server with instant updates
- 📱 **Responsive Design**: Works on all device sizes
- 🎨 **Modern UI**: Material Design with custom theming
- 🔐 **Authentication**: User registration and login system
- 📊 **Mock Data**: Comprehensive mock data for development
- 🚀 **Production Ready**: Optimized for deployment

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Redux Toolkit** for state management
- **RTK Query** for API integration
- **Material-UI** for UI components
- **Tailwind CSS** for styling
- **Vite** for build tooling
- **Wouter** for routing
- **React Hook Form** for form management

### Backend
- **Node.js** with TypeScript
- **Express.js** for API server
- **Drizzle ORM** for database operations
- **PostgreSQL** for production
- **Mock Data** for development

### Development Tools
- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting
- **ESBuild** for production bundling

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd TravelEaseClone
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
The Vite development server will start on `http://localhost:5173`

### 4. Build for Production
```bash
# Frontend only (for static deployment)
npm run build:frontend

# Full stack (for server deployment)
npm run build
```

## 🏗️ Project Structure

```
TravelEaseClone/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Redux store and slices
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utility libraries
│   └── index.html
├── server/                # Backend Express.js server
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API route definitions
│   ├── storage.ts         # Data storage layer
│   └── mockData/         # Mock data files
├── shared/               # Shared types and schemas
└── vite.config.ts        # Vite configuration
```

## 🚀 Available Scripts

### Development
```bash
npm run dev          # Start Vite frontend development server
npm run dev:server   # Start backend development server
npm run check        # TypeScript type checking
```

### Production
```bash
npm run build        # Build frontend and backend
npm run build:frontend # Build frontend only
npm start            # Start production server
```

## 🚀 Deployment

### Frontend-Only Deployment 
```bash
# Build frontend
npm run build:frontend

# Deploy to Vercel
npm i -g vercel
vercel --prod

# Or deploy to Netlify
# Drag dist/public folder to netlify.com
```

### Full-Stack Deployment
```bash
# Build and start production server
npm run build
npm start
```

### What This Project Demonstrates:
- **Full-Stack Development**: React frontend + Node.js backend + PostgreSQL
- **Modern Tech Stack**: React 18, TypeScript, Material-UI, Redux Toolkit, Vite
- **Real-World Application**: Complete travel booking system with mock data
- **Production Architecture**: Monorepo structure, type-safe APIs, build optimization
- **Professional UI/UX**: Responsive design, accessibility, modern patterns

### Key Features Implemented:
- Multi-service booking platform (flights, hotels, trains, buses, cabs)
- Advanced search and filtering capabilities
- Complete booking flow with payment integration
- Responsive design for all devices
- Authentication and user management
- Mock data system for development

## 🐛 Troubleshooting

### Common Issues
```bash
# Port already in use
netstat -ano | findstr :5173
taskkill /PID <process_id> /F

# Build errors
rm -rf dist/
npm run build

# Dependencies issues
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

This project is licensed under the MIT License.

## 🎉 Success!

Your TravelEase application is now running successfully!

- **Development**: `http://localhost:5173` (Vite dev server)
- **Production**: `http://localhost:5000` (full application)
- **Features**: Complete booking system with mock data

Happy coding! 🚀
