# E-Commerce UI

This is the frontend application for the E-Commerce Microservices project. It provides a user interface for interacting with the backend microservices.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│                        Angular Frontend (4200)                          │
│                                                                         │
│  ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────────┐   │
│  │                 │   │                 │   │                     │   │
│  │  Dashboard      │   │  Theme          │   │  Other Components   │   │
│  │  Component      │   │  Switcher       │   │                     │   │
│  │                 │   │                 │   │                     │   │
│  └────────┬────────┘   └─────────────────┘   └─────────────────────┘   │
│           │                                                             │
│           │                                                             │
│  ┌────────▼────────┐                                                    │
│  │                 │                                                    │
│  │  Inventory      │                                                    │
│  │  Service        │                                                    │
│  │                 │                                                    │
│  └────────┬────────┘                                                    │
│           │                                                             │
└───────────┼─────────────────────────────────────────────────────────────┘
            │
            │ HTTP Requests
            │
┌───────────▼─────────────────────────────────────────────────────────────┐
│                                                                         │
│                         Backend Microservices                           │
│                                                                         │
│  ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────────┐   │
│  │                 │   │                 │   │                     │   │
│  │  Order Service  │◄──┼───┐ Kafka Topic │◄──┤  Inventory Service  │   │
│  │  (8083)         │   │   │ (orders)    │   │  (8082)             │   │
│  │                 │   │   │             │   │                     │   │
│  └─────────────────┘   │   └─────┬───────┘   └─────────┬───────────┘   │
│                        │         │                     │               │
│                        │         │                     │               │
│                        │         ▼                     ▼               │
│                        │  ┌─────────────────┐  ┌─────────────────┐     │
│                        │  │                 │  │                 │     │
│                        └──►  Email Service  │  │  MongoDB        │     │
│                           │  (8081)         │  │  (27017)        │     │
│                           │                 │  │                 │     │
│                           └─────────────────┘  └─────────────────┘     │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

## Technology Stack

- **Frontend**: Angular 19, TailwindCSS, DaisyUI
- **Backend**: Spring Boot, Apache Kafka, MongoDB
- **Containerization**: Docker, Docker Compose

## Features

- Modern UI with responsive design using TailwindCSS and DaisyUI components
- Theme switching capability with multiple pre-configured themes
- Real-time inventory display
- Integration with backend microservices

## Development server

To start a local development server, run:

```bash
npm start
```

This command uses the proxy configuration to route API requests to the appropriate backend services. Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building for Production

To build the project for production, run:

```bash
npm run build
```

This will compile your project and store the build artifacts in the `dist/` directory with production optimizations.

## Docker Support

The application includes Docker support for easy deployment:

```bash
# Build Docker image
npm run docker:build

# Run Docker container
npm run docker:run
```

## Integration with Backend Services

The UI communicates with the following backend services:

- **Order Service** (port 8083): For creating and managing orders
- **Inventory Service** (port 8082): For retrieving inventory information

API requests are proxied through the development server using the configuration in `proxy.conf.json`.

## Additional Resources

- [Angular Documentation](https://angular.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [DaisyUI Documentation](https://daisyui.com/docs/)
