/* Replace with your SQL commands */
CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price VARCHAR(50) NOT NULL,
    quantity INTEGER DEFAULT 0 
);