const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config')
const loginRegisterRoute = require('./routes/login');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/', loginRegisterRoute);
 
mongoose.connect(process.env.databaseConnection, 
  {useNewUrlParser: true, useUnifiedTopology: true},
  () => {
    console.log('Connected to the database')
})

function listen(){
  app.listen(3000);
  console.log('Listening on port 3000')
} 

listen();