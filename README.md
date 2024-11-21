Event Management API

This project is a basic Event Management Platform (EMP) built using Node.js, Express, TypeScript, and MongoDB. The platform allows event organizers to add, update, delete, retrieve, and list events with filtering options.

Features

Add a new event: Create a new event with necessary details.

Update an existing event: Modify details of an existing event.

Delete an event: Remove an event by its ID.

Retrieve an event by its ID: Get event details by providing its unique identifier.

List all events: List all events with optional filtering by event name, organizer, and event date.

Tech Stack

Node.js: JavaScript runtime for building scalable server-side applications.

Express: Web framework for creating the RESTful API.

TypeScript: Typed superset of JavaScript for cleaner and more maintainable code.

MongoDB: NoSQL database for storing event data.

Mongoose: ODM (Object Data Modeling) library for MongoDB.

dotenv: Load environment variables from a .env file.

winston: Logging library for enhanced debugging.

morgan: HTTP request logger.

express-validator: Middleware to validate and sanitize incoming request data.

jsonwebtoken: For JWT-based authentication (optional feature).

Prerequisites

Node.js: v14 or higher

npm: v6 or higher

MongoDB: Running instance of MongoDB

Clone the Repository:
Install Dependencies: npm install
Environment Variables: Create a .env file in the root of the project and provide the following variables
MONGODB_STRING=<Your MongoDB Connection String>

Start the Application: npm start

Run in Docker:
docker build -t northladder-backend .
docker run -p 5002:5002 northladder-backend

Usage
Once the project is running, you can access the following endpoints:

User Management:
POST /api/events: Add a new event.
PUT /api/events/:id: Update an existing event by its ID.
GET /api/events: List all events with optional filters.

eventName: Filter by event name

organizer: Filter by organizer name

eventDate: Filter by event date

GET /api/events/:id: Retrieve an event by its ID.
DELETE /api/events/:id : Delete an event by its ID.
