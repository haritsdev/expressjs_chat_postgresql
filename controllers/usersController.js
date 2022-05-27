const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = {
  async getAll(req, res, next) {
    try {
      const data = await User.getAll();
      console.log(`Users ${data}`);
      return res.status(201).json(data);
    } catch (error) {
      console.log(`Error ${error}`);
      return res.status(501).json({
        success: false,
        message: `Error ${error}`,
      });
    }
  },

  async register(req, res, next) {
    try {
      const user = req.body;
      const data = await User.create(user);

      return res.status(201).json({
        success: true,
        message: `Registration user success`,
        data: data.id,
      });
    } catch (error) {
      console.log(`Error ${error}`);
      return res.status(501).json({
        success: false,
        message: `Registrasi user gagal`,
        error: error,
      });
    }
  },

  async login(req, res, next) {
    try {
      const email = req.body.email;
      const password = req.body.password;

      const myUser = await User.findByEmail(email);
      console.log(myUser);
      if (!myUser) {
        return res.status(401).json({
          success: false,
          message: 'Email anda belum terdaftar',
        });
      }

      const isPasswordValid = await bcrypt.compare(password, myUser.password);
      if (isPasswordValid) {
        const token = jwt.sign(
          {
            id: myUser.id,
            email: myUser.email,
          },
          keys.secretOrKey,
          {
            // expiresIn:
          }
        );

        const data = {
          id: myUser.id,
          name: myUser.name,
          lastname: myUser.lastname,
          email: myUser.email,
          phone: myUser.phone,
          image: myUser.image,
          session_token: `JWT ${token}`,
        };

        return res.status(201).json({
          success: true,
          message: 'User ter authentikasi',
          data: data,
        });
      } else {
        return res.status(401).json({
          success: false,
          message: `Password anda salah`,
          error: error,
        });
      }
    } catch (error) {
      console.log(`Error ${error}`);
      return res.status(501).json({
        success: false,
        message: `Login user gagal`,
        error: error,
      });
    }
  },
};
