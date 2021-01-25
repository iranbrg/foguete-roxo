import UploadAvatarService from "../../src/services/UploadAvatarService";
import DiskStorageProvider from "../../src/utils/providers/StorageProvider/fakes/DiskStorageProvider";
import UsersRepository from "../../src/repositories/fakes/UsersRepository";
import AppError from "../../src/errors/AppError";

let usersRepository;
let storageProvider;
let uploadAvatarService;

describe("UploadAvatar", () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    storageProvider = new DiskStorageProvider();

    uploadAvatarService = new UploadAvatarService({
      usersRepository,
      storageProvider
    });
  });

  afterEach(() => {
    // Required to clean all users in the array that simulates the database
    usersRepository.users.splice(0, usersRepository.users.length);
  });

  test("Should update user's avatar", async () => {
    const newUser = await usersRepository.create({
      name: "John Doe",
      email: "jdoe@email.com",
      password: "bigboobs69"
    });

    const avatarFileName = `${Math.round(
      Math.random() * 1000000
    )}-avatarFileName.jpg`;

    const userWithNewAvatar = await uploadAvatarService.execute({
      id: newUser.id,
      avatarFileName
    });

    expect(userWithNewAvatar).toHaveProperty("avatar", avatarFileName);
  });

  test("Shouldn't update the avatar of a non existing user", async () => {
    expect.assertions(1);

    const avatarFileName = `${Math.round(
      Math.random() * 1000000
    )}-avatarFileName.jpg`;

    try {
      await uploadAvatarService.execute({
        id: `${Math.round(Math.random() * 1000000)}-avatarFileName.jpg`,
        avatarFileName
      });
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
    }
  });

  test("Should delete old avatar of a user that already have one before adding a new avatar", async () => {
    const deleteFile = jest.spyOn(storageProvider, "deleteFile");

    const newUser = await usersRepository.create({
      name: "Jane Doe",
      email: "janedoe@email.com",
      password: "bigboobs69"
    });

    const avatarFileName1 = `${Math.round(
      Math.random() * 1000000
    )}-avatarFileName1.jpg`;

    const avatarFileName2 = `${Math.round(
      Math.random() * 1000000
    )}-avatarFileName2.jpg`;

    await uploadAvatarService.execute({
      id: newUser.id,
      avatarFileName: avatarFileName1
    });

    await uploadAvatarService.execute({
      id: newUser.id,
      avatarFileName: avatarFileName2
    });

    expect(deleteFile).toHaveBeenCalledWith(avatarFileName1);
    expect(newUser.avatar).toBe(avatarFileName2);
  });
});
