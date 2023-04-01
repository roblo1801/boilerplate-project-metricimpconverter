const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("#whole number input", function () {
    const input = "32";
    const input2 = "2L";
    const input3 = "65kg";
    assert.equal(convertHandler.getNum(input), 32);
    assert.equal(convertHandler.getNum(input2), 2);
    assert.equal(convertHandler.getNum(input3), 65);
  });
  test("#decimal number input", function () {
    const input = "3.2";
    const input2 = "2.41L";
    const input3 = "66.5kg";
    assert.equal(convertHandler.getNum(input), 3.2);
    assert.equal(convertHandler.getNum(input2), 2.41);
    assert.equal(convertHandler.getNum(input3), 66.5);
  });
  test("#test fractional input", function () {
    const input = "3/2";
    const input2 = "2/41L";
    const input3 = "66/5kg";
    assert.equal(convertHandler.getNum(input), 3 / 2);
    assert.equal(convertHandler.getNum(input2), 2 / 41);
    assert.equal(convertHandler.getNum(input3), 66 / 5);
  });
  test("#fractional input with a decimal", function () {
    const input = "3.2/5";
    const input2 = "4/2.41L";
    const input3 = "66.5/33.4kg";
    assert.equal(convertHandler.getNum(input), 3.2 / 5);
    assert.equal(convertHandler.getNum(input2), 4 / 2.41);
    assert.equal(convertHandler.getNum(input3), 66.5 / 33.4);
  });
  test("#return an error on a double-fraction", function () {
    const input = "3.2/4/6";
    const input2 = "2.41/5/3L";
    const input3 = "66.5/22/3.4kg";
    assert.equal(convertHandler.getNum(input), "invalid number");
    assert.equal(convertHandler.getNum(input2), "invalid number");
    assert.equal(convertHandler.getNum(input3), "invalid number");
  });
  test("#default to a numerical input of 1 when no numerical input is provided", function () {
    const input = "gal";
    const input2 = "L";
    const input3 = "kg";
    assert.equal(convertHandler.getNum(input), 1);
    assert.equal(convertHandler.getNum(input2), 1);
    assert.equal(convertHandler.getNum(input3), 1);
  });
  test("#read each valid input unit", function () {
    const input = "3.2gal";
    const input2 = "2.41L";
    const input3 = "66.5kg";
    const input4 = "lbs";
    const input5 = "mi";
    const input6 = "km";
    assert.equal(convertHandler.getUnit(input), "gal");
    assert.equal(convertHandler.getUnit(input2), "L");
    assert.equal(convertHandler.getUnit(input3), "kg");
    assert.equal(convertHandler.getUnit(input4), "lbs");
    assert.equal(convertHandler.getUnit(input5), "mi");
    assert.equal(convertHandler.getUnit(input6), "km");
  });
  test("#return an error for an invalid input unit", function () {
    const input = "3.2gall";
    const input2 = "2.41Liters";
    const input3 = "66.5kgs";
    const input4 = "lb";
    const input5 = "miles";
    const input6 = "kms";
    assert.equal(convertHandler.getUnit(input), "invalid unit");
    assert.equal(convertHandler.getUnit(input2), "invalid unit");
    assert.equal(convertHandler.getUnit(input3), "invalid unit");
    assert.equal(convertHandler.getUnit(input4), "invalid unit");
    assert.equal(convertHandler.getUnit(input5), "invalid unit");
    assert.equal(convertHandler.getUnit(input6), "invalid unit");
  });
  test("#return the correct return unit for each valid input unit", function () {
    const input = "gal";
    const input2 = "L";
    const input3 = "kg";
    const input4 = "lbs";
    const input5 = "mi";
    const input6 = "km";
    assert.equal(convertHandler.getReturnUnit(input), "L");
    assert.equal(convertHandler.getReturnUnit(input2), "gal");
    assert.equal(convertHandler.getReturnUnit(input3), "lbs");
    assert.equal(convertHandler.getReturnUnit(input4), "kg");
    assert.equal(convertHandler.getReturnUnit(input5), "km");
    assert.equal(convertHandler.getReturnUnit(input6), "mi");
  });
  test("#return the spelled-out string unit for each valid input unit", function () {
    const input = "gal";
    const input2 = "L";
    const input3 = "kg";
    const input4 = "lbs";
    const input5 = "mi";
    const input6 = "km";
    assert.equal(convertHandler.spellOutUnit(input), "gallons");
    assert.equal(convertHandler.spellOutUnit(input2), "liters");
    assert.equal(convertHandler.spellOutUnit(input3), "kilograms");
    assert.equal(convertHandler.spellOutUnit(input4), "pounds");
    assert.equal(convertHandler.spellOutUnit(input5), "miles");
    assert.equal(convertHandler.spellOutUnit(input6), "kilometers");
  });
  test("#convert gal to L", function () {
    const initNum = 1;
    const initNum2 = 3.5;
    const initNum3 = 4 / 5;
    const initUnit = "gal";
    assert.approximately(
      convertHandler.convert(initNum, initUnit),
      initNum * 3.78541,
      0.00009
    );
    assert.approximately(
      convertHandler.convert(initNum2, initUnit),
      initNum2 * 3.78541,
      0.00009
    );
    assert.approximately(
      convertHandler.convert(initNum3, initUnit),
      initNum3 * 3.78541,
      0.00009
    );
  });
  test("#convert L to gal", function () {
    const initNum = 1;
    const initNum2 = 3.5;
    const initNum3 = 4 / 5;
    const initUnit = "L";
    assert.approximately(
      convertHandler.convert(initNum, initUnit),
      initNum / 3.78541,
      0.00009
    );
    assert.approximately(
      convertHandler.convert(initNum2, initUnit),
      initNum2 / 3.78541,
      0.00009
    );
    assert.approximately(
      convertHandler.convert(initNum3, initUnit),
      initNum3 / 3.78541,
      0.00009
    );
  });
  test("#convert mi to km", function () {
    const initNum = 1;
    const initNum2 = 3.5;
    const initNum3 = 4 / 5;
    const initUnit = "mi";
    assert.approximately(
      convertHandler.convert(initNum, initUnit),
      initNum * 1.60934,
      0.00009
    );
    assert.approximately(
      convertHandler.convert(initNum2, initUnit),
      initNum2 * 1.60934,
      0.00009
    );
    assert.approximately(
      convertHandler.convert(initNum3, initUnit),
      initNum3 * 1.60934,
      0.00009
    );
  });
  test("#convert km to mi", function () {
    const initNum = 1;
    const initNum2 = 3.5;
    const initNum3 = 4 / 5;
    const initUnit = "km";
    assert.approximately(
      convertHandler.convert(initNum, initUnit),
      initNum / 1.60934,
      0.00009
    );
    assert.approximately(
      convertHandler.convert(initNum2, initUnit),
      initNum2 / 1.60934,
      0.00009
    );
    assert.approximately(
      convertHandler.convert(initNum3, initUnit),
      initNum3 / 1.60934,
      0.00009
    );
  });
  test("#convert lbs to kg", function () {
    const initNum = 1;
    const initNum2 = 3.5;
    const initNum3 = 4 / 5;
    const initUnit = "lbs";
    assert.approximately(
      convertHandler.convert(initNum, initUnit),
      initNum * 0.453592,
      0.00009
    );
    assert.approximately(
      convertHandler.convert(initNum2, initUnit),
      initNum2 * 0.453592,
      0.00009
    );
    assert.approximately(
      convertHandler.convert(initNum3, initUnit),
      initNum3 * 0.453592,
      0.00009
    );
  });
  test("#convert kg to lbs", function () {
    const initNum = 1;
    const initNum2 = 3.5;
    const initNum3 = 4 / 5;
    const initUnit = "kg";
    assert.approximately(
      convertHandler.convert(initNum, initUnit),
      initNum / 0.453592,
      0.00009
    );
    assert.approximately(
      convertHandler.convert(initNum2, initUnit),
      initNum2 / 0.453592,
      0.00009
    );
    assert.approximately(
      convertHandler.convert(initNum3, initUnit),
      initNum3 / 0.453592,
      0.00009
    );
  });
});
