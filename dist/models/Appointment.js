"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _uuid = require("uuid");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Appointment = function Appointment(provider, date) {
  _classCallCheck(this, Appointment);

  this.id = (0, _uuid.v4)();
  this.provider = provider;
  this.date = date;
};

exports["default"] = Appointment;