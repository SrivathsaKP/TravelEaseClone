# TravelEase - Make My Trip Clone

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

### Backend
- **Node.js** with TypeScript
- **Express.js** for API server
- **Drizzle ORM** for database operations
- **Neon Database** (PostgreSQL) for production
- **Mock Data** for development

### Development Tools
- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting
- **Cross-env** for environment variables

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

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

### 3. Start the Development Server

#### Frontend Development Server
```bash
npm run dev
```

The Vite development server will start on `http://localhost:5173` (or the next available port if 5173 is in use)

#### Backend Development Server (Optional)
If you need the backend API server running alongside the frontend:

```bash
# In a separate terminal
npm run dev:server
```

The backend server will start on `http://localhost:5000`

**Note**: For development, the frontend can work with mock data without the backend server running.

## 🔧 Configuration

### Environment Variables

The application uses different configurations for development and production:

#### Development Mode (Default)
- Uses mock data for all services
- No external API dependencies
- No database connection required
- Hot reloading enabled

#### Production Mode
- Requires real API integrations
- Database connection needed
- Environment variables required

### Environment Variables for Production

If you want to run in production mode, set these environment variables:

```bash
# Database
DATABASE_URL=your_database_connection_string

# Replit Auth (for deployment)
REPLIT_DOMAINS=your_domain.com
REPL_ID=your_replit_id
ISSUER_URL=https://replit.com/oidc

# Stripe Payment (optional)
STRIPE_SECRET_KEY=your_stripe_secret_key

# Session
SESSION_SECRET=your_session_secret
```

## 🏗️ Project Structure

```
TravelEaseClone/
├── client/                 # Frontend React application (Vite root)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Redux store and slices
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility libraries
│   │   └── main.tsx       # Application entry point
│   └── index.html         # Vite entry point
├── server/                # Backend Express.js server
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API route definitions
│   ├── storage.ts         # Data storage layer
│   ├── db.ts             # Database configuration
│   ├── replitAuth.ts     # Authentication setup
│   └── mockData/         # Mock data files
├── shared/               # Shared types and schemas
├── dist/                # Production build output
├── vite.config.ts        # Vite configuration
└── package.json
```

**Note**: The `vite.config.ts` file configures the `client/` directory as the root for the frontend application, which is why the development server serves from there.

## 🔧 Development Setup

### What We Fixed

During the setup process, we encountered and resolved several issues:

#### 0. Development Server Configuration Issue
**Problem**: The `package.json` was using `react-scripts start` but the project is configured for Vite.

**Solution**: Updated the dev script in `package.json`:
```json
{
  "scripts": {
    "dev": "vite"  // Changed from "react-scripts start"
  }
}
```

**Note**: This project uses Vite as the build tool, not Create React App. The `vite.config.ts` file configures the client directory as the root for the frontend application.

#### 1. Database Configuration Issue
**Problem**: The application required `DATABASE_URL` even in development mode.

**Solution**: Modified `server/db.ts` to use mock database objects in development:
```typescript
// Only require DATABASE_URL in production
if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set. Did you forget to provision a database?");
}

// Create mock database objects for development
if (process.env.DATABASE_URL) {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle({ client: pool, schema });
} else {
  console.log('Running in development mode with mock database');
  db = {
    select: () => ({ from: () => [] }),
    insert: () => ({ values: () => ({ returning: () => [] }) }),
    update: () => ({ set: () => ({ where: () => ({ returning: () => [] }) }) }),
    delete: () => ({ where: () => ({ returning: () => [] }) })
  };
}
```

#### 2. Authentication Setup Issue
**Problem**: The application required `REPLIT_DOMAINS` environment variable.

**Solution**: Modified `server/replitAuth.ts` to skip Replit auth in development:
```typescript
// Only require REPLIT_DOMAINS in production
if (process.env.NODE_ENV === 'production' && !process.env.REPLIT_DOMAINS) {
  throw new Error("Environment variable REPLIT_DOMAINS not provided");
}

export async function setupAuth(app: Express) {
  // Skip Replit auth setup in development if REPLIT_DOMAINS is not available
  if (!process.env.REPLIT_DOMAINS) {
    console.log('Skipping Replit auth setup in development mode');
    return;
  }
  // ... rest of auth setup
}
```

#### 3. Windows Environment Variable Issue
**Problem**: `NODE_ENV=development` syntax doesn't work on Windows PowerShell.

**Solution**: Added `cross-env` package and updated package.json scripts:
```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development tsx server/index.ts",
    "start": "cross-env NODE_ENV=production node dist/index.js"
  }
}
```

#### 4. Server Binding Issue
**Problem**: `ENOTSUP` error when binding to `0.0.0.0` on Windows.

**Solution**: Modified server configuration to use `localhost` in development:
```typescript
server.listen({
  port,
  host: process.env.NODE_ENV === 'development' ? 'localhost' : '0.0.0.0',
  reusePort: process.env.NODE_ENV !== 'development',
}, () => {
  log(`serving on port ${port}`);
});
```

### Storage Configuration

The application uses a smart storage system that automatically switches between mock data and real database:

```typescript
// Use MemStorage for development, DatabaseStorage for production
export const storage = process.env.NODE_ENV === 'development' 
  ? new MemStorage() 
  : new DatabaseStorage();
```

## 🚀 Available Scripts

### Development
```bash
npm run dev          # Start Vite frontend development server (port 5173)
npm run dev:server   # Start backend development server (port 5000)
npm run check        # TypeScript type checking
```

### Production
```bash
npm run build        # Build frontend and backend for production
npm start            # Start production server (serves both frontend and backend)
```

### Database
```bash
npm run db:push      # Push database schema changes
```

## 🔨 Build Process

### Development Build
- **Frontend**: Vite dev server with hot reloading
- **Backend**: Optional Express.js server for API testing
- **Mock Data**: Available for frontend development

### Production Build
The `npm run build` command performs:

1. **Frontend Build** (`vite build`):
   - Compiles React/TypeScript to optimized JavaScript
   - Bundles all assets (CSS, images, etc.)
   - Outputs to `dist/public/` directory

2. **Backend Build** (`esbuild server/index.ts`):
   - Bundles Express.js server with all dependencies
   - Compiles TypeScript to JavaScript
   - Outputs to `dist/` directory

3. **Result**: Single `dist/` folder containing:
   - `dist/public/` - Static frontend files
   - `dist/index.js` - Bundled backend server

### Production Server
The `npm start` command:
- Runs the bundled backend server
- Serves static frontend files from `dist/public/`
- Handles all API requests
- Single server on port 5000

## 🌐 API Endpoints

### Authentication
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login

### Flights
- `GET /api/flights` - Get all flights
- `GET /api/flights/:id` - Get flight details
- `GET /api/flights/search` - Search flights

### Hotels
- `GET /api/hotels` - Get all hotels
- `GET /api/hotels/:id` - Get hotel details
- `GET /api/hotels/search` - Search hotels

### Trains
- `GET /api/trains` - Get all trains
- `GET /api/trains/:id` - Get train details
- `GET /api/trains/search` - Search trains

### Buses
- `GET /api/buses` - Get all buses
- `GET /api/buses/:id` - Get bus details
- `GET /api/buses/search` - Search buses

### Cabs
- `GET /api/cabs` - Get all cabs
- `GET /api/cabs/:id` - Get cab details
- `GET /api/cabs/search` - Search cabs

### Insurance
- `GET /api/insurance-plans` - Get all insurance plans
- `GET /api/insurance-plans/:id` - Get insurance plan details
- `GET /api/insurance-plans/search` - Search insurance plans

### Bookings
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings/:id` - Get booking details
- `GET /api/bookings/user/:userId` - Get user bookings

### Payments
- `POST /api/payments/create-payment-intent` - Create payment intent (Stripe)

## 📱 Frontend Features

### Components
- **Header**: Navigation and search functionality
- **SearchTabs**: Tab-based search interface
- **FlightResults**: Flight search results display
- **HotelResults**: Hotel search results display
- **BookingSuccess**: Booking confirmation page
- **Checkout**: Payment processing page

### State Management
- **Redux Toolkit**: Centralized state management
- **RTK Query**: API data fetching and caching
- **Redux Persist**: Session persistence

### UI/UX
- **Material-UI**: Modern component library
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Theme switching capability
- **Loading States**: User feedback during operations

## 🗄️ Mock Data

The application includes comprehensive mock data for all services:

### Flight Data
- Multiple airlines (Air India, IndiGo, etc.)
- Various routes and schedules
- Different fare classes and pricing
- Seat availability and selection

### Hotel Data
- Different star ratings (3-5 stars)
- Various amenities and facilities
- Room types and pricing
- Location-based search

### Train Data
- Different train types (Superfast, Express)
- Various classes (1AC, 2AC, 3AC, Sleeper)
- Station information and routes
- Availability and pricing

### Bus Data
- Different operators and bus types
- Seat layouts and selection
- Route information and timing
- Fare calculation

### Cab Data
- Different vehicle types (Economy, Premium)
- Driver information and ratings
- Fare estimation
- Location-based search

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Comprehensive request validation
- **CORS Configuration**: Cross-origin resource sharing setup
- **Session Management**: Secure session handling
- **Payment Security**: Stripe integration for secure payments

## 🚀 Deployment

### Development Mode
The application is ready for development with mock data and doesn't require external dependencies.

**Frontend Only**: `npm run dev` - Runs Vite dev server on port 5173
**Full Stack**: Run both `npm run dev` and `npm run dev:server` in separate terminals

### Production Build & Deployment

#### 1. Build the Application
```bash
npm run build
```

This command:
- Builds the React frontend using Vite
- Bundles the Express.js backend using esbuild
- Creates a `dist/` folder with production-ready files

#### 2. Start Production Server
```bash
npm start
```

This starts the production server that serves both:
- Static frontend files from `dist/public/`
- API endpoints from the bundled backend

#### 3. Production Deployment Requirements
For production deployment, you'll need:

1. **Database**: Set up a PostgreSQL database (Neon recommended)
2. **Environment Variables**: Configure all required environment variables
3. **Build Process**: Run `npm run build` to create production build
4. **Server**: Deploy the built application to your hosting platform

### Replit Deployment
The application is configured for Replit deployment with:
- Proper port configuration (5000)
- Environment variable handling
- Build and run scripts

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Check what's using port 5000 (backend)
   netstat -ano | findstr :5000
   # Check what's using port 5173 (frontend)
   netstat -ano | findstr :5173
   # Kill the process if needed
   taskkill /PID <process_id> /F
   ```

2. **Build Errors**
   ```bash
   # Clear build cache
   rm -rf dist/
   npm run build
   ```

3. **Production Server Not Starting**
   ```bash
   # Ensure build was successful
   npm run build
   # Check if dist/index.js exists
   ls dist/
   # Start production server
   npm start
   ```

2. **Node.js Version Issues**
   ```bash
   # Check Node.js version
   node --version
   # Should be v18 or higher
   ```

3. **Dependencies Issues**
   ```bash
   # Clear npm cache
   npm cache clean --force
   # Reinstall dependencies
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **TypeScript Errors**
   ```bash
   # Run type checking
   npm run check
   ```

### Development Tips

1. **Hot Reloading**: The development server automatically reloads when you make changes
2. **Mock Data**: All API calls return realistic mock data for testing
3. **Console Logs**: Check the server console for detailed logging
4. **Network Tab**: Use browser dev tools to inspect API calls

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🤝 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section
2. Review the console logs
3. Check the network tab in browser dev tools
4. Create an issue in the repository

## 🎉 Success!

Your TravelEase application is now running successfully! You can:

### Development Mode
- **Frontend**: `http://localhost:5173` (Vite dev server)
- **Backend API**: `http://localhost:5000/api` (when running `npm run dev:server`)
- **Mock Data**: Available for testing without backend

### Production Mode
- **Full Application**: `http://localhost:5000` (serves both frontend and API)
- **API Endpoints**: `http://localhost:5000/api`

### Features Available
- ✈️ Flight booking with seat selection
- 🏨 Hotel booking with room types
- 🚂 Train ticket booking
- 🚌 Bus booking with seat layout
- 🚗 Cab booking service
- 🏠 HomeStay alternatives
- 🛡️ Travel insurance plans
- 💳 Secure payment processing

Happy coding! 🚀
