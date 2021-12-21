// ./src/database/mongo.js
const {MongoMemoryServer} = require('mongodb-memory-server');
const {MongoClient} = require('mongodb');
require('dotenv').config();

let database = null;

async function startDatabase() {
const uri = `mongodb+srv://${process.env.un}:${process.env.pw}@cluster0.ldvp1.mongodb.net/${process.env.db}?retryWrites=true&w=majority`
const client = new MongoClient(uri);
  const connection = await client.connect();
  database = connection.db(process.env.db);
}

async function getDatabase() {
  if (!database) await startDatabase();
  return database;
}

module.exports = {
  getDatabase,
  startDatabase,
};