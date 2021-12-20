// ./src/database/mongo.js
const {MongoMemoryServer} = require('mongodb-memory-server');
const {MongoClient} = require('mongodb');
const {un, pw, db} = require('../../.env')

let database = null;

async function startDatabase() {
const uri = `mongodb+srv://${un}:${pw}@cluster0.ldvp1.mongodb.net/${db}?retryWrites=true&w=majority`
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