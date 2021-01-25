import UsersRepository from "../../src/repositories/fakes/UsersRepository";
import UpdateProfileService from "../../src/services/UpdateProfileService";
import HashProvider from "../../src/utils/providers/HashProvider/fakes/HashProvider";
import AppError from "../../src/errors/AppError";

let usersRepository;
let updateProfileService;
let hashProvider;

describe("UpdateProfile", () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    hashProvider = new HashProvider();

    updateProfileService = new UpdateProfileService({
      usersRepository,
      hashProvider
    });
  });

  afterEach(() => {
    // Required to clean all users in the array that simulates the database
    usersRepository.users.splice(0, usersRepository.users.length);
  });

  test("Should update user's profile", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "jdoe@email.com",
      password: "bigboobs69"
    });

    const newName = "Jane Doe";
    const newEmail = "janedoe@email.com";
    const oldPassword = user.password;
    const newPassword = "bigboobs420";

    const updatedUser = await updateProfileService.execute({
      id: user.id,
      newName,
      newEmail,
      oldPassword,
      newPassword
    });

    expect(updatedUser.name).toBe(newName);
    expect(updatedUser.email).toBe(newEmail);
  });

  test("Shouldn't update user's email to an already existing email", async () => {
    expect.assertions(2);

    const user1 = await usersRepository.create({
      name: "John Doe",
      email: "jdoe@email.com",
      password: "bigboobs69"
    });

    const user2 = await usersRepository.create({
      name: "Jane Doe",
      email: "janedoe@email.com",
      password: "bigboobs420"
    });

    try {
      await updateProfileService.execute({
        id: user2.id,
        newEmail: user1.email
      });
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
      expect(err.message).toBe("Email already in use");
    }
  });

  test("Shouldn't update profile of a non-existing user", async () => {
    expect.assertions(2);

    const oldPassword = Math.round(Math.random() * 100000).toString();
    const newName = "Jane Doe";
    const newEmail = "janedoe@email.com";
    const newPassword = "bigboobs420";

    try {
      await updateProfileService.execute({
        id: Math.round(Math.random() * 100000).toString(),
        oldPassword,
        newName,
        newEmail,
        newPassword
      });
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
      expect(err.message).toBe("User not found");
    }
  });

  test("Shouldn't update user's profile if the old password wasn't provided", async () => {
    expect.assertions(2);

    const user = await usersRepository.create({
      name: "John Doe",
      email: "jdoe@email.com",
      password: "bigboobs69"
    });

    const newName = "Jane Doe";
    const newEmail = "janedoe@email.com";
    const newPassword = "bigboobs420";

    try {
      await updateProfileService.execute({
        id: user.id,
        newName,
        newEmail,
        newPassword
      });
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
      expect(err.message).toBe(
        "You need to provide the old password to set a new one"
      );
    }
  });

  test("Shouldn't update user's profile if the old password was wrongly provided", async () => {
    expect.assertions(2);

    const user = await usersRepository.create({
      name: "John Doe",
      email: "jdoe@email.com",
      password: "bigboobs69"
    });

    const newName = "Jane Doe";
    const newEmail = "janedoe@email.com";
    const newPassword = "bigboobs420";
    const oldPassword = "foo";

    try {
      await updateProfileService.execute({
        id: user.id,
        newName,
        newEmail,
        newPassword,
        oldPassword
      });
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
      expect(err.message).toBe("Old password doesn't match");
    }
  });
});
