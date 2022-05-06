drop table if exists ratings cascade;
drop table if exists votes cascade;
drop table if exists statements cascade;
drop table if exists polls cascade;
drop table if exists users cascade;

create table users (
	user_id serial primary key,
	email text not null,
	password text not null,
	firstname text not null,
	lastname text not null,
	admin integer default 0,
	unique (email)
);

create table polls (
	poll_id serial primary key,
	user_id integer not null,
	title text not null,
	description text,
	credits integer not null,
	visible integer default 1,
	created_at timestamp default now(),
	check (credits > 0 and credits < 251),
	foreign key (user_id) references users (user_id)
);

create table statements (
	statement_id serial primary key,
	poll_id integer not null,
	header text not null,
	description text,
	foreign key (poll_id) references polls (poll_id)
);

create table votes (
    statement_id integer not null,
	user_id integer not null,
    vote integer not null,
    sent_at timestamp default now(),
	primary key (statement_id, user_id),
	foreign key (statement_id) references statements (statement_id),
	foreign key (user_id) references users (user_id)
);

create table ratings (
	poll_id integer not null,
	user_id integer not null,
	rating integer not null,
	comment text,
	check (rating > -1 and rating < 6),
	primary key (poll_id, user_id),
	foreign key (poll_id) references polls (poll_id),
	foreign key (user_id) references users (user_id)
);