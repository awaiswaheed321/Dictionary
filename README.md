# Dictionary Project

Welcome to the Dictionary project! This monorepo contains both the frontend and backend applications for a fully functional dictionary web application.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
  - [Endpoints](#endpoints)
  - [Example Requests](#example-requests)
- [Swagger API Documentation](#swagger-api-documentation)

## Features
- **Search Functionality:** Quickly search for words and retrieve definitions.
- **Real-time Updates:** The application updates search counts in real-time.
- **User-friendly Interface:** Built with Material UI for a responsive design.
- **RESTful API:** A backend API for managing word entries and counts.
- **Data Validation:** Ensures proper input formats and handles errors gracefully.

## Technologies
- **Frontend:**  
  - React  
  - Vite  
  - Material UI
- **Backend:**  
  - TypeScript  
  - Express  
  - SQLite
- **Package Management:** npm

## Getting Started

### Prerequisites
Make sure you have the following installed:
- Node.js (version 14.x or higher)
- npm

### Running the Application
1. Navigate to the root directory.
2. Install the dependencies:
   ```bash
   npm install
3. Run the project:
   ```bash
   npm start

The frontend will be running on http://localhost:3000. The backend will be running on http://localhost:3001.

## API Documentation
### Endpoints
1. `GET api/v1/dictionary/:word` : Search a word.
2. `GET api/v1/dictionary/top` : Get the top 10 searched words.

### Example Requests
1. ```bash
   curl -X GET http://localhost:3001/api/v1/dictionary/hello
2. ```bash
   curl -X GET http://localhost:3001/api/v1/dictionary/hello

## Swagger API Documentation

To view the interactive API documentation using Swagger, navigate to `http://localhost:3001/api-docs` in your web browser. This will provide a user-friendly interface to explore and test the available API endpoints.

### Swagger Features
- **Interactive UI:** Easily test API endpoints directly from the browser.
- **Auto-generated Documentation:** The API documentation is automatically generated based on the defined endpoints and their descriptions.
- **Request and Response Examples:** See examples of requests and responses for each endpoint.
