const { selectUserByEmail, insertRegisterEmploye, insertRegisterRecruter, patchUser } = require("../models/users.model");
const jwt = require("jsonwebtoken");
const argon = require("argon2");
const { errorHandler } = require("../helper/errorHandler.helper");
const { validationResult } = require("express-validator");
const { insertResetPassword, selectResetPasswordByEmailAndCode, deletedResetPassword } = require("../models/resetPassword.model");
const transporter = require("../helper/nodemailer.helper");

exports.login = (req, res) => {
  selectUserByEmail(req.body.email, async (err, { rows }) => {
    if (rows.length) {
      const [user] = rows;
      if (await argon.verify(user.password, req.body.password)) {
        const token = jwt.sign({ id: user.id }, "backend-secret");
        return res.status(200).json({
          success: true,
          message: "login success",
          results: {
            token,
            role: user.role,
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

exports.registerEmploye = async (req, res) => {
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

  if (req.body.password === req.body.confirmPassword) {
    req.body.password = await argon.hash(req.body.password);
    insertRegisterEmploye(req.body, (error, data) => {
      if (error) {
        return errorHandler(error, res);
      } else {
        const [user] = data.rows;
        const token = jwt.sign({ id: user.id }, "backend-secret");

        return res.status(200).json({
          success: true,
          message: "Register Success",
          results: {
            token,
            role: user.role,
          },
        });
      }
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Password not match",
    });
  }
};

exports.registerRecruter = async (req, res) => {
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

  if (req.body.password === req.body.confirmPassword) {
    req.body.password = await argon.hash(req.body.password);
    insertRegisterRecruter(req.body, (error, data) => {
      if (error) {
        return errorHandler(error, res);
      } else {
        const [user] = data.userQuery.rows;
        const [company] = data.companyQuery.rows;
        const token = jwt.sign({ id: user.id, companyId: company.id }, "backend-secret");

        return res.status(200).json({
          success: true,
          message: "Register Success",
          results: { token, role: user.role },
        });
      }
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Password not match",
    });
  }
};

//request for reset password
exports.forgotPassword = (req, res) => {
  const { email } = req.body;
  selectUserByEmail(email, (err, { rows: user }) => {
    if (err) {
      return errorHandler(err, res);
    }
    if (user.length) {
      const [users] = user;
      const code = Math.ceil(Math.random() * 90000 + 10000);
      const data = {
        email,
        userId: users.id,
        code,
      };
      insertResetPassword(data, (err, { rows: results }) => {
        const sendCode = {
          from: "peworld1222@gmail.com",
          to: email,
          subject: "Code Reset Password",
          html: `<p>Your reset password code ${code}</p>`,
        };

        transporter.sendMail(sendCode, (err) => {
          if (err) {
            return errorHandler(err, res);
          }
          
          return res.status(200).json({
            success: true,
            message: "Reset Password has been requested",
          });
        });
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "User Not Found!",
      });
    }
  });
};

// execution or validation reset password
exports.resetPassword = (req, res) => {
  const { password, confirmPassword } = req.body;
  if (password === confirmPassword) {
    selectResetPasswordByEmailAndCode(req.body, async (err, { rows: user }) => {
      if (err) {
        return errorHandler(err, res);
      }
      try {
        if (user.length) {
          const [resetRequest] = user;
          if (new Date(resetRequest.createdAt).getTime() + 15 * 60 * 1000 < new Date().getTime()) {
            throw Error("backend error: code_expired");
          }

          const data = {
            password: await argon.hash(password),
          };

          patchUser(resetRequest.userId, data, (err, { rows: user }) => {
            if (err) {
              return errorHandler(err, res);
            }
            if (user.length) {
              deletedResetPassword(resetRequest.id, (err, { rows }) => {
                if (rows.length) {
                  return res.status(200).json({
                    success: true,
                    message: "Password succes updated, please relogin",
                  });
                }
              });
            }
          });
        } else {
          throw Error("backend error: notfound_code_request");
        }
      } catch (err) {
        return errorHandler(err, res);
      }
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "password and confirm password not match",
    });
  }
};
