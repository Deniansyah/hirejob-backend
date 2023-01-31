const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, require("path").join(process.cwd(), "uploads"));
//   },
//   filename: (req, file, callback) => {
//     const getExtension = file.originalname.split(".");
//     const extension = getExtension[getExtension.length - 1];
//     const name = `${new Date().getDate()}_${new Date().getTime()}.${extension}`;
//     callback(null, name);
//   },
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 1000000 },
//   fileFilter: (req, file, callback) => {
//     const format = ["jpg", "png", "jpeg"];
//     const extension = file.originalname.split(".");
//     const cekFormatFile = format.includes(extension[extension.length - 1]);
//     if (!cekFormatFile) {
//       return callback(new Error("Format picture not valid"));
//     } else {
//       return callback(null, true);
//     }
//   },
// });
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "hirejob-team1",
    format: async (req, file) => path.extname(file.originalname).slice(1),
    public_id: (req, file) => {
      const randomNumber = Math.round(Math.random() * 90000);
      const filename = `${randomNumber}${Date.now()}`;
      return filename;
    },
  },
});

const uploadImage = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, callback) => {
    const format = ["jpg", "png", "jpeg"];
    const extension = path.extname(file.originalname).slice(1);
    const cekFormatFile = format.includes(extension);
    if (!cekFormatFile) {
      return callback(new Error("Format picture not valid"));
    } else {
      return callback(null, true);
    }
  },
}).single("picture");

module.exports = (req, res, next) => {
  uploadImage(req, res, (error) => {
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    next();
  });
};
