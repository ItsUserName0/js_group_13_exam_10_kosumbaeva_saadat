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
values  (1, 'title1', 'description2', 'OQ24ns6ik7bHOr8P8l-Qn.png', '2022-02-12 13:03:51'),
        (2, 'title2', 'description2', '_mJEqDFRz8S13xnzq24ud.png', '2022-02-12 13:03:51'),
        (3, 'title2', 'description2', 'fLGlAaO9hYbiQM-_nS9l1.png', '2022-02-12 13:09:15'),
        (5, 'title3', 'description2', '6GfjVU0jVjTQdAWAQXtk0.png', '2022-02-12 13:13:43'),
        (6, 'title3', 'description2', '8s3uQeg-xBXLvhppkOTbI.png', '2022-02-12 13:18:00');

insert into kosumbaeva_saadat_ex_10.comments (id, news_id, author, description)
values  (1, 1, 'author1', 'description1'),
        (2, 1, null, 'description1'),
        (3, 3, null, 'description1'),
        (6, 3, null, 'description1'),
        (7, 3, null, 'description1'),
        (8, 3, null, 'description1');

