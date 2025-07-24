# Flights Ticket Booking API

## Overview
The **Flights Ticket Booking API** is a robust, TypeScript-based RESTful API designed to streamline flight ticket reservations and management. Built with scalability and performance in mind, it enables users to search for flights, book tickets, manage reservations, and access detailed flight, airplane, and airport information.

The system leverages **Sequelize** and **PostgreSQL** for reliable data storage, **Redis** for caching to enhance performance, **pessimistic locking** and **database transactions** to ensure data consistency and prevent common booking issues (e.g., double booking), and **cron jobs** to handle expired bookings. Authentication is secured with JWT (access and refresh tokens).

## Features
- **Flight Search**: Search flights by destination, date, and preferences, with details on airports and airplanes.
- **Ticket Booking**: Create, update, or cancel bookings with seat selection and cost calculation.
- **User Management**: Register, log in, verify accounts, and manage user roles with JWT authentication.
- **Booking History**: View and manage past and upcoming bookings, including flight and seat details.
- **Airport and Airplane Management**: Access detailed information on airports (name, code, city) and airplanes (model, capacity).
- **Seat Management**: Select and manage seat assignments based on airplane configuration.

## Technology Stack
- **Language**: TypeScript
- **Framework**: Node.js with Express
- **Database**: PostgreSQL with Sequelize ORM
- **Caching**: Redis for performance optimization
- **Scheduling**: Cron jobs for managing expired bookings
- **Authentication**: JWT (JSON Web Tokens) with access and refresh tokens
- **Validation**: Custom validators for request data
- **Error Handling**: Centralized error handling with middleware

## System Design

### Architecture
The Flights Ticket Booking API follows a layered architecture:
- **Presentation Layer**: Handles HTTP requests and responses via Express routes. Routes are prefixed with `http://localhost:3000/api/v1/`.
- **Controller Layer**: Processes requests, invokes services, and returns responses. Each model (User, Flight, Booking, etc.) has a dedicated controller.
- **Service Layer**: Contains business logic, including booking operations, seat management.
- **Data Access Layer**: Uses Sequelize to interact with PostgreSQL, handling CRUD operations and relationships between models (e.g., Flight to Airport).
- **Caching Layer**: Redis caches frequently accessed data (e.g., flight availability, airport details) to reduce database load.
- **Scheduling Layer**: Cron jobs periodically clean up expired bookings to maintain system integrity.

### Database Schema
The API uses the following models, defined with Sequelize:
- **User**: Stores user data (id, username, email, password, role, isVerified, verifyToken, createdAt, updatedAt).
- **Airplane**: Represents airplanes (id, modelNumber, capacity, createdAt, updatedAt).
- **Airport**: Stores airport details (id, name, code, address, cityID, createdAt, updatedAt).
- **City**: Represents cities (id, name, createdAt, updatedAt).
- **Flight**: Contains flight information (id, flightNumber, airplaneId, departureAirportId, arrivalAirportId, arrivalTime, departureTime, price, boardingGate, totalSeats, createdAt, updatedAt).
- **Booking**: Manages bookings (id, flightId, userId, status, totalCost, noOfSeats, createdAt, updatedAt).
- **Seat**: Defines seat configurations (id, airplaneId, row, col, type, createdAt, updatedAt).

### Handling Common Booking System Problems
The API addresses two critical challenges in booking systems:
1. **Double Booking**:
   - **Solution**: Pessimistic locking is implemented at the database level using Sequelize's `SELECT ... FOR UPDATE` in transactions. When a user attempts to book a seat, the relevant `Flight` and `Seat` records are locked to prevent concurrent modifications. This ensures that only one user can reserve a specific seat at a time.

2. **Data Consistency**:
   - **Solution**: Database transactions ensure that operations (e.g., creating a booking, updating seat availability, processing payments) are executed atomically. If any step fails, the transaction is rolled back, maintaining data integrity.

### Performance Optimization
- **Redis Caching**: Frequently accessed data, such as flight schedules, airport details, and seat availability, are cached in Redis to reduce database queries. Cache keys are invalidated when data is updated (e.g., after booking creation or flight updates).
- **Cron Jobs**: A cron job runs periodically to update or cancel expired bookings (e.g., bookings in `pending` status past a timeout). This ensures the system remains clean and seats are released for other users.

### Authentication
- **JWT Authentication**: User-specific endpoints require a valid JWT access token, included in the `Authorization` header as `Bearer <token>`. Refresh tokens are issued during login and registration to allow token renewal.
- **Verification**: The `/api/v1/users/verify-email` endpoint verifies user accounts using a `verifyToken`.

## API Routes
All routes are prefixed with `http://localhost:3000/api/v1/`.

### User Routes
- `GET /api/v1/users`: Retrieve all users (authenticated).
- `POST /api/v1/users/login`: Authenticate a user and return access/refresh tokens.
- `POST /api/v1/users/register`: Create a new user account with tokens.
- `GET /api/v1/users/verify-email`: Verify a user's email using a token.
- `GET /api/v1/users/:id`: Retrieve a user by ID (authenticated).
- `PATCH /api/v1/users/:id`: Update a user's details (authenticated).
- `DELETE /api/v1/users/:id`: Delete a user (authenticated).

### Airplane Routes
- `POST /api/v1/airplanes`: Create a new airplane (authenticated).
- `GET /api/v1/airplanes`: Retrieve all airplanes (authenticated).
- `GET /api/v1/airplanes/:id`: Retrieve an airplane by ID (authenticated).
- `PATCH /api/v1/airplanes/:id`: Update an airplane's details (authenticated).
- `DELETE /api/v1/airplanes/:id`: Delete an airplane (authenticated).

### Airport Routes
- `POST /api/v1/airports`: Create a new airport (authenticated).
- `GET /api/v1/airports`: Retrieve all airports.
- `GET /api/v1/airports/:id`: Retrieve an airport by ID.
- `PATCH /api/v1/airports/:id`: Update an airport's details (authenticated).
- `DELETE /api/v1/airports/:id`: Delete an airport (authenticated).

### City Routes
- `POST /api/v1/cities`: Create a new city (authenticated).
- `GET /api/v1/cities`: Retrieve all cities.
- `GET /api/v1/cities/:id`: Retrieve a city by ID.
- `PATCH /api/v1/cities/:id`: Update a city's details (authenticated).
- `DELETE /api/v1/cities/:id`: Delete a city (authenticated).

### Flight Routes
- `POST /api/v1/flights`: Create a new flight (authenticated).
- `GET /api/v1/flights`: Retrieve all flights.
- `GET /api/v1/flights/:id`: Retrieve a flight by ID.
- `PATCH /api/v1/flights/:id/seats`: Update seat assignments for a flight (authenticated).

### Booking Routes
- `POST /api/v1/bookings`: Create a new booking (authenticated).
- `POST /api/v1/bookings/payment`: Process a payment for a booking (authenticated).

### Seat Routes
- `POST /api/v1/seats`: Create a new seat (authenticated).
- `GET /api/v1/seats`: Retrieve all seats for an airplane (authenticated).
- `GET /api/v1/seats/:id`: Retrieve a seat by ID (authenticated).
- `PATCH /api/v1/seats/:id`: Update a seat's details (authenticated).
- `DELETE /api/v1/seats/:id`: Delete a seat (authenticated).

## Installation

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL
- Redis
- TypeScript
- Yarn or npm

### Setup
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/waleed21121/Airline-Booking
   cd flights-ticket-booking-api
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
    PORT = 3000
    DIALECT = postgres
    DB_HOST = localhost
    DB_PORT = 5432
    DB_NAME = your_database_name
    DB_USER = your_database_user
    DB_PASSWORD = your_database_password
    NODE_ENV = development
    APP_PASSWORD = your_gmail_app_password
    EMAIL_SERVICE = 'gmail'
    SENDER_EMAIL = your_app_gmail
    SERVER_URL = 'http://localhost:3000/api'
    PUBLIC_KEY = your_jwt_public_key
    PRIVATE_KEY =  your_jwt_private_key
   ```

1. **Set Up PostgreSQL**:
   - Ensure PostgreSQL is running.
   - Create a database named `flights_db`.
   - Run migrations using Sequelize:
     ```bash
     npx sequelize-cli db:migrate
     ```

2. **Start Redis**:
   - Ensure Redis is running on the default port (6379).

### Running the Application
- **Development**:
  ```bash
  npm run start:dev
  # or
  yarn start:dev
  ```
  Uses `nodemon` to watch for changes in TypeScript files.

- **Production**:
  ```bash
  npm run start:prod
  # or
  yarn start:prod
  ```
  Compiles TypeScript to JavaScript and runs the compiled code.

## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License
This project is licensed under the MIT License.