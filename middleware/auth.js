const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //we can access the token which is set in the header with x-auth-token
  const token = req.header('x-auth-token');

  if (!token) {
    return res
      .status(401)
      .json({ msg: 'There is no token, Authorization was unsuccesful' });
  }
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    //taking out the id(payload) from jwt token
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
