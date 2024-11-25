# Scalable Microservices-Based Messaging System

This is a messaging system and is built with a microservices architecture, ensuring modularity, scalability, and maintainability.

## Features
### Microservices Architecture

- **User Management Service:**
    Handles user registration, login.
    Ensures secure authentication using JWT tokens.

- **Messaging Service**:
    Handles sending, receiving, and storing messages between users.
    Provides real-time message-receiving with WebSockets (Socket.io).
    Implements secure messaging workflows with proper JWT validation and error handling.
    It takes advantages of Redis message queuing to handle high traffic for sending messages.

### Caching with Redis

- **Caching Messages:**
    Frequently accessed message data is cached in Redis to reduce database load.
    Cached data is automatically **invalidated** when a new message is sent, ensuring consistency.

### Authentication & Security

- **JWT Authentication:**
  Protects all API endpoints and secures WebSocket connections.

### Type Safety

- Extensive use of TypeScript generics ensures type safety across controllers and improve code reliability.


## Tech Stack
- **Backend Framework:** Node.js with Express.js
- **Language:** TypeScript
- **Database:** MongoDB (for persistent message storage)
- **Cache:** Redis (for load balancing and message caching)
- **Real-Time Communication:** Socket.io
- **Authentication:** JSON Web Tokens (JWT)
- **Docker:** For containerization


## Installation

#### Install dependencies:

```
npm install
```

#### Set up environment variables: 

Create a `.env` file in the root directory and fill it like `.env.example` files.

#### Start the application:

```
npm run start
```

## Docker Setup

To simplify deployment, the project includes a Docker setup with docker-compose for running the services.

```
docker-compose up --build
```