CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE products(
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price VARCHAR(50) NOT NULL,
    quantity INTEGER DEFAULT 0 
);