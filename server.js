import fs from 'fs';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'

import config from './config';

// initialize the API
const app = express();

// setup bodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// setup mongoose
mongoose.Promise = global.Promise
mongoose.connect(config.db.url);

mongoose.connection.on('error', function() {
  console.log("Could not connect to the database. Exiting now...");
  process.exit();
});

mongoose.connection.once('open', function() {
  console.log("Successfully connected to the database");
});


// register routes
import propertyRoutes from './routes/property.routes.js'
propertyRoutes(app);
import leaseRoutes from './routes/lease.routes.js'
leaseRoutes(app);
import tenantRoutes from './routes/tenant.routes.js'
tenantRoutes(app);



app.get('/', function(req, res) {
  res.send("hello World!")
});


// listen on the designated port found in the configuration
app.listen(config.server.port, function() {
    console.log("Example app listenting on port " + config.server.port);
});
