CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(32) NOT NULL UNIQUE,
    name VARCHAR(32) NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_recipes INTEGER[],
    fav_recipes INTEGER[],
    comments INTEGER[]
);

CREATE TABLE recipes(
    id SERIAL PRIMARY KEY,
    creator_id INTEGER,

    recipe_name VARCHAR(32) NOT NULL,
    description VARCHAR(500) NOT NULL,
    nationality VARCHAR(32),
    main_ingr VARCHAR(32),
    ingr VARCHAR(32) ARRAY,
    food_time CHAR,
    difficulty INTEGER,
    time_taken INTEGER,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE
);


CREATE TABLE feedbacks(
    id SERIAL PRIMARY KEY,
    rating INTEGER NOT NULL,
    
    user_id INTEGER NOT NULL,
    recipe_id INTEGER NOT NULL,
    comment VARCHAR(500),
    commented_at DATE NOT NULL DEFAULT CURRENT_DATE,

    CONSTRAINT recipes FOREIGN KEY(recipe_id) REFERENCES recipes(id),
    CONSTRAINT users FOREIGN KEY(user_id) REFERENCES users(id)
);

SELECT rating, comment, name, created_at FROM feedbacks INNER JOIN recipes ON feedbacks.recipe_id = recipes.id INNER JOIN users ON feedbacks.user_id = users.id;
INSERT INTO feedbacks (rating,comment,user_id,recipe_id) VALUES (1, 'Pretty good!', 1, 10);