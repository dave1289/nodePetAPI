const express = require('express');
const ExpressError = require('./expresserror')
const db = require('./db')
const routes = require('./routes/routes')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/pets', routes)











/** 404 handler */

app.use(function(req, res, next) {
   return new ExpressError("Not Found", 404);
 });
 
 /** general error handler */
 
 app.use((err, req, res, next) => {
   res.status(err.status || 500);
 
   return res.json({
     error: err.message,
   });
 });
 
 module.exports = app;