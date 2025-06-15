const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folder = file.fieldname === 'tradeLicense' ? 'uploads/licenses' : 'uploads/logos';
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const fileFilter = function (req, file, cb) {
  const allowedTypes = {
    tradeLicense: ['.pdf'],
    brandLogo: ['.jpg', '.jpeg', '.png'],
  };

  const ext = path.extname(file.originalname).toLowerCase();
  const field = file.fieldname;

  if (allowedTypes[field] && allowedTypes[field].includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
