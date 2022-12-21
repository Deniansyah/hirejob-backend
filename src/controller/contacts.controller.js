const {
  selectAllContact,
  selectContact,
  insertContact,
  patchContact,
  deleteContact,
} = require("../models/contacts.model");

exports.readAllContact = (req, res) => {
  selectAllContact((err, data) => {
    if (err) {
      console.log(err);
    }

    return res.status(200).json({
      success: true,
      message: "List of contacts",
      results: data.rows,
    });
  });
};

exports.readContact = (req, res) => {
  selectContact(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    }

    if (data.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Contact not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "List of contact",
      results: data.rows[0],
    });
  });
};

exports.createContact = (req, res) => {
  req.boyd.userId = req.userData.id
  insertContact(req.body, (err, data) => {
    if (err) {
      console.log(err);
    }
    return res.status(200).json({
      success: true,
      message: "Contact created successfully",
      results: data.rows[0],
    });
  });
};

exports.updateContact = (req, res) => {
  patchContact(req.params.id, req.body, (err, data) => {
    if (err) {
      console.log(err);
    }

    if (data.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Contact doesn't exist",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact Updated",
      results: data.rows,
    });
  });
};

exports.deleteContact = (req, res) => {
  deleteContact(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    }

    if (data.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Contact doesn't exist",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact Deleted",
      results: data.rows,
    });
  });
};
