# to start use this project follow this steps
## create .env file like .env_template and complet your informations
## Installation Instructions

This section contains all the packages used in this project and how to install them.
or, you can use this repo and run the following command at the root directory to install all packages.

`yarn` or `npm install`

### Packages

Here are some of packages that were installed.

#### express

`npm i express`
`npm i --save-dev @types/express`

#### typescript

`npm i --save-dev typescript`

#### db-migrate

`npm install -g db-migrate`

#### rimraf

`npm install --save rimraf`

#### bcrypt

`npm i bcrypt`
`npm i --save-dev @types/bcrypt`

#### morgan

`npm install --save morgan`
`npm i --save-dev @types/morgan`

#### jsonwebtoken

`npm install jsonwebtoken `
`npm i --save-dev @types/jsonwebtoken`

#### dot-env

`npm install dotenv --save`

#### jasmine

`npm install jasmine @types/jasmine ts-node --save-dev`

#### supertest

`npm i supertest`
`npm i --save-dev @types/supertest`

## Set up Database

### Create Databases

We should create the dev and test database.

- connect to the default postgres database as the server's root user `psql -U postgres`
- In psql run the following to create a user
  - `CREATE USER postgres WITH PASSWORD '5;`
- In psql run the following to create the dev and test database
  - `CREATE DATABASE store_dev;`
  - `CREATE DATABASE store_test;`
- Connect to the databases and grant all privileges
  - `\c store_dev`
  - `\c store_test`

### Migrate Database

Navigate to the root directory and run the command below to migrate the database

`npm run migration:up`


## Enviromental Variables Set up

Bellow are the environmental variables that needs to be set in a `.env` file. This is the default setting that I used for development, but you can change it to what works for you.

port = 3000 //this is the server port that's running on
nodeEnv= dev //this is the env of the db
pgHost= localhost  
pgPort=5432 //default port that i'm working at (DB CONNECTION)
pgDb=store_dev //this is the development DB that is the default
pgDb_test=store_test //this is the testing DB that is only at testing
pgUser=postgres //this is the default user os postgress
pgPassword=5 //this is my password for main postgress you can change it
saltRound= 10 //this is the default salt rounf for json web token
pepperHash=pepperHash//this is just any plain text to be the default pepper
token=token //this is secret token to be add while using JWT to gurantee the token

## Start App

`yarn dev` or `npm run dev`

### Running Ports

After start up, the server will start on port `3000` and the database on port `5432`

## Endpoint Access

All endpoints are described in the [REQUIREMENT.md](REQUIREMENTS.md) file.

## Token and Authentication

Tokens are passed along with the http header as

`"Authorization " "Bearer <token>"`

## Testing

Run test with

`yarn migration:test` or `npm run migration:test`

It sets the environment to `test`, migrates up tables for the test database, then running jasmine on the all test cases ,
after that we make reset for all test database tables .

### Changing Enviroment to testing

I had set up two databases, one for development and the other for testing. During testing, I had to make sure the testing database is used instead of the developement database.

To acheive this, I set up a variable in the `.env` file which is by default set to `dev`. During testing, the command `yarn migration:test` will set this variable to `test` in the package.json. Here is the complete command.
`set nodeEnv=test && db-migrate --env test up && npx tsc && jasmine && db-migrate --env test reset `

The first command changes the enviroment variable `ENV` to `test` then the second command migrates all tables, then the jasmine is run and then after testing, the database is reset.




### if want create database tables manually
    - 1- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

        CREATE TABLE users(
            id uuid DEFAULT uuid_generate_v4(),
            email VARCHAR(150) UNIQUE,
            username VARCHAR(150) NOT NULL,
            password VARCHAR(255) NOT NULL
        );
    - 2- CREATE TABLE products(
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            price VARCHAR(50) NOT NULL,
            quantity INTEGER DEFAULT 0 
        );

    - 3- CCREATE TABLE orders(
            id SERIAL PRIMARY KEY,
            product_id INTEGER,
            user_email VARCHAR(60),
            quantity INTEGER DEFAULT 1,
            FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
            FOREIGN KEY (user_email) REFERENCES users(email) ON DELETE CASCADE ON UPDATE CASCADE
        );

        -4- CREATE TABLE products_order(
            product_order_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
            product_id uuid DEFAULT uuid_generate_v4 (), 
            order_id uuid DEFAULT uuid_generate_v4 (), 
            order_quantity INTEGER NOT NULL , 
            FOREIGN KEY (product_id) REFERENCES products (id),
            FOREIGN KEY (order_id) REFERENCES orders (id) 
            );

## follow the routes.
    - 1- to create new user http://localhost:3000/api/users/  method POST
        send json object in body like this: {
                                                "email": "test@test.com",
                                                "username": "test",
                                                "password": "test"
                                            } 

    - 2- to get all users http://localhost:3000/api/users/ method GET

    - 3- to show user http://localhost:3000/api/users/(id) method GET

    - 4- to delete user http://localhost:3000/api/users/(id) method delete
        don't forget send the id in params and send the token

    -5- to update user http://localhost:3000/api/users/(id) method patch    

    - 5- to authenticate and access all routes http://localhost:3000/api/users/login POST
        send user's email and password in body 

    - 7- to create product http://localhost:3000/api/products POST
        send the data of product in body like this: {
                                                        "name": "tee",
                                                        "price": 35,
                                                        "quantity": 2
                                                    }
                                
    - 8- to get all products http://localhost:3000/api/products GET

    - 9- to get product by id http://localhost:3000/api/products/(id)
        send id of product in pram

    - 10- to delete user http://localhost:3000/api/products/(id) method DELETE -- send id of product in pram
    -11- to update user http://localhost:3000/api/products/(id) method patch - send id of product in pram


