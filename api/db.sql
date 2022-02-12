create schema kosumbaeva_saadat_ex_10 collate utf8_general_ci;

use kosumbaeva_saadat_ex_10;

create table news
(
    id          int auto_increment
        primary key,
    title       text                                not null,
    description text                                not null,
    image       varchar(31)                         null,
    date        timestamp default CURRENT_TIMESTAMP null
);

create table comments
(
    id          int auto_increment
        primary key,
    news_id     int          not null,
    author      varchar(255) null,
    description varchar(255) not null,
    constraint comments_news_id_fk
        foreign key (news_id) references news (id)
            on update cascade on delete cascade
);

insert into kosumbaeva_saadat_ex_10.news (id, title, description, image, date)
values  (14, 'Post1', 'Content1', 'CLXvXYTbkKIad5R49hHnG.jpg', '2022-02-12 19:47:13'),
        (15, 'Post2', 'Content2', 'ehjbdTXyteiGUWP1DaOLK.jpg', '2022-02-12 19:47:52'),
        (16, 'Post3', 'Content3', 'yz-VXaCsj7KvOdSEoI0NR.jpg', '2022-02-12 19:48:10');

insert into kosumbaeva_saadat_ex_10.comments (id, news_id, author, description)
values  (14, 14, 'Author1', 'Comment1'),
        (15, 14, 'Author2', 'Comment2'),
        (16, 15, 'Author1', 'Comment1'),
        (17, 15, null, 'Comment2'),
        (18, 16, 'Author1', 'Comment1');

