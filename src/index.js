// ./src/index.js

// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const {startDatabase} = require('./database/mongo');
const {insertMovie, getMovies, deleteMovie, updateMovie} = require('./database/movies');

// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// replace the endpoint responsible for the GET requests
app.get('/', async (req, res) => {
    res.send(await getMovies());
});

  // start the in-memory MongoDB instance
startDatabase().then(async () => {
    await insertMovie({title: 'Hello, now from the in-memory database!'});
  
    // start the server
    app.listen(3001, async () => {
      console.log('listening on port 3001');
    });
});