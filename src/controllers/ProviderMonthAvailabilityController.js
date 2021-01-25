import container from "../container";

export default class ProviderMonthAvailabilityController {
  async index(req, res) {
    const { providerId } = req.params;
    const { month, year } = req.body;

    const listProviderMonthAvailabilityService = container.resolve(
      "listProviderMonthAvailabilityService"
    );

    const availability = await listProviderMonthAvailabilityService.execute({
      providerId,
      month,
      year
    });

    res.json(availability);
  }
}
