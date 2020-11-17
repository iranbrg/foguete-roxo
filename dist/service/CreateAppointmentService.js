"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require("date-fns"),
    startOfHour = _require.startOfHour;

var CreateAppointmentService = /*#__PURE__*/function () {
  function CreateAppointmentService(appointments) {
    _classCallCheck(this, CreateAppointmentService);

    this._appointments = appointments;
  }

  _createClass(CreateAppointmentService, [{
    key: "execute",
    value: function execute(_ref) {
      var provider = _ref.provider,
          date = _ref.date;
      var appointmentDate = startOfHour(date);

      var findAppointmentInSameDate = this._appointments.findByDate(appointmentDate);

      if (findAppointmentInSameDate) {
        throw new Error("This appointment is already booked");
      }

      var appointment = this._appointments.create({
        provider: provider,
        date: appointmentDate
      });

      return appointment;
    }
  }]);

  return CreateAppointmentService;
}();

module.exports = CreateAppointmentService;