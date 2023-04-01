"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const unitSpelled = convertHandler.spellOutUnit(initUnit);
    const returnUnitSpelled = convertHandler.spellOutUnit(returnUnit);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const string = convertHandler.getString(
      initNum,
      unitSpelled,
      returnNum,
      returnUnitSpelled
    );

    if (initNum === "invalid number" && returnUnit === "invalid unit") {
      res.send("invalid number and unit");
    }
    if (initNum === "invalid number") {
      res.send("invalid number");
    }
    if (returnUnit === "invalid unit") {
      res.send("invalid unit");
    }
    res.json({ initNum, initUnit, returnNum, returnUnit, string });
  });
};
