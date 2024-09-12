import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const multerMiddleware = (req: any, res: any) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return err;
    }
    return null;
  });
};
