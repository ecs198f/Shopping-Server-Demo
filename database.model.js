'use-strict'

// Database
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('shopping.db')


db.serialize(() => {
	let cmd = "SELECT name FROM sqlite_master WHERE type='table' AND name='shoppingTable' ";
	db.get(cmd, (err, val) => {
		if (err) throw err;

		if (val == undefined) {
			console.log("Creating Database ...");
			createShoppingDB();
		} else {
			console.log("Database file found", val);
		}
	});
})

function createShoppingDB() {
	const sql = (
		`CREATE TABLE shoppingTable (
			id INTEGER PRIMARY KEY UNIQUE,
			shoppingItem TEXT,
			price INTEGER,
            image TEXT
		)`
	);

	db.run(sql, function(err, val) {
		if (err) {
			console.log("Database creation failure", err.message);
		} else {
			console.log("Created database");
		}
	});
}

module.exports = db;
