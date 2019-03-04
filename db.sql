create table if not exists authors (id integer primary key not null, aName text);
create table if not exists songs (id integer primary key not null, sName text, stared boolean);
create table if not exists linkAuthorToSong (id integer primary key not null, aId integer not null, sId integer not null);

create table if not exists songTypes (id integer primary key not null, tName text);
create table if not exists songLyrics (id integer primary key not null, lyric text, tId integer not null);
create table if not exists linkLyricToSong (id integer primary key not null, sId integer not null, lId integer not null);

insert into songTypes (id, tName) values (null, 'Chord');
insert into songTypes (id, tName) values (null, 'Tabs');

insert into authors (id, aName) values (null, 'Author 1');

insert into songs (id, sName, stared) values (null, 'Song A1.1', false);
insert into linkAuthorToSong (id, aId, sId) values (null, 1, last_insert_rowid());
insert into songs (id, sName, stared) values (null, 'Song A1.2', false);
insert into linkAuthorToSong (id, aId, sId) values (null, 1, last_insert_rowid());
insert into songs (id, sName, stared) values (null, 'Song A1.3', false);
insert into linkAuthorToSong (id, aId, sId) values (null, 1, last_insert_rowid());

insert into authors (id, aName) values (null, 'Author 2');

insert into songs (id, sName, stared) values (null, 'Song A2.1', false);
insert into linkAuthorToSong (id, aId, sId) values (null, 2, last_insert_rowid());
insert into songs (id, sName, stared) values (null, 'Song A2.2', false);
insert into linkAuthorToSong (id, aId, sId) values (null, 2, last_insert_rowid());

insert into authors (id, aName) values (null, 'Author 3');

insert into songs (id, sName, stared) values (null, 'Song A3.1', false);
insert into linkAuthorToSong (id, aId, sId) values (null, 3, last_insert_rowid());
insert into songs (id, sName, stared) values (null, 'Song A3.2', false);
insert into linkAuthorToSong (id, aId, sId) values (null, 3, last_insert_rowid());
insert into songs (id, sName, stared) values (null, 'Song A3.3', true);
insert into linkAuthorToSong (id, aId, sId) values (null, 3, last_insert_rowid());
insert into songs (id, sName, stared) values (null, 'Song A3.4', false);
insert into linkAuthorToSong (id, aId, sId) values (null, 3, last_insert_rowid());

insert into authors (id, aName) values (null, 'Author 4');