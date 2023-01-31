const userSkillRouter = require("express").Router();
const {
  readAllUserSkills,
  readUserSkill,
  updateUserSkill,
  createUserSkill,
  deleteUserSkill,
} = require("../controller/userSkills.controller");
const authMiddleware = require("../middleware/auth.middleware");

userSkillRouter.get("/", readAllUserSkills);
userSkillRouter.get("/:id", readUserSkill);
userSkillRouter.post("/", createUserSkill);
userSkillRouter.patch("/:id", updateUserSkill);
userSkillRouter.delete("/:skillId", authMiddleware, deleteUserSkill);

module.exports = userSkillRouter;
