const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
//Database connection
const db= require('./config/db');

app.set('view engine', 'ejs'); // ejs

//Middleware
app.use("/static",express.static(path.join(__dirname,"public")));





app.use(express.urlencoded({ extended: true }));

app.use(express.json());

//Routes
const auth = require('./routers/auth');
const admin = require('./routers/admin');

// buraya api/partner/... şeklinde bir route gelecek
app.use('/auth',auth);//giriş yapacak veya üye olacak.
app.use('/admin',admin)

require('./helpers/sms-verify2')

app.listen(process.env.PORT || 308, () => {
    console.log('MicroService Auth is running on port 308');
  });