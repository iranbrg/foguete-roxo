import { v4 as uuidv4 } from "uuid";

export default class Appointment {
    constructor(provider, date) {
        this.id = uuidv4();
        this.provider = provider;
        this.date = date;
    }
}
