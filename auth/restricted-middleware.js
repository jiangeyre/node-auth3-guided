const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config/secrets');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if(token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if(err) {
        // token is not valid
        res.status(401).json({ error: 'You cannot touch this.' })
      } else {
        req.user = decodedToken.user;

        // req.user = { house: decodedToken.house };

        next();
      }
    })
  } else {
    res.status(401).json({ message: 'you shall not pass!' });
  }
};
