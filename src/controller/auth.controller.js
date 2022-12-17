const { selectUserByEmail } = require("../models/users.model");
const jwt = require("jsonwebtoken");

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
