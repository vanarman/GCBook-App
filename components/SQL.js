import { SQLite } from 'expo';

const authorTable = 'authors';
const songsTable = 'songs';
const linkAuthorToSong = 'linkAuthorToSong';
const songTypes = 'lyricType';
const songLyrics = 'songLyrics';
const db = SQLite.openDatabase('chordBookSongs');

export default class SQL {
	// Initialize tables
	static InitDatabase() {
		// Initialize Authors table
		db.transaction((tx) => {
			tx.executeSql(`create table if not exists ${authorTable} (id integer primary key not null, aName text);`);
			tx.executeSql(
				`create table if not exists ${songsTable} (id integer primary key not null, sName text, stared boolean);`
			);
			tx.executeSql(
				`create table if not exists ${linkAuthorToSong} (id integer primary key not null, aId integer not null, sId integer not null);`
			);
			tx.executeSql(
				`create table if not exists ${songLyrics} (id integer primary key not null, lyric text, tId integer not null);`
			);
		});

		// Initialize Song Type (Chords, Tabs)
		db.transaction((tx) => {
			tx.executeSql(`create table if not exists ${songTypes} (id integer primary key not null, tName text);`);
			tx.executeSql(`insert into ${songTypes} (id, tName) values (null, 'Chord');`);
			tx.executeSql(`insert into ${songTypes} (id, tName) values (null, 'Tabs');`);
		});
	}

	static TestData() {
		db.transaction(
			(tx) => {
				tx.executeSql(`insert into ${authorTable} (id, aName) values (null, 'Author 1');`);
				tx.executeSql(`insert into ${authorTable} (id, aName) values (null, 'Author 2');`);
				tx.executeSql(`insert into ${authorTable} (id, aName) values (null, 'Author 3');`);

				tx.executeSql(`insert into ${songsTable} (id, sName, stared) values (null, 'Song A1.1', false);`);
				tx.executeSql(`insert into ${linkAuthorToSong} (id, aId, sId) values (null, 1, last_insert_rowid());`);
				tx.executeSql(`insert into ${songsTable} (id, sName, stared) values (null, 'Song A1.2', false);`);
				tx.executeSql(`insert into ${linkAuthorToSong} (id, aId, sId) values (null, 1, last_insert_rowid());`);
				tx.executeSql(`insert into ${songsTable} (id, sName, stared) values (null, 'Song A2.2', true);`);
				tx.executeSql(`insert into ${linkAuthorToSong} (id, aId, sId) values (null, 2, last_insert_rowid());`);
				tx.executeSql(`insert into ${songsTable} (id, sName, stared) values (null, 'Song A2.3', true);`);
				tx.executeSql(`insert into ${linkAuthorToSong} (id, aId, sId) values (null, 2, last_insert_rowid());`);
				tx.executeSql(`insert into ${songsTable} (id, sName, stared) values (null, 'Song A3.1', false);`);
				tx.executeSql(`insert into ${linkAuthorToSong} (id, aId, sId) values (null, 3, last_insert_rowid());`);
			},
			() => {
				console.log(`Test data was not loaded`);
			},
			() => {
				console.log(`Test data loaded`);
			}
		);
	}

	// Select all Authors
	static SelectAuthorsList = () => {
		return new Promise((resolve, reject) => {
			db.transaction(async (tx) => {
				await tx.executeSql(`select * from ${authorTable} order by aName`, null, (_, { rows: { _array } }) => {
					resolve(_array);
				});
			});
		});
	};

	// Select songs based on the author id (aId)
	static SelectSongsOfAuthor = (aId) => {
		return new Promise((resolve, reject) => {
			db.transaction(async (tx) => {
				await tx.executeSql(
					`SELECT las.id, aId, sId, aName, sName, stared FROM ${linkAuthorToSong} las INNER JOIN ${authorTable} a ON las.aId = a.id INNER JOIN ${songsTable} s ON las.sId = s.id WHERE las.aId = ${aId};`,
					null,
					(_, { rows: { _array } }) => {
						resolve(_array);
					}
				);
			});
		});
	};

	// Insert new author or Update author name
	static AddNewAuthor(name) {
		db.transaction((tx) => {
			tx.executeSql(`insert into ${authorTable} (id, aName) values (?, ?)`, [ null, name ]);
		});
	}

	// Insert new song or Update aong name
	static AddNewSong(authorId, name) {
		db.transaction((tx) => {
			tx.executeSql(`insert into ${songsTable} (id, sName, stared) values (?, ?, ?)`, [ null, name, false ]);
			tx.executeSql(
				`insert into ${linkAuthorToSong} (id, aId, sId) values (null, ${authorId}, last_insert_rowid());`
			);
		});
	}

	// Delete author from Db by Id
	static DeleteAuthor(id) {
		db.transaction((tx) => {
			tx.executeSql(`delete from ${authorTable} where id = ${id}`);
		});
	}

	static DeleteSong(songId, linkId) {
		db.transaction((tx) => {
			tx.executeSql(`delete from ${songsTable} where id = ${songId};`);
			tx.executeSql(`delete from ${linkAuthorToSong} where id = ${linkId};`);
		});
	}

	static toggleStared(songId) {
		db.transaction((tx) => {
			tx.executeSql(
				`UPDATE songs SET stared = NOT (SELECT stared from songs where id = ${songId}) WHERE id = ${songId};`
			);
		});
	}

	// Clear database
	static DropAllTables() {
		db.transaction(
			(tx) => {
				tx.executeSql(`drop table ${authorTable};`);
				tx.executeSql(`drop table ${songsTable};`);
				tx.executeSql(`drop table ${linkAuthorToSong};`);
			},
			() => {
				console.log(`Tables ${authorTable}, ${songsTable} and ${linkAuthorToSong} can NOT be dropped`);
			},
			() => {
				console.log(`Table ${authorTable}, ${songsTable} and ${linkAuthorToSong} dropped`);
			}
		);
	}
}
