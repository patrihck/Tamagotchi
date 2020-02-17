CREATE TABLE IF NOT EXISTS users(id bigserial primary key, email varchar(255), lastName varchar(255), firstName varchar(255), password varchar(255), updatedAt date, deletedAt date, CONSTRAINT uc_email UNIQUE (email));

CREATE TABLE IF NOT EXISTS userRoles(id bigserial primary key, name varchar(20), CONSTRAINT uc_rolename UNIQUE(name));

CREATE TABLE IF NOT EXISTS petModifiers(id bigserial primary key, name varchar(128), property varchar(20), modifier integer, petActionId integer, CONSTRAINT uc_modifier_name UNIQUE (name));

CREATE TABLE IF NOT EXISTS petTypes(id bigserial primary key, name varchar(128), CONSTRAINT uc_type_name UNIQUE (name));

CREATE TABLE IF NOT EXISTS petProperties(id bigserial primary key, petTypeId integer, name varchar(128), value integer, weight integer, valuePerTime integer);

CREATE TABLE IF NOT EXISTS petActions(id bigserial primary key, petTypeId integer, name varchar(128), updatedAt date, CONSTRAINT uc_action_name UNIQUE (name));

CREATE TABLE IF NOT EXISTS pets(id bigserial primary key, petTypeId integer, userId integer, health integer default 100, name varchar(128), CONSTRAINT uc_pet_name UNIQUE (name)); 
