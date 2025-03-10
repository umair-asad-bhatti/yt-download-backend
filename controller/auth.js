const AuthValidation = require('../validations/auth');
const fs = require('fs');
const br = require('bcrypt');
const User = require('../models/user');
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  decodeToken,
} = require('./../utils/index');
const AUTH_CONTROLLER = {
  signup: async (req, res) => {
    const { valid, errors } = AuthValidation.validSignUpData(req.body);

    if (!valid) {
      return res.status(400).json({ errors });
    }
    const { email, password } = req.body;
    //encrypt the user password
    const hashedPassword = await br.hash(password, 10);
    //store the data in a file
    try {
      const newUser = User.build({ email, password: hashedPassword });
      await newUser.save();
      return res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(400).json({ error: error.errors[0].message });
    }
  },
  login: async (req, res) => {
    const { valid, errors } = AuthValidation.validLoginData(req.body);
    if (!valid) {
      return res.status(400).json({ errors });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    const isValidPassword = br.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }
    //create a access token and refresh token for the user
    const accessToken = generateAccessToken(user.dataValues);
    const refreshToken = generateRefreshToken(user.dataValues);
    return res.status(200).json({ access: accessToken, refresh: refreshToken });
  },
  refreshToken: (req, res) => {
    const { refresh } = req.body;
    const { error } = verifyRefreshToken(refresh);
    if (error) {
      return res.status(400).json({ error });
    }
    const user = decodeToken(refresh);
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    return res.status(200).json({ access: accessToken, refresh: refreshToken });
  },
};
module.exports = AUTH_CONTROLLER;
