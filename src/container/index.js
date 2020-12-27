import { createContainer, asClass, Lifetime } from "awilix";

import AppointmentsRepository from "../ropositories/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";
import UsersRepository from "../ropositories/UsersRepository";
import CreateUserService from "../services/CreateUserService";

const container = createContainer();

container.register({
  appointmentsRepository: asClass(AppointmentsRepository, {
    lifetime: Lifetime.SINGLETON
  }),
  createAppointmentService: asClass(CreateAppointmentService, {
    lifetime: Lifetime.SINGLETON
  }),
  usersRepository: asClass(UsersRepository, { lifetime: Lifetime.SINGLETON }),
  createUserService: asClass(CreateUserService, {
    lifetime: Lifetime.SINGLETON
  })
});

export default container;
