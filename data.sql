CREATE TABLE pets (
   pet_id serial PRIMARY KEY,
   name VARCHAR (15) NOT NULL,
   age INT,
   species VARCHAR(10) NOT NULL,
   coolness INT
);