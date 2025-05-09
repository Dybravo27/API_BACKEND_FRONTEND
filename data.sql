# Creacion usuarios
create user 'dylan_dom_api'@'localhost' identified by '1100954165';
# creacion de la base de datos
create database eventos_dom_api;

grant all on eventos_dom_api.* to dylan_dom_api@localhost;

flush privileges;

create table ciudades (
id_ciudad int auto_increment,
nombre_ciudad varchar(50),
primary key(id_ciudad)
);

create table generos (
id_genero int auto_increment,
genero varchar(50),
primary key (id_genero)
);

create table lenguajes (
id_lenguaje int auto_increment,
nombre_lenguaje varchar(50),
primary key (id_lenguaje)
);

create table usuarios (
id_usuario int auto_increment,
nombre varchar(50),
apellido varchar(50),
telefono int(10),
documento int(10),
usuario varchar(100),
contrasena varchar(100),
id_ciudad int,
id_genero int,
foreign key (id_genero) references generos (id_genero),
foreign key (id_ciudad) references ciudades (id_ciudad),
primary key (id_usuario)
);

create table lenguaje_usuario (
id_usuario int,
id_lenguaje int,
foreign key (id_usuario) references usuarios (id_usuario),
foreign key (id_lenguaje) references lenguajes (id_lenguaje)
);

insert into ciudades(nombre_ciudad) values
('Piedecuesta'),
('Bucaramanga'),
('Giron'),
('Floridablanca'),
('Lebrija');

insert into lenguajes(nombre_lenguaje) values
('JAVA'),
('.NET'),
('SQL'),
('JavaScript'),
('PHP'),
('PHYTON');

insert into generos(genero) values
('Masculino'),
('Femenino'),
('Otros');

select * from usuarios;
drop table ciudades;
insert into usuarios (nombre, apellido, telefono, documento, usuario, contrasena, id_ciudad, id_genero) values 
('Dylan', 'Bravo', 3002040190, 123456789, 'Dybravo27', '150195', 3, 3);