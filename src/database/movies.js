// ./src/database/movies.js
const {getDatabase} = require('./mongo');
const {ObjectID} = require('mongodb');

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

  async function getMovie(id) {
    const database = await getDatabase();
    return await database.collection(collectionName).find({_id: new ObjectID(id),}).toArray();
  }

  async function deleteMovie(id) {
    const database = await getDatabase();
    await database.collection(collectionName).deleteOne({
      _id: new ObjectID(id),
    });
  }
  
  async function updateMovie(id, movie) {
    const database = await getDatabase();
    delete movie._id;
    await database.collection(collectionName).updateOne(
      { _id: new ObjectID(id), },
      {
        $set: {
          ...movie,
        },
      },
    );
  }
  
  module.exports = {
    insertMovie,
    getMovies,
    getMovie,
    deleteMovie,
    updateMovie
  };