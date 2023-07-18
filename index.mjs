import Database from 'better-sqlite3';
import * as sqlite_vss from 'sqlite-vss';

const db = new Database(':memory:');
sqlite_vss.load(db);

const version = db.prepare('select vss_version()').pluck().get();
console.log(version);

db.exec('create virtual table vss_demo using vss0(a(3));');

const stmt = db.prepare('INSERT INTO vss_demo VALUES (?)');
const selectStmt = db.prepare('SELECT * from vss_demo;');

const embedding1 = [0.1, 0.2, 0.3];
const embedding2 = [0.2, 0.3, 0.4];

stmt.run(JSON.stringify(embedding1));
stmt.run(JSON.stringify(embedding2));

console.log(selectStmt.all());
