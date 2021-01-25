const users = [];

export default class UsersRepository {
  async create({ name, email, password }) {
    const user = {
      id: Math.round(Math.random() * 1000000).toString(),
      name,
      email,
      password
    };

    users.push(user);

    return user;
  }

  async save(user) {
    const idx = users.findIndex(findUser => findUser.id === user.id);

    users[idx] = user;
  }

  async findByEmail(email) {
    const userFoundByEmail = users.find(user => user.email === email);
    return userFoundByEmail;
  }

  async findById(id) {
    const userFoundById = users.find(user => user.id === id);
    return userFoundById;
  }

  async getAllProviders({ exceptUserId }) {
    let providers = [...users];

    if (exceptUserId) {
      providers = users.filter(user => user.id !== exceptUserId);
    }

    return providers;
  }

  async getUsers() {
    return users;
  }
}

// Nasty JS doesn't support class variables, therefore I had to do this crap
UsersRepository.prototype.users = users;
