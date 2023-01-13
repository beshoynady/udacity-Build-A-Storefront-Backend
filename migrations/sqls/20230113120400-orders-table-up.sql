CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE orders(
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    user_id uuid DEFAULT uuid_generate_v4 () NOT NULL,  
    order_status VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) 
    );