# OpenHealth Frontend

This is the frontend application for the OpenHealth patient data system. It provides a user interface for viewing consolidated patient health records and managing healthcare providers.

## Prerequisites

- Node.js (v16 or higher)
- npm (comes with Node.js)

## Setup Instructions

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Configure environment variables:
Create a `.env` file in the frontend directory with the following content:
```env
REACT_APP_API_URL=http://localhost:3000
REACT_APP_DHB_API_URL=http://localhost:3001
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:3003

## Project Structure

```
frontend/
├── src/
│   ├── api.ts           # API integration functions
│   ├── App.tsx          # Main application component
│   ├── index.tsx        # Application entry point
│   ├── types.ts         # TypeScript type definitions
│   ├── components/      # Reusable UI components
│   └── pages/          # Page components
├── public/             # Static assets
└── dist/              # Build output
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Create a production build
- `npm run start` - Run the production build

## Features

1. **Patient Data Viewing**
   - Search patients by NHI number
   - View patient details
   - Access medical history
   - View medications and blood tests

2. **Provider Management**
   - Register new healthcare providers
   - Integration with DHB systems

## API Integration

The frontend integrates with two main APIs:

1. **Central API** (http://localhost:3000)
   - Provider registration
   - Patient data aggregation

2. **DHB API** (http://localhost:3001)
   - Local patient records
   - Medical history
   - Test results

## Development Notes

- Built with React and TypeScript
- Uses Webpack for bundling
- Includes Babel configuration for modern JavaScript features

## Common Issues and Solutions

1. **CORS Issues**
   - Ensure the backend APIs have CORS enabled for localhost:3003

2. **Build Errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check that all required environment variables are set

3. **API Connection Issues**
   - Verify that both the Central API and DHB API are running
   - Check the URLs in your .env file match the running services
