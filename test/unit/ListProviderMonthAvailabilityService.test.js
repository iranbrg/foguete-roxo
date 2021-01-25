import ListProviderMonthAvailabilityService from "../../src/services/ListProviderMonthAvailabilityService";
import AppointmentsRepository from "../../src/repositories/fakes/AppointmentsRepository";

let appointmentsRepository;
let listProviderMonthAvailabilityService;

describe("ListProviderMonthAvailability", () => {
  beforeEach(() => {
    appointmentsRepository = new AppointmentsRepository();

    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
      { appointmentsRepository }
    );
  });

  afterEach(() => {
    // Required to clean all users in the array that simulates the database
    appointmentsRepository.appointments.splice(
      0,
      appointmentsRepository.appointments.length
    );
  });

  test("Should list month availability from a provider", async () => {
    const providerId = Math.round(Math.random() * 100000000).toString();

    const schedules = Array.from({ length: 10 }, (_, i) => i + 8);

    schedules.map(async schedule => {
      return appointmentsRepository.create({
        providerId,
        date: new Date(2021, 0, 21, schedule, 0, 0),
        userId: Math.round(Math.random() * 100000000).toString()
      });
    });

    const availability = await listProviderMonthAvailabilityService.execute({
      providerId,
      month: 1,
      year: 2021
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 20, available: true },
        { day: 21, available: false },
        { day: 22, available: true },
        { day: 23, available: true }
      ])
    );
  });
});
