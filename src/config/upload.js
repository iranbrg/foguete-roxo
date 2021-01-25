import multer from "multer";
import path from "path";
import crypto from "crypto";

const tmpPath = path.resolve(__dirname, "..", "..", "tmp");

export default {
  tmpDir: tmpPath,
  uploadDir: path.resolve(tmpPath, "upload"),
  storage: multer.diskStorage({
    destination: tmpPath,

    filename(file, cb) {
      const fileHash = crypto.randomBytes(10).toString("HEX");
      const filename = `${fileHash}-${file.originalname}`;

      cb(null, filename);
    }
  })
};
