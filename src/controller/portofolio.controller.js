const {
  selectAllPortofolio,
  selectPortofolioeById,
  insertPortofolio,
  updatePortofolio,
  deletedPortofolio,
} = require("../models/portofolio.model");

exports.readAllPortofolio = (req, res) => {
  selectAllPortofolio((err, data) => {
    if (err) {
      console.log(err);
      //   return errorHandler(err, res);
    }
    return res.status(200).json({
      succes: true,
      message: "List of Portofolio",
      results: data.rows,
    });
  });
};

exports.readPortofolioById = (req, res) => {
  selectPortofolioeById(req.params, (err, data) => {
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
      succes: true,
      message: "List of Portofolio By Id",
      results: data.rows[0],
    });
  });
};

exports.createPortofolio = (req, res) => {
  if (req.file) {
    req.body.picture = req.file.path;
  }

  insertPortofolio(req.body, (err, data) => {
    if (err) {
      console.log(err);
    }
    return res.status(200).json({
      succes: true,
      message: "Create Portofolio succes",
      results: data.rows[0],
    });
  });
};

exports.UpdatePortofolio = (req, res) => {
  updatePortofolio(req.params.id, req.body, (err, data) => {
    if (err) {
      console.log(err);
    }

    if (data.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Portofolio doesn't exist",
      });
    }

    return res.status(200).json({
      succes: true,
      message: "Update Portofolio succes",
      results: data.rows,
    });
  });
};

exports.deletePortofolio = (req, res) => {
  deletedPortofolio(req.params, (err, data) => {
    if (err) {
      console.log(err);
    }

    if (data.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Portofolio doesn't exist",
      });
    }

    return res.status(200).json({
      succes: true,
      message: "Delete Portofolio succes",
      results: data.rows,
    });
  });
};
