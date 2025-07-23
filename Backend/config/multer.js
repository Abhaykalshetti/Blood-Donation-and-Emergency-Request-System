// Multer config
import multer from "multer";
import path from 'path'
const storage = multer.diskStorage({
  destination: function (req, file, cb) { 
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
      cb(null, 'uploads/images/');
    } else if (ext === '.pdf') {
      cb(null, 'uploads/documents/');
    } else {
      cb(new Error('Unsupported file type'), null);
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  }
});
export default  multer({ storage });