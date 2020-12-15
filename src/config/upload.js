import multer from "multer";
import path from "path";
import crypto from "crypto";

const tmpPath = path.resolve(__dirname, "..", "..", "tmp");

export default {
    dir: tmpPath,
    storage: multer.diskStorage({
        destination: tmpPath,

        filename(req, file, cb) {
            const fileHash = crypto.randomBytes(10).toString("HEX");
            const filename = `${fileHash}-${file.originalname}`;

            cb(null, filename);
        }
    })
}
