import AppError from "../errors/AppError";

export default class UpdateProfileService {
  constructor({ usersRepository, hashProvider }) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
  }

  async execute({ id, newName, newEmail, oldPassword, newPassword }) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", 401);
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(
      newEmail
    );

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Email already in use");
    }

    user.name = newName;
    user.email = newEmail;

    if (newPassword && !oldPassword) {
      throw new AppError(
        "You need to provide the old password to set a new one"
      );
    }

    if (newPassword && oldPassword) {
      const checkOldPassword = await this.hashProvider.compareHash(
        oldPassword,
        user.password
      );

      if (newPassword && !checkOldPassword) {
        throw new AppError("Old password doesn't match");
      }

      user.password = await this.hashProvider.generateHash(newPassword);
    }

    await this.usersRepository.save(user);

    return user;
  }
}
