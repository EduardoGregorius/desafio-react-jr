create database dbApiProducts;

use dbApiProducts;

create table produtos (
codigo int primary key auto_increment,
descricao varchar(100),
preco float,
data_cadastro date
);

insert into produtos (descricao, preco, data_cadastro) values ('Sapato fechado cor azul', '259.99', '2023-10-06');
insert into produtos (descricao, preco, data_cadastro) values ('Chinelo havaianas vermelho', '42.50', '2023-05-11');
insert into produtos (descricao, preco, data_cadastro) values ('Tenis asics branco', '299.99', '2024-02-01');

select * from produtos;