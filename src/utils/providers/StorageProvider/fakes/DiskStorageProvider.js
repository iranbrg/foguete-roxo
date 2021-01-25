const storage = [];

export default class DiskStorageProvider {
  async saveFile(file) {
    storage.push(file);
    return file;
  }

  async deleteFile(file) {
    const idx = storage.findIndex(fileInStorage => fileInStorage === file);

    storage.splice(idx, 1);
  }
}

// Nasty JS doesn't support class variables, therefore I had to do this crap
DiskStorageProvider.prototype.storage = storage;
