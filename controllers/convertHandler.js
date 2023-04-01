function ConvertHandler() {
  this.getNum = function (input) {
    const numbers = /\d+(\.\d+)?(\/\d+)?(\.\d+)?/;
    const isDouble = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?\/\d+(?:\.\d+)?[A-Za-z]*$/;

    const match1 = input.match(numbers);

    console.log(match1);
    if (input.match(isDouble)) {
      return "invalid number";
    }
    let result = match1 ? eval(match1[0]) : 1;

    return result;
  };

  this.getUnit = function (input) {
    const expressionRegex = /\d(gal|l|km|mi|kg|lbs)$/i;
    const noDigitRegex = /^(gal|l|km|mi|kg|lbs)$/i;
    const match = input.match(expressionRegex);
    const match2 = input.match(noDigitRegex);
    let result = match ? match[0].substring(1) : "invalid unit";
    if (!match) {
      result = match2 ? match2[0] : result;
    }
    if (result.toLowerCase() === "l") {
      result = "L";
    } else {
      result = result.toLowerCase();
    }
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    switch (initUnit) {
      case "km":
        return "mi";
        break;
      case "mi":
        return "km";
        break;
      case "gal":
        return "L";
        break;
      case "L":
        return "gal";
        break;
      case "l":
        return "gal";
        break;
      case "lbs":
        return "kg";
        break;
      case "kg":
        return "lbs";
        break;
      default:
        return "invalid unit";
        break;
    }
  };

  this.spellOutUnit = function (unit) {
    switch (unit) {
      case "km":
        return "kilometers";
        break;
      case "mi":
        return "miles";
        break;
      case "lbs":
        return "pounds";
        break;
      case "kg":
        return "kilograms";
        break;
      case "gal":
        return "gallons";
        break;
      case "L":
        return "liters";
        break;
      case "l":
        return "liters";
        break;
      default:
        return "invalid unit";
        break;
    }
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    switch (initUnit) {
      case "km":
        return parseFloat((initNum / miToKm).toFixed(5));
        break;
      case "mi":
        return parseFloat((initNum * miToKm).toFixed(5));
        break;
      case "gal":
        return parseFloat((initNum * galToL).toFixed(5));
        break;
      case "L":
        return parseFloat((initNum / galToL).toFixed(5));
        break;
      case "l":
        return parseFloat((initNum / galToL).toFixed(5));
        break;
      case "lbs":
        return parseFloat((initNum * lbsToKg).toFixed(5));
        break;
      case "kg":
        return parseFloat((initNum / lbsToKg).toFixed(5));
        break;
      default:
        return "invalid unit";
        break;
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    if (initUnit !== "invalid unit") {
      return (
        initNum +
        " " +
        initUnit +
        " converts to " +
        returnNum +
        " " +
        returnUnit
      );
    } else {
      return initUnit;
    }
  };
}

module.exports = ConvertHandler;
