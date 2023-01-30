CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(32) NOT NULL UNIQUE,
    name VARCHAR(32) NOT NULL,
    password VARCHAR(32) NOT NULL,
    created_recipes INTEGER[],
    fav_recipes INTEGER[],
    comments INTEGER[]
);