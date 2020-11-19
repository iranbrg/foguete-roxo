"use strict";

require("core-js/modules/es.array.find");

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dateFns = require("date-fns");

var _Appointment = _interopRequireDefault(require("../models/Appointment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AppointmentsRepository = /*#__PURE__*/function () {
  function AppointmentsRepository() {
    _classCallCheck(this, AppointmentsRepository);

    this._appointments = [];
  }

  _createClass(AppointmentsRepository, [{
    key: "create",
    value: function create(_ref) {
      var provider = _ref.provider,
          date = _ref.date;
      var appointment = new _Appointment["default"](provider, date);

      this._appointments.push(appointment);

      return appointment;
    }
  }, {
    key: "findByDate",
    value: function findByDate(date) {
      var findAppointmentInSameDate = this._appointments.find(function (appointment) {
        return (0, _dateFns.isEqual)(appointment.date, date);
      });

      if (findAppointmentInSameDate) {
        return true;
      }

      return null;
    }
  }, {
    key: "getAppointments",
    value: function getAppointments() {
      return this._appointments;
    }
  }]);

  return AppointmentsRepository;
}();

exports["default"] = AppointmentsRepository;