CREATE TABLE IF NOT EXISTS users(id bigserial primary key, email varchar(255), lastName varchar(255), firstName varchar(255), password varchar(255), deletedAt date,
CONSTRAINT uc_email UNIQUE (email));

CREATE TABLE IF NOT EXISTS petModifiers(id bigserial primary key, name varchar(128), property varchar(20), modifier integer, isDeleted boolean DEFAULT false, deletedAt date);

CREATE TABLE IF NOT EXISTS petTypes(id bigserial primary key, name varchar(128), CONSTRAINT uc_name UNIQUE (name));


CREATE TABLE IF NOT EXISTS petProperties(id bigserial primary key, petTypeId integer, name varchar(128), value integer, weight integer, valuePerTime integer);