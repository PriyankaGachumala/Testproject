const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');

const user = require('../models/User');

//a public route which is a post request for registering a user
router.post(
  '/',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password should contain minimun 6 characters').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // res.send('succesful');
    const { email, password, image } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ msg: 'email already exists' });
      }

      user = new User({ email, password, image });

      //hashing the password for security purposes
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      //sending userid
      const payload = {
        user: {
          id: user.id,
        },
      };

      //generate token
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
