CREATE DATABASE users;

CREATE TABLE user_information (
    id SERIAL PRIMARY KEY,
    email TEXT,
    password TEXT
);