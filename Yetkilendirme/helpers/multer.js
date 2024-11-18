const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Dosyanın yükleneceği klasör
    },
    filename: function (req, file, cb) {
        const extname = path.extname(file.originalname); // Dosya uzantısını al
        const basename = path.basename(file.originalname, extname); 
        cb(null, `${basename}${extname}`);
    }
  });

  const upload = multer({ storage: storage });

    module.exports = upload;