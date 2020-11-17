"use strict";

var _express = _interopRequireDefault(require("express"));

var _index = _interopRequireDefault(require("./routes/index"));

require("./database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var PORT = 5000;
app.use(_express["default"].json());
app.use(_index["default"]);
app.listen(PORT, function () {
  return console.log("Server is running on port ".concat(PORT));
});