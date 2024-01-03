import multer from 'multer'
import path from "path"
const userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Public/Media");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + Date.now() + "-" + file.originalname);
  },
});

export const uploadImage = multer({ storage: userStorage });

