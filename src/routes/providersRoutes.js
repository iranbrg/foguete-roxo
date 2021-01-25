import { Router } from "express";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import ProvidersController from "../controllers/ProvidersController";
import ProviderMonthAvailabilityController from "../controllers/ProviderMonthAvailabilityController";
import ProviderDayAvailabilityController from "../controllers/ProviderDayAvailabilityController";

const router = Router();

const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

router.use(ensureAuthenticated);

router.route("/").get(providersController.index);

router
  .route("/:providerId/month-availability")
  .get(providerMonthAvailabilityController.index);

router
  .route("/:providerId/day-availability")
  .get(providerDayAvailabilityController.index);

export default router;
