// ./src/database/mongo.js
const {MongoClient} = require('mongodb');
let database = null;

// async function startDatabase(_db_user, _db_pass, _db) {
//   console.log('~MONGO~ this is _db_user -> ', _db_user, ', this is _db_pass -> ', _db_pass, ', and this is _db -> ', _db)
//   const uri = `mongodb+srv://${_db_user}:${_db_pass}@cluster0.ldvp1.mongodb.net/${_db}?retryWrites=true&w=majority`
//   const client = new MongoClient(uri);
//   const connection = await client.connect();
//   database = connection.db(_db);
// }
async function startDatabase() {
  const uri = "mongodb+srv://admin:admin@cluster0.ldvp1.mongodb.net/movies?retryWrites=true&w=majority"
  const client = new MongoClient(uri);
    const connection = await client.connect();
    database = connection.db("movies");
  }

async function getDatabase() {
  if (!database) await startDatabase();
  return database;
}

module.exports = {
  getDatabase,
  startDatabase,
};