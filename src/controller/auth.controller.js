const {
  selectUserByEmail,
  insertRegisterEmploye,
  insertRegisterRecruter,
} = require("../models/users.model");
const jwt = require("jsonwebtoken");
const { errorHandler } = require("../helper/errorHandler.helper");
const { validationResult } = require("express-validator");

exports.login = (req, res) => {
  selectUserByEmail(req.body.email, (err, { rows }) => {
    if (rows.length) {
      const [user] = rows;
      if (req.body.password === user.password) {
        const token = jwt.sign({ id: user.id }, "backend-secret");
        return res.status(200).json({
          success: true,
          message: "login success",
          results: {
            token,
          },
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Wrong email or password",
        });
      }
    } else {
      return res.status(401).json({
        success: false,
        message: "Wrong email or password",
      });
    }
  });
};

exports.registerEmploye = (req, res) => {
  const errorValidation = validationResult(req);
  if (!errorValidation.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errorValidation
        .array()
        .map((e) => e.msg)
        .toString()
        .split(", "),
    });
  }

  insertRegisterEmploye(req.body, (error, data) => {
    if (error) {
      return errorHandler(error, res);
    } else {
      const [user] = data.rows;
      const token = jwt.sign({ id: user.id }, "backend-secret");

      return res.status(200).json({
        success: true,
        message: "Register Success",
        results: token,
      });
    }
  });
};

exports.registerRecruter = (req, res) => {
  const errorValidation = validationResult(req);
  if (!errorValidation.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errorValidation
        .array()
        .map((e) => e.msg)
        .toString()
        .split(", "),
    });
  }

  insertRegisterRecruter(req.body, (error, data) => {
    if (error) {
      return errorHandler(error, res);
    } else {
      const [user] = data.userQuery.rows;
      const token = jwt.sign({ id: user.id }, "backend-secret");

      return res.status(200).json({
        success: true,
        message: "Register Success",
        results: token,
      });
    }
  });
};
