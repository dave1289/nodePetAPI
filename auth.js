const jwt = require('jsonwebtoken')
const ExpressError = require('./expressError')
const SECRET_KEY = 'KEYBEYZ'
const jsonschema = require('jsonschema')
const db = require('./db')

function authenticateJWT(req, res, next) {
   try {
      const tokenFromBody = req.body._token
      const payload = jwt.verify(tokenFromBody, SECRET_KEY)
      console.log('Your token is valid')
      req.user = payload;
      return next();
   } catch(e) {
      return next()      
   }
}

function ensureLoggedIn(req, res, next) {
   if (!req.user) {
      const err = new ExpressError('Unauthorized', 401)
      return next(err)
   } else{
      return next();
   }
}



// BELOW IS FOR VALIDATING JSON WITHIN REQUESTS
// const validate = jsonschema.validate(req.body, petSchema)
//       if (!validate.valid) {
//          const errorList = validate.errors.map(e => e.stack);
//          const err = new ExpressError(errorList, 400);
//          return next(err)
      // }
module.exports = { authenticateJWT, ensureLoggedIn }