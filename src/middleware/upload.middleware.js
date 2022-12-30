const multer = require("multer");
  
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, require("path").join(process.cwd(), "assets/uploads"));
  },
  filename: (req, file, callback) => {
    const getExtension = file.originalname.split(".");
    const extension = getExtension[getExtension.length - 1];
    const name = `${new Date().getDate()}_${new Date().getTime()}.${extension}`;
    callback(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, callback) => {
    const format = ["jpg", "png", "jpeg"];
    const extension = file.originalname.split(".");
    const cekFormatFile = format.includes(extension[extension.length - 1]);
    if (!cekFormatFile) {
      return callback(new Error("Format picture not valid"));
    } else {
      return callback(null, true);
    }
  },
});

const uploadMiddleware = upload.single("picture");

module.exports = (req, res, next) => {
  uploadMiddleware(req, res, (error) => {
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    next();
  });
};