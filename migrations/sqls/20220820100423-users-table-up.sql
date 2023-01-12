/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    id uuid DEFAULT uuid_generate_v4(),
    email VARCHAR(150) UNIQUE,
    username VARCHAR(150) NOT NULL,
    password VARCHAR(255) NOT NULL
);