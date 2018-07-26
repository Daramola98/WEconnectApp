import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

/**
   * Checks the size of the file before proceeding
   * @param {object} req - The request object
   * @param {object} file - The response object
   * @param {function} cb - The callback to move to the next middleware
   * @return {null} execute callback
   * @memberof Authentication
   */
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Bad file format'), false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 3
  },
  fileFilter
});

const uploads = upload.single('businessImage');
export default uploads;
