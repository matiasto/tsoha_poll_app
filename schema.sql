drop table if exists answers;
drop table if exists questions;
drop table if exists polls;

create table polls (
	poll_id integer generated always as identity,
	title text not null,
	description text,
	credits integer,
	visibility boolean default true,
	created_at timestamp,
	primary key(poll_id)
);

create table questions (
	question_id integer generated always as identity,
	poll_id integer,
	header text not null,
	description text,
	primary key(question_id),
	constraint fk_poll
    	foreign key (poll_id) 
	  		references polls(poll_id)
);

create table answers (
    answer_id integer generated always as identity,
    question_id integer,
    votes integer,
    sent_at timestamp,
    primary key(answer_id),
	constraint fk_question
    	foreign key (question_id) 
	  		references questions(question_id)
);