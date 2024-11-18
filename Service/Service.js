const express = require('express');
const app = express();

const cors = require('cors');

app.use(express.json());

//Middleware
app.use(cors( //Cross-Origin Resource Sharing
    {
      origin: '*',
      methods: 'GET,POST,PUT,DELETE'
    }
  ));

//Controllers
const cargoController = require('./controllers/cargoController');
const serviceController = require('./controllers/serviceController');
const authController = require('./controllers/authController');

app.use('/api/cargo',cargoController.kargo);
app.use('/api/service',serviceController.hizmet);
app.use('/api/auth',authController.auth);

app.listen(process.env.PORT||3306, () => {
    console.log('Server is running on port 3306');
  });