import AppError from "../errors/AppError";

export default class UploadAvatarService {
  constructor({ usersRepository, storageProvider }) {
    this.usersRepository = usersRepository;
    this.storageProvider = storageProvider;
  }

  async execute({ id, avatarFileName }) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError("User doesn't exist", 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFileName);

    user.avatar = fileName;
    await this.usersRepository.save(user);

    return user;
  }
}
