create database noteapp;
use noteapp;
create table category(
id int auto_increment primary key,
name varchar(15) not null
);
create table notes(
id int auto_increment primary key,
title varchar(50) not null,
note text not null,
time timestamp not null,
category int not null  
);

insert into category(name)values('personal'),('work'),('school');
insert into notes (title,note,category)values('to do list','1. Learn Node.js',1),
('homework','math page 12 ',3);
select * from notes ;
select * from category;
select title,note,c.name 'category' from notes n inner join category c on c.id = n.id where n.id=1;

alter table notes add foreign key (category) references category(id) on delete cascade on update cascade;




