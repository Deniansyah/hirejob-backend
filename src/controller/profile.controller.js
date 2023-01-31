const { errorHandler } = require("../helper/errorHandler.helper");
const {
  selectProfile,
  selectExperienceProfile,
  selectPortofolioProfile,
  updateSkills,
  selectSkillsByToken,
} = require("../models/profile.model");
const { selectSkill } = require("../models/skills.model");

const fs = require("fs");
const fm = require("fs-extra");

const {
  selectUser,
  patchUserByToken,
  patchUser,
} = require("../models/users.model");

exports.readProfile = (req, res) => {
  selectProfile(req.params.id, (err, data) => {
    if (data.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Profile by id not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Get profile user by id",
      results: data.rows[0],
    });
  });
};

exports.readProfileByToken = (req, res) => {
  selectUser(req.userData.id, (err, data) => {
    if (data.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Profile by token not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Get profile user by token",
      results: data.rows[0],
    });
  });
};

exports.readExperience = (req, res) => {
  selectExperienceProfile(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    }

    if (data.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Experience not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "List of experience",
      results: data.rows,
    });
  });
};

exports.readPortofolio = (req, res) => {
  selectPortofolioProfile(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    }

    if (data.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Portofolio not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "List of portofolio",
      results: data.rows,
    });
  });
};

exports.updateEmploye = (req, res) => {
  patchUserByToken(req.userData.id, req.body, (err, result) => {
    if (err) {
      console.log(err);
    }

    return res.status(200).json({
      success: true,
      message: `User updated`,
      results: result.rows[0],
    });
  });
};

exports.updateSkills = (req, res) => {
  updateSkills(req.userData.id, req.body, (err, result) => {
    if (err) {
      console.log(err);
    }

    return res.status(200).json({
      success: true,
      message: `Skill updated`,
    });
  });
};

exports.readSkillsByToken = (req, res) => {
  selectSkillsByToken(req.userData.id, (err, result) => {
    if (err) {
      console.log(err);
    }

    return res.status(200).json({
      success: true,
      message: `Get skill by users login`,
      results: result.rows,
    });
  });
};

exports.updateProfilePicture = (req, res) => {
  if (req.file) {
    req.body.picture = req.file.path;
  }

  patchUser(req.userData.id, req.body, (error, results) => {
    if (error) {
      return errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      message: "Profile updated",
      results: results.rows[0],
    });
  });
};
