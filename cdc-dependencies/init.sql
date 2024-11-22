
-- create table
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    marks DOUBLE PRECISION
);


-- Without this, the `before` object of update-query events is null
-- Ref : https://stackoverflow.com/questions/59799503/postgres-debezium-does-not-publish-the-previous-state-of-a-record
ALTER TABLE public.students REPLICA IDENTITY FULL;
