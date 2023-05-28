CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(32) NOT NULL UNIQUE,
    name VARCHAR(32) NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE recipes(
    id SERIAL PRIMARY KEY,

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

CREATE TABLE user_recipe(
    id SERIAL PRIMARY KEY,
    
    user_id INTEGER NOT NULL,
    recipe_id INTEGER NOT NULL,
    table_relation BOOLEAN,

    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL,
    CONSTRAINT fk_recipe FOREIGN KEY(recipe_id) REFERENCES recipes(id) ON DELETE SET NULL 
);

CREATE TABLE user_feedback(
    id SERIAL PRIMARY KEY,
    
    user_id INTEGER NOT NULL,
    feedback_id INTEGER NOT NULL,
    table_relation BOOLEAN,

    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL,
    CONSTRAINT fk_feedback FOREIGN KEY(feedback_id) REFERENCES feedbacks(id) ON DELETE SET NULL 
);


CREATE TABLE feedbacks(
    id SERIAL PRIMARY KEY,
    rating INTEGER NOT NULL,
    comment VARCHAR(500)
);
