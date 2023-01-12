API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products

API Endpoints
Users
route.post('/', controllers.Create) //when creating new user no need to validation
route.get('/', verifyToken, controllers.Index) //require validation
route.get('/:user_id', verifyToken, controllers.Show) //require validation
route.patch('/:user_id', verifyToken, controllers.route.patch('/:user_id', verifyToken, controllers.Update) 
) //require validation
route.delete('/:user_id', verifyToken, controllers.Delete) //require validation
route.post('/login', controllers.route.post('/login', controllers.Authenticate) 
) //the main validation


Products
route.post('/', Validation, controllers.Create) //when creating new user no need to validation
route.get('/', controllers.Index) //require validation
route.get('/:product_id', controllers.Show) //require validation
route.patch('/:product_id', Validation, controllers.Update) //require validation
route.delete('/:product_id', Validation, controllers.Delete) //require validation


#Orders

route.post('/', Validation, controllers.Create) //when creating new user no need to validation
route.get('/', Validation, controllers.Index) //require validation
route.get('/:order_id', Validation, controllers.Show) //require validation
route.patch('/:order_id', Validation, controllers.Update) //require validation
route.delete('/:order_id', Validation, controllers.Delete) //require validation


###Data Shapes

##users
    id uuid DEFAULT uuid_generate_v4(),
    email VARCHAR(150) UNIQUE,
    username VARCHAR(150) NOT NULL,
    password VARCHAR(255) NOT NULL

##products
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price VARCHAR(50) NOT NULL,
    quantity INTEGER DEFAULT 0 

##orders
    id SERIAL PRIMARY KEY,
    product_id INTEGER,
    user_email VARCHAR(60),
    quantity INTEGER DEFAULT 1,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_email) REFERENCES users(email) ON DELETE CASCADE ON UPDATE CASCADE
