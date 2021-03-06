// ./src/index.js

// importing the dependencies
require('dotenv').config({path: '../env'});
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const {startDatabase} = require('./database/mongo');
const {insertMovie, getMovies, getMovie, deleteMovie, updateMovie} = require('./database/movies');
// let _db_user = process.env.DB_USER;
// let _db_pass = process.env.DB_PASS;
// let _db = process.env.DB;


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

// endpoint responsible for the GET requests
app.get('/', async (req, res) => {
    res.send(await getMovies());
});

// endpoint to get a movie
app.get('/:id', async(req, res) => {
    res.send(await getMovie(req.params.id))
})

// const checkJwt = jwt({
//     secret: jwksRsa.expressJwtSecret({
//       cache: true,
//       rateLimit: true,
//       jwksRequestsPerMinute: 5,
//       jwksUri: `https://<AUTH0_DOMAIN>/.well-known/jwks.json`
//     }),
  
//     // Validate the audience and the issuer.
//     audience: 'https://movies-api',
//     issuer: `https://lilves.us.auth0.com/`,
//     algorithms: ['RS256']
//   });

  

// endpoint to insert movie
// app.use(checkJwt);
app.post('/', async (req, res) => {
    const newMovie = req.body;
    await insertMovie(newMovie);
    res.send({ message: 'New movie inserted.' });
  });
  
// endpoint to delete a movie
// app.use(checkJwt);
app.delete('/:id', async (req, res) => {
await deleteMovie(req.params.id);
res.send({ message: 'Movie removed.' });
});
  
// endpoint to update a movie
// app.use(checkJwt);
app.put('/:id', async (req, res) => {
const updatedMovie = req.body;
await updateMovie(req.params.id, updatedMovie);
res.send({ message: 'Movie updated.' });
});
  
  // start the MongoDB instance
startDatabase().then(async () => {
  console.log('~INDEX~ this is _db_user -> ', process.env.DB)
    // start the server
    app.listen(3001, async () => {
      console.log('listening on port 3001');
    });
});