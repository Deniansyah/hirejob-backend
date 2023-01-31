const userRouter = require("express").Router();
const {
  readAllUsers,
  readUser,
  readUsersBySkill,
  readCompanyByUserId,
  updateUser,
  createUser,
  deleteUser,
} = require("../controller/users.controller");

userRouter.get("/", readAllUsers);
userRouter.get("/skill", readUsersBySkill);
userRouter.get("/company/:id", readCompanyByUserId);
userRouter.get("/:id", readUser);
userRouter.post("/", createUser);
userRouter.patch("/:id", updateUser);
userRouter.delete("/", deleteUser);

module.exports = userRouter;
