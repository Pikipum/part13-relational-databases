CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

insert into blogs (author, url, title, likes) values ('John User', 'testing.com', 'Testing SQL', 23);
insert into blogs (url, title) values ('exampleurl.com', 'another blog');

postgres=# select * from blogs;
 id |  author  |      url       |    title     | likes
----+----------+----------------+--------------+-------
  1 | JohnUser | testing.com    | Testing SQL  |    23
  2 |          | exampleurl.com | another blog |     0
(2 rows)