DROP TABLE IF EXISTS password_reset_codes;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        first VARCHAR NOT NULL,
        last VARCHAR NOT NULL,
        email VARCHAR NOT NULL UNIQUE,
        password VARCHAR NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE password_reset_codes (
        id SERIAL PRIMARY KEY,
        email VARCHAR NOT NULL UNIQUE,
        code VARCHAR,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);