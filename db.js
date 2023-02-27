const { Client } = require('pg');

let DB_URI;

if (process.env.NODE_ENV === 'test') {
   DB_URI = 'postgresql:///fake_api_test';
}
else {
   DB_URI = 'postgresql:///fake_api'
}

let db = new Client({
   username: 'daveNode',
   password: 'pass',
   connectionString: DB_URI
});


db.connect();

module.exports = db;