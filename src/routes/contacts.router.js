const {
  readAllContact,
  readContact,
  createContact,
  updateContact,
  deleteContact,
} = require("../controller/contacts.controller");

const authMiddleware = require('../middleware/auth.middleware')

const contactsRouter = require("express").Router();

contactsRouter.get("/", readAllContact);
contactsRouter.get("/:id", readContact);
contactsRouter.post("/", authMiddleware, createContact);
contactsRouter.patch("/:id", updateContact);
contactsRouter.delete("/:id", deleteContact);

module.exports = contactsRouter;
