const portofolioRouter = require("express").Router();

const {
  readAllPortofolio,
  readPortofolioById,
  createPortofolio,
  UpdatePortofolio,
  deletePortofolio,
} = require("../controller/portofolio.controller");
const authMiddleware = require("../middleware/auth.middleware");
const uploadMiddleware = require("../middleware/upload.middleware");

portofolioRouter.get("/", readAllPortofolio);
portofolioRouter.get("/:id", readPortofolioById);
portofolioRouter.post("/", authMiddleware, uploadMiddleware, createPortofolio);
portofolioRouter.patch("/:id", UpdatePortofolio);
portofolioRouter.delete("/:id", deletePortofolio);

module.exports = portofolioRouter;
