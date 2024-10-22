# Dictionary Project

Welcome to the Dictionary project! This monorepo contains both the frontend and backend applications for a fully functional dictionary web application.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)

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

## Running the Application
1. Navigate to the root directory.
2. Install the dependencies: npm install
3. Run project: npm start

The frontend will be running on http://localhost:3000.
The backend will be running on http://localhost:3001.

## API Documentation
1. **GET api/v1/dictionary/:word** : Search a word
2. **GET api/v1/dictionay/top** : Get top 10 seearched words

Example Requests
1. curl -X GET http://localhost:3001/api/v1/dictionary/hello
2. curl -X GET http://localhost:3001/api/v1/dictionary/top










