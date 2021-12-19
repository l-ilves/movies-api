// ./src/database/movies.js
const {getDatabase} = require('./mongo');

const collectionName = "movies-list";


async function insertMovie(movie) {
    const database = await getDatabase();
    const {insertedId} = await database.collection(collectionName).insertOne(movie);
    return insertedId;
  }
  
  async function getMovies() {
    const database = await getDatabase();
    return await database.collection(collectionName).find({}).toArray();
  }
  
  module.exports = {
    insertMovie,
    getMovies,
  };