export default class ListProvidersService {
  constructor({ usersRepository }) {
    this.userRepository = usersRepository;
  }

  async execute({ userId }) {
    const users = await this.userRepository.getAllProviders({
      exceptUserId: userId
    });

    return users;
  }
}
