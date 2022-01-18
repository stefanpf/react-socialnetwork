DROP TABLE IF EXISTS password_reset_codes;
DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        first VARCHAR NOT NULL,
        last VARCHAR NOT NULL,
        email VARCHAR NOT NULL UNIQUE,
        password VARCHAR NOT NULL,
        image_url TEXT,
        bio TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE friendships( 
  id SERIAL PRIMARY KEY, 
  sender_id INT REFERENCES users(id) NOT NULL,
  recipient_id INT REFERENCES users(id) NOT NULL,
  accepted BOOLEAN DEFAULT false
);

CREATE TABLE password_reset_codes (
        id SERIAL PRIMARY KEY,
        email VARCHAR NOT NULL UNIQUE,
        code VARCHAR,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);