export default class HashProvider {
  async generateHash(payload) {
    return payload;
  }

  async compareHash(payload, hashedPayload) {
    return payload === hashedPayload;
  }
}
