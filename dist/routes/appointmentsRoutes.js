"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _dateFns = require("date-fns");

var _AppointmentsRepository = _interopRequireDefault(require("../ropositories/AppointmentsRepository"));

var _CreateAppointmentService = _interopRequireDefault(require("../service/CreateAppointmentService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
var appointments = new _AppointmentsRepository["default"]();
router.route("/").get(function (req, res) {
  return res.json(appointments.getAppointments());
}).post(function (req, res) {
  try {
    var _req$body = req.body,
        provider = _req$body.provider,
        date = _req$body.date;
    var parsedDate = (0, _dateFns.parseISO)(date);
    var newAppointment = new _CreateAppointmentService["default"](appointments);
    var appointment = newAppointment.execute({
      provider: provider,
      date: parsedDate
    });
    res.json(appointment);
  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
});
var _default = router;
exports["default"] = _default;