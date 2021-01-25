import { hash, compare } from "bcryptjs";

export default class HashProvider {
  async generateHash(payload) {
    const hashedPayload = await hash(payload, 8);
    return hashedPayload;
  }

  async compareHash(payload, hashedPayload) {
    const isPayloadMatching = await compare(payload, hashedPayload);
    return isPayloadMatching;
  }
}
