import ListProviderDayAvailabilityService from "../../src/services/ListProviderDayAvailabilityService";
import AppointmentsRepository from "../../src/repositories/fakes/AppointmentsRepository";

let appointmentsRepository;
let listProviderDayAvailabilityService;

describe("ListProviderDayAvailability", () => {
  beforeEach(() => {
    appointmentsRepository = new AppointmentsRepository();

    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
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

  test("Should list day availability from a provider", async () => {
    const providerId = Math.round(Math.random() * 100000000).toString();

    const day = 22;
    const month = 1;
    const year = 2021;

    jest.spyOn(Date, "now").mockImplementation(() => {
      const currentTime = new Date(year, month - 1, day, 11);
      return Date.parse(currentTime);
    });

    const hours = Array.from({ length: 2 }, (_, i) => i + 8);

    hours.map(async hour => {
      return appointmentsRepository.create({
        providerId,
        date: new Date(year, month - 1, day, hour, 0, 0),
        userId: Math.round(Math.random() * 100000000).toString()
      });
    });

    const availability = await listProviderDayAvailabilityService.execute({
      providerId,
      day,
      month,
      year
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 11, available: false },
        { hour: 12, available: true },
        { hour: 17, available: true }
      ])
    );
  });
});
