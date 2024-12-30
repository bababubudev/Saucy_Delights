# Saucy Delights Backend

This is the backend service for the Saucy Delights project, a collaborative project built with TypeScript, JavaScript, and Express.js to manage recipes, user authentication, and feedback.

## Table of Contents

- [Saucy Delights Backend](#saucy-delights-backend)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
    - [User Routes](#user-routes)
    - [Recipe Routes](#recipe-routes)
    - [Feedback Routes](#feedback-routes)
  - [Filtering Recipes](#filtering-recipes)
  - [Middleware](#middleware)
  - [Error Handling](#error-handling)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- User authentication (login, register, update, delete)
- Recipe management (create, read, update, delete)
- Feedback management (create, read, update, delete)
- Filtering and pagination for recipes

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/bababubudev/Saucy_Delights.git
   cd Saucy_Delights/backend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up the environment variables (see [Environment Variables](#environment-variables) section)

4. Start the server
   ```bash
   npm start
   ```

## Environment Variables

Create a `.env` file in the `backend` directory and add the following environment variables:

```
PORT=5000
ACCESS_TOKEN_SECRET=your_secret_key
DATABASE_URL=your_database_url
```

## Usage

1. Start the development server:
   ```bash
   npm start
   ```

2. The server will be running on `http://localhost:5000`

## API Endpoints

### User Routes

- `GET /api/users` - Log in user
- `POST /api/users` - Register user
- `PUT /api/users` - Update user (protected)
- `DELETE /api/users` - Delete user (protected)
- `GET /api/users/me` - Get user info by token (protected)

### Recipe Routes

- `GET /api/recipes` - Get filtered recipes
- `POST /api/recipes` - Create a new recipe
- `GET /api/recipes/:id` - Get a recipe by ID
- `PATCH /api/recipes/:id` - Update a recipe by ID
- `DELETE /api/recipes/:id` - Delete a recipe by ID

### Feedback Routes

- `GET /api/feedbacks` - Get all feedbacks
- `GET /api/feedbacks/:id` - Get feedback by ID
- `POST /api/feedbacks/:id` - Create feedback for a recipe
- `PATCH /api/feedbacks/:id` - Update feedback by ID
- `DELETE /api/feedbacks/:id` - Delete feedback by ID

## Filtering Recipes

The backend supports filtering recipes based on various parameters. The filtering logic is implemented in the `recipeController.js` file. The following filters can be applied:

- **Normal Filters**: Filter based on exact matches or partial matches (using ILIKE for case-insensitive matches).
  - Example: `recipe_name`, `nationality`, `main_ingr`, `food_time`, `difficulty`, `time_taken`

- **Between Filters**: Filter based on a range of values.
  - Example: `time_taken_min`, `time_taken_max`

- **Array Filters**: Filter based on an array of values.
  - Example: `ingr` (ingredients)

- **Offset and Limit**: Pagination support.
  - Example: `offset`, `limit`

Example request:
```
GET /api/recipes?recipe_name=pasta&difficulty=easy&time_taken_min=10&time_taken_max=30&ingr=tomato,cheese&offset=0&limit=10
```

## Middleware

- `authMiddleware.js` - Protect routes that require authentication
- `errorMiddleware.js` - Handle errors and send appropriate responses

## Error Handling

All errors are handled by the `errorMiddleware.js`. The middleware catches errors and sends a JSON response with the error message and stack trace (in development mode).

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add new feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Open a Pull Request
