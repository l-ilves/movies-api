// ./src/database/mongo.js
const {MongoMemoryServer} = require('mongodb-memory-server');
const {MongoClient} = require('mongodb');

let database = null;

async function startDatabase() {
//   const mongo = new MongoMemoryServer();
//   const mongoDBURL = await mongo.getUri();
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