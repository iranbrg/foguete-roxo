import CreateAppointmentService from "../../src/services/CreateAppointmentService";
import AppointmentsRepository from "../../src/repositories/fakes/AppointmentsRepository";
import AppError from "../../src/errors/AppError";

let appointmentsRepository;
let createAppointmentService;

describe("CreateAppointment", () => {
  beforeEach(() => {
    appointmentsRepository = new AppointmentsRepository();
    createAppointmentService = new CreateAppointmentService({
      appointmentsRepository
    });
  });

  afterEach(() => {
    // Required to clean all users in the array that simulates the database
    appointmentsRepository.appointments.splice(
      0,
      appointmentsRepository.appointments.length
    );
  });

  test("Should create a new appointment", async () => {
    const day = 22;
    const month = 1;
    const year = 2021;

    jest.spyOn(Date, "now").mockImplementation(() => {
      const currentTime = new Date(year, month - 1, day, 15);
      return Date.parse(currentTime);
    });

    const appointment = await createAppointmentService.execute({
      providerId: Math.round(Math.random() * 1000000).toString(),
      date: new Date(year, month - 1, day, 16),
      userId: Math.round(Math.random() * 1000000).toString()
    });

    expect(appointment).toHaveProperty("providerId");
    expect(appointment).toHaveProperty("date");
  });

  test("Shouldn't create a new appointment on the same time", async () => {
    expect.assertions(1);

    const appointmentDate = new Date(2021, 0, 9, 18);

    try {
      await createAppointmentService.execute({
        providerId: `${Math.round(Math.random() * 1000000)}`,
        date: appointmentDate,
        userId: Math.round(Math.random() * 1000000).toString()
      });

      await createAppointmentService.execute({
        providerId: `${Math.round(Math.random() * 1000000)}`,
        date: appointmentDate,
        userId: Math.round(Math.random() * 1000000).toString()
      });
    } catch (err) {
      // expect(err.message).toMatch("This appointment is already booked");
      expect(err).toBeInstanceOf(AppError);
    }
  });

  test("Shouldn't create a new appointment in a date in the past", async () => {
    expect.assertions(2);

    const day = 22;
    const month = 1;
    const year = 2021;

    jest.spyOn(Date, "now").mockImplementation(() => {
      const currentTime = new Date(year, month - 1, day, 15);
      return Date.parse(currentTime);
    });

    try {
      await createAppointmentService.execute({
        providerId: Math.round(Math.random() * 1000000).toString(),
        date: new Date(year, month - 1, day, 11),
        userId: Math.round(Math.random() * 1000000).toString()
      });
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
      expect(err.message).toMatch(
        "An appointment can't be created on a past date"
      );
    }
  });

  test("Shouldn't create a new appointment with the same user as provider", async () => {
    expect.assertions(2);

    const day = 22;
    const month = 1;
    const year = 2021;

    jest.spyOn(Date, "now").mockImplementation(() => {
      const currentTime = new Date(year, month - 1, day, 12);
      return Date.parse(currentTime);
    });

    const userAndProviderId = Math.round(Math.random() * 1000000).toString();

    try {
      await createAppointmentService.execute({
        providerId: userAndProviderId,
        date: new Date(year, month - 1, day, 15),
        userId: userAndProviderId
      });
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
      expect(err.message).toMatch(
        "You can't create an appointment with yourself"
      );
    }
  });

  test("Shouldn't create a new appointment in a date before 8 AM", async () => {
    expect.assertions(2);

    const day = 22;
    const month = 1;
    const year = 2021;

    jest.spyOn(Date, "now").mockImplementation(() => {
      const currentTime = new Date(year, month - 1, day, 15);
      return Date.parse(currentTime);
    });

    try {
      await createAppointmentService.execute({
        providerId: Math.round(Math.random() * 1000000).toString(),
        date: new Date(year, month - 1, day, 7),
        userId: Math.round(Math.random() * 1000000).toString()
      });
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
      expect(err.message).toMatch(
        "An appointment can only be created between 8AM and 18PM"
      );
    }
  });

  test("Shouldn't create a new appointment in a date after 5 PM", async () => {
    expect.assertions(2);

    const day = 22;
    const month = 1;
    const year = 2021;

    jest.spyOn(Date, "now").mockImplementation(() => {
      const currentTime = new Date(year, month - 1, day, 15);
      return Date.parse(currentTime);
    });

    try {
      await createAppointmentService.execute({
        providerId: Math.round(Math.random() * 1000000).toString(),
        date: new Date(year, month - 1, day, 19),
        userId: Math.round(Math.random() * 1000000).toString()
      });
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
      expect(err.message).toMatch(
        "An appointment can only be created between 8AM and 18PM"
      );
    }
  });
});
