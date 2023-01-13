CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE products_order(
    product_order_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    product_id uuid DEFAULT uuid_generate_v4 (), 
    order_id uuid DEFAULT uuid_generate_v4 (), 
    order_quantity INTEGER NOT NULL , 
    FOREIGN KEY (product_id) REFERENCES products (id),
    FOREIGN KEY (order_id) REFERENCES orders (id) 
    );
    
 