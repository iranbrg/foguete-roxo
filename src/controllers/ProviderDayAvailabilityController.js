import container from "../container";

export default class ProviderDayAvailabilityController {
  async index(req, res) {
    const { providerId } = req.params;
    const { day, month, year } = req.body;

    const listProviderDayAvailabilityService = container.resolve(
      "listProviderDayAvailabilityService"
    );

    const availability = await listProviderDayAvailabilityService.execute({
      providerId,
      day,
      month,
      year
    });

    res.json(availability);
  }
}
