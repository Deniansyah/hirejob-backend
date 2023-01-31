const {
  selectAllUserSkills,
  selectUserSkill,
  insertUserSkill,
  patchUserSkill,
  deleteUserSkill,
} = require("../models/userSkills.model");

exports.readAllUserSkills = (req, res) => {
  selectAllUserSkills((err, result) => {
    if (err) {
      console.log(err);
    }

    return res.status(200).json({
      success: true,
      message: "List of user skills",
      results: result.rows,
    });
  });
};

exports.readUserSkill = (req, res) => {
  selectUserSkill(req.params.id, (err, result) => {
    if (err) {
      console.log(err);
    }

    if (result.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "User skill not found",
      });
    }

    return res.status(200).json({
      success: true,
      results: result.rows[0],
    });
  });
};

exports.createUserSkill = (req, res) => {
  insertUserSkill(req.body, (err, result) => {
    if (err) {
      console.log(err);
    }

    return res.status(200).json({
      success: true,
      message: "User skill created successfully",
      results: result.rows[0],
    });
  });
};

exports.updateUserSkill = (req, res) => {
  patchUserSkill(req.params.id, req.body, (err, result) => {
    if (err) {
      console.log(err);
    }

    if (result.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "User skill doesn't exist",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User skill Updated",
      results: result.rows[0],
    });
  });
};

exports.deleteUserSkill = (req, res) => {
  deleteUserSkill(req.userData.id, req.params.skillId, (err, result) => {
    if (err) {
      console.log(err);
    }

    if (result.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "User skill doesn't exist",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User skill Deleted",
      results: result.rows[0],
    });
  });
};
