import { createContainer, asClass, asValue, Lifetime } from "awilix";

import AppointmentsRepository from "../repositories/AppointmentsRepository";
import UsersRepository from "../repositories/UsersRepository";
import UserTokensRepository from "../repositories/UserTokensRepository";

import CreateAppointmentService from "../services/CreateAppointmentService";
import CreateUserService from "../services/CreateUserService";
import UploadAvatarService from "../services/UploadAvatarService";
import CreateSessionService from "../services/CreateSessionService";
import SendEmailRecoveryPasswordService from "../services/SendEmailRecoveryPasswordService";
import ResetPasswordService from "../services/ResetPasswordService";
import ShowProfileService from "../services/ShowProfileService";
import UpdateProfileService from "../services/UpdateProfileService";
import ListProvidersService from "../services/ListProvidersService";
import ListProviderMonthAvailabilityService from "../services/ListProviderMonthAvailabilityService";
import ListProviderDayAvailabilityService from "../services/ListProviderDayAvailabilityService";

import BCryptHashProvider from "../utils/providers/HashProvider/BCryptHashProvider";
import DiskStorageProvider from "../utils/providers/StorageProvider/DiskStorageProvider";
import EtherealEmailProvider from "../utils/providers/EmailProvider/EtherealEmailProvider";
import HandlebarsEmailTemplateProvider from "../utils/providers/EmailProvider/HandlebarsEmailTemplateProvider";

const container = createContainer();

container.register({
  appointmentsRepository: asClass(AppointmentsRepository, {
    lifetime: Lifetime.SINGLETON
  }),
  usersRepository: asClass(UsersRepository, { lifetime: Lifetime.SINGLETON }),
  userTokensRepository: asClass(UserTokensRepository, {
    lifetime: Lifetime.SINGLETON
  })
});

container.register({
  createUserService: asClass(CreateUserService, {
    lifetime: Lifetime.SINGLETON
  }),
  createAppointmentService: asClass(CreateAppointmentService, {
    lifetime: Lifetime.SINGLETON
  }),
  uploadAvatarService: asClass(UploadAvatarService, {
    lifetime: Lifetime.SINGLETON
  }),
  createSessionService: asClass(CreateSessionService, {
    lifetime: Lifetime.SINGLETON
  }),
  sendEmailRecoveryPasswordService: asClass(SendEmailRecoveryPasswordService, {
    lifetime: Lifetime.SINGLETON
  }),
  resetPasswordService: asClass(ResetPasswordService, {
    lifetime: Lifetime.SINGLETON
  }),
  updateProfileService: asClass(UpdateProfileService, {
    lifetime: Lifetime.SINGLETON
  }),
  showProfileService: asClass(ShowProfileService, {
    lifetime: Lifetime.SINGLETON
  }),
  listProvidersService: asClass(ListProvidersService, {
    lifetime: Lifetime.SINGLETON
  }),
  listProviderMonthAvailabilityService: asClass(
    ListProviderMonthAvailabilityService,
    {
      lifetime: Lifetime.SINGLETON
    }
  ),
  listProviderDayAvailabilityService: asClass(
    ListProviderDayAvailabilityService,
    {
      lifetime: Lifetime.SINGLETON
    }
  )
});

container.register({
  hashProvider: asClass(BCryptHashProvider, {
    lifetime: Lifetime.SINGLETON
  }),
  storageProvider: asClass(DiskStorageProvider, {
    lifetime: Lifetime.SINGLETON
  }),
  etherealEmailProvider: asClass(EtherealEmailProvider, {
    lifetime: Lifetime.SINGLETON
  }),
  emailTemplateProvider: asClass(HandlebarsEmailTemplateProvider, {
    lifetime: Lifetime.SINGLETON
  })
});

container.register({
  emailProvider: asValue(container.resolve("etherealEmailProvider"), {
    lifetime: Lifetime.SINGLETON
  })
});

export default container;
