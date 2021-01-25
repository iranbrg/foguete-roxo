import path from "path";
import { promises as fs } from "fs";
import uploadConfig from "../../../config/upload";

export default class DiskStorageProvider {
  async saveFile(file) {
    await fs.rename(
      path.resolve(uploadConfig.tmpDir, file),
      path.resolve(uploadConfig.uploadDir, file)
    );

    return file;
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.uploadDir, file);

    try {
      await fs.stat(filePath);
    } catch (err) {
      return;
    }

    await fs.unlink(filePath);
  }
}
