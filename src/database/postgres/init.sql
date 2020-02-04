CREATE TABLE IF NOT EXISTS users(id bigserial primary key, email varchar(255), lastName varchar(255), firstName varchar(255), password varchar(255), isDeleted boolean DEFAULT false, deletedAt date,
CONSTRAINT uc_email UNIQUE (email));

CREATE TABLE IF NOT EXISTS petModifiers(id bigserial primary key, name varchar(128), property varchar(20), modifier integer, isDeleted boolean DEFAULT false, deletedAt date);
