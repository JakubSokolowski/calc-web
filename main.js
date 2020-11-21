(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "../../../libs/calc-arithmetic/src/index.ts":
/*!******************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/calc-arithmetic/src/index.ts ***!
  \******************************************************************************/
/*! exports provided: StandardBaseConverter, fromNumber, fromString, Conversion, ConversionToArbitrary, ConversionToDecimal, ConversionType, AssociatedBaseConversion, addPositionalNumbers, convertUsingAssociatedBases, PositionResult, Digit, AdditionResult, NumberComplement, PositionalNumber, Digits, ComplementConverter, FloatConverter, FloatingRepresentation, SingleRepresentation, DoubleRepresentation, FloatProperty, isValidString, BaseDigits, DigitMapping, AssociatedBaseConversionDetails */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_calc_arithmetic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/calc-arithmetic */ "../../../libs/calc-arithmetic/src/lib/calc-arithmetic.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StandardBaseConverter", function() { return _lib_calc_arithmetic__WEBPACK_IMPORTED_MODULE_0__["StandardBaseConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fromNumber", function() { return _lib_calc_arithmetic__WEBPACK_IMPORTED_MODULE_0__["fromNumber"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fromString", function() { return _lib_calc_arithmetic__WEBPACK_IMPORTED_MODULE_0__["fromString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Conversion", function() { return _lib_calc_arithmetic__WEBPACK_IMPORTED_MODULE_0__["Conversion"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConversionToArbitrary", function() { return _lib_calc_arithmetic__WEBPACK_IMPORTED_MODULE_0__["ConversionToArbitrary"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConversionToDecimal", function() { return _lib_calc_arithmetic__WEBPACK_IMPORTED_MODULE_0__["ConversionToDecimal"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConversionType", function() { return _lib_calc_arithmetic__WEBPACK_IMPORTED_MODULE_0__["ConversionType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AssociatedBaseConversion", function() { return _lib_calc_arithmetic__WEBPACK_IMPORTED_MODULE_0__["AssociatedBaseConversion"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "addPositionalNumbers", function() { return _lib_calc_arithmetic__WEBPACK_IMPORTED_MODULE_0__["addPositionalNumbers"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "convertUsingAssociatedBases", function() { return _lib_calc_arithmetic__WEBPACK_IMPORTED_MODULE_0__["convertUsingAssociatedBases"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PositionResult", function() { return _lib_calc_arithmetic__WEBPACK_IMPORTED_MODULE_0__["PositionResult"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Digit", function() { return _lib_calc_arithmetic__WEBPACK_IMPORTED_MODULE_0__["Digit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AdditionResult", function() { return _lib_calc_arithmetic__WEBPACK_IMPORTED_MODULE_0__["AdditionResult"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NumberComplement", function() { return _lib_calc_arithmetic__WEBPACK_IMPORTED_MODULE_0__["NumberComplement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PositionalNumber", function() { return _lib_calc_arithmetic__WEBPACK_IMPORTED_MODULE_0__["PositionalNumber"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Digits", function() { return _lib_calc_arithmetic__WEBPACK_IMPORTED_MODULE_0__["Digits"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ComplementConverter", function() { return _lib_calc_arithmetic__WEBPACK_IMPORTED_MODULE_0__["ComplementConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FloatConverter", function() { return _lib_calc_arithmetic__WEBPACK_IMPORTED_MODULE_0__["FloatConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FloatingRepresentation", function() { return _lib_calc_arithmetic__WEBPACK_IMPORTED_MODULE_0__["FloatingRepresentation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SingleRepresentation", function() { return _lib_calc_arithmetic__WEBPACK_IMPORTED_MODULE_0__["SingleRepresentation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DoubleRepresentation", function() { return _lib_calc_arithmetic__WEBPACK_IMPORTED_MODULE_0__["DoubleRepresentation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FloatProperty", function() { return _lib_calc_arithmetic__WEBPACK_IMPORTED_MODULE_0__["FloatProperty"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isValidString", function() { return _lib_calc_arithmetic__WEBPACK_IMPORTED_MODULE_0__["isValidString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseDigits", function() { return _lib_calc_arithmetic__WEBPACK_IMPORTED_MODULE_0__["BaseDigits"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DigitMapping", function() { return _lib_calc_arithmetic__WEBPACK_IMPORTED_MODULE_0__["DigitMapping"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AssociatedBaseConversionDetails", function() { return _lib_calc_arithmetic__WEBPACK_IMPORTED_MODULE_0__["AssociatedBaseConversionDetails"]; });



/***/ }),

/***/ "../../../libs/calc-arithmetic/src/lib/calc-arithmetic.ts":
/*!********************************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/calc-arithmetic/src/lib/calc-arithmetic.ts ***!
  \********************************************************************************************/
/*! exports provided: StandardBaseConverter, fromNumber, fromString, Conversion, ConversionToArbitrary, ConversionToDecimal, ConversionType, AssociatedBaseConversion, addPositionalNumbers, convertUsingAssociatedBases, PositionResult, Digit, AdditionResult, NumberComplement, PositionalNumber, Digits, ComplementConverter, FloatConverter, FloatingRepresentation, SingleRepresentation, DoubleRepresentation, FloatProperty, isValidString, BaseDigits, DigitMapping, AssociatedBaseConversionDetails */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _positional_base_converter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./positional/base-converter */ "../../../libs/calc-arithmetic/src/lib/positional/base-converter.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StandardBaseConverter", function() { return _positional_base_converter__WEBPACK_IMPORTED_MODULE_0__["StandardBaseConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fromNumber", function() { return _positional_base_converter__WEBPACK_IMPORTED_MODULE_0__["fromNumber"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fromString", function() { return _positional_base_converter__WEBPACK_IMPORTED_MODULE_0__["fromString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Conversion", function() { return _positional_base_converter__WEBPACK_IMPORTED_MODULE_0__["Conversion"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConversionToArbitrary", function() { return _positional_base_converter__WEBPACK_IMPORTED_MODULE_0__["ConversionToArbitrary"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConversionToDecimal", function() { return _positional_base_converter__WEBPACK_IMPORTED_MODULE_0__["ConversionToDecimal"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConversionType", function() { return _positional_base_converter__WEBPACK_IMPORTED_MODULE_0__["ConversionType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AssociatedBaseConversion", function() { return _positional_base_converter__WEBPACK_IMPORTED_MODULE_0__["AssociatedBaseConversion"]; });

/* harmony import */ var _positional_addition__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./positional/addition */ "../../../libs/calc-arithmetic/src/lib/positional/addition.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "addPositionalNumbers", function() { return _positional_addition__WEBPACK_IMPORTED_MODULE_1__["addPositionalNumbers"]; });

/* harmony import */ var _positional_associated_base_converter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./positional/associated-base-converter */ "../../../libs/calc-arithmetic/src/lib/positional/associated-base-converter.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "convertUsingAssociatedBases", function() { return _positional_associated_base_converter__WEBPACK_IMPORTED_MODULE_2__["convertUsingAssociatedBases"]; });

/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./models */ "../../../libs/calc-arithmetic/src/lib/models/index.ts");
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_models__WEBPACK_IMPORTED_MODULE_3__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PositionResult", function() { return _models__WEBPACK_IMPORTED_MODULE_3__["PositionResult"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Digit", function() { return _models__WEBPACK_IMPORTED_MODULE_3__["Digit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AdditionResult", function() { return _models__WEBPACK_IMPORTED_MODULE_3__["AdditionResult"]; });

/* harmony import */ var _positional_representations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./positional/representations */ "../../../libs/calc-arithmetic/src/lib/positional/representations.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NumberComplement", function() { return _positional_representations__WEBPACK_IMPORTED_MODULE_4__["NumberComplement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PositionalNumber", function() { return _positional_representations__WEBPACK_IMPORTED_MODULE_4__["PositionalNumber"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Digits", function() { return _positional_representations__WEBPACK_IMPORTED_MODULE_4__["Digits"]; });

/* harmony import */ var _positional_complement_converter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./positional/complement-converter */ "../../../libs/calc-arithmetic/src/lib/positional/complement-converter.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ComplementConverter", function() { return _positional_complement_converter__WEBPACK_IMPORTED_MODULE_5__["ComplementConverter"]; });

/* harmony import */ var _floating_float_converter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./floating/float-converter */ "../../../libs/calc-arithmetic/src/lib/floating/float-converter.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FloatConverter", function() { return _floating_float_converter__WEBPACK_IMPORTED_MODULE_6__["FloatConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FloatingRepresentation", function() { return _floating_float_converter__WEBPACK_IMPORTED_MODULE_6__["FloatingRepresentation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SingleRepresentation", function() { return _floating_float_converter__WEBPACK_IMPORTED_MODULE_6__["SingleRepresentation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DoubleRepresentation", function() { return _floating_float_converter__WEBPACK_IMPORTED_MODULE_6__["DoubleRepresentation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FloatProperty", function() { return _floating_float_converter__WEBPACK_IMPORTED_MODULE_6__["FloatProperty"]; });

/* harmony import */ var _helpers_conversion_helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./helpers/conversion-helpers */ "../../../libs/calc-arithmetic/src/lib/helpers/conversion-helpers.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isValidString", function() { return _helpers_conversion_helpers__WEBPACK_IMPORTED_MODULE_7__["isValidString"]; });

/* harmony import */ var _positional_base_digits__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./positional/base-digits */ "../../../libs/calc-arithmetic/src/lib/positional/base-digits.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseDigits", function() { return _positional_base_digits__WEBPACK_IMPORTED_MODULE_8__["BaseDigits"]; });

/* harmony import */ var _models_digit_mapping__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./models/digit-mapping */ "../../../libs/calc-arithmetic/src/lib/models/digit-mapping.ts");
/* harmony import */ var _models_digit_mapping__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_models_digit_mapping__WEBPACK_IMPORTED_MODULE_9__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DigitMapping", function() { return _models_digit_mapping__WEBPACK_IMPORTED_MODULE_9__["DigitMapping"]; });

/* harmony import */ var _models_associated_base_conversion_details__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./models/associated-base-conversion-details */ "../../../libs/calc-arithmetic/src/lib/models/associated-base-conversion-details.ts");
/* harmony import */ var _models_associated_base_conversion_details__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_models_associated_base_conversion_details__WEBPACK_IMPORTED_MODULE_10__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AssociatedBaseConversionDetails", function() { return _models_associated_base_conversion_details__WEBPACK_IMPORTED_MODULE_10__["AssociatedBaseConversionDetails"]; });













/***/ }),

/***/ "../../../libs/calc-arithmetic/src/lib/floating/float-converter.ts":
/*!*****************************************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/calc-arithmetic/src/lib/floating/float-converter.ts ***!
  \*****************************************************************************************************/
/*! exports provided: FloatProperty, FloatConverter, FloatingRepresentation, SingleRepresentation, DoubleRepresentation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FloatProperty", function() { return FloatProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FloatConverter", function() { return FloatConverter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FloatingRepresentation", function() { return FloatingRepresentation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SingleRepresentation", function() { return SingleRepresentation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DoubleRepresentation", function() { return DoubleRepresentation; });
/* harmony import */ var _positional_base_converter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../positional/base-converter */ "../../../libs/calc-arithmetic/src/lib/positional/base-converter.ts");
/* harmony import */ var _calc_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @calc/utils */ "../../../libs/utils/src/index.ts");



var Buffer = __webpack_require__(/*! buffer/ */ "../../../node_modules/buffer/index.js").Buffer;

var FloatProperty;

(function (FloatProperty) {
  FloatProperty[FloatProperty["Normalized"] = 0] = "Normalized";
  FloatProperty[FloatProperty["Denormalized"] = 1] = "Denormalized";
  FloatProperty[FloatProperty["PositiveInfinity"] = 2] = "PositiveInfinity";
  FloatProperty[FloatProperty["NegativeInfinity"] = 3] = "NegativeInfinity";
  FloatProperty[FloatProperty["PositiveZero"] = 4] = "PositiveZero";
  FloatProperty[FloatProperty["NegativeZero"] = 5] = "NegativeZero";
  FloatProperty[FloatProperty["NAN"] = 6] = "NAN";
})(FloatProperty || (FloatProperty = {}));

class FloatConverter {
  static ToSingle(val) {
    var str = typeof val === 'number' ? this.SingleToBinaryString(val) : val;
    return new SingleRepresentation(str);
  }

  static ToDouble(val) {
    var str = typeof val === 'number' ? this.DoubleToBinaryString(val) : val;
    return new DoubleRepresentation(str);
  }

  static DoubleToBinaryString(d) {
    var buffer = new ArrayBuffer(8);
    var doubleView = new Float64Array(buffer);
    var intView = new Int32Array(buffer);
    doubleView[0] = d;
    var low = (intView[0] >>> 0).toString(2);
    var high = (intView[1] >>> 0).toString(2);
    low = low.padStart(32, '0');
    high = high.padStart(32, '0');
    return high + low;
  }

  static BinaryStringToDouble(s) {
    var low = Number.parseInt(s.substr(0, 32), 2);
    var high = Number.parseInt(s.substr(32), 2);
    var buffer = new Buffer(8);
    buffer.writeInt32BE(low, 0);
    buffer.writeInt32BE(high, 4);
    return buffer.readDoubleBE(0);
  }

  static SingleToBinaryString(f) {
    var buffer = new ArrayBuffer(4);
    var intView = new Int32Array(buffer);
    var floatView = new Float32Array(buffer);
    floatView[0] = f;
    return (intView[0] >>> 0).toString(2).padStart(32, '0');
  }

  static BinaryStringToSingle(s) {
    var byteChunks = Object(_calc_utils__WEBPACK_IMPORTED_MODULE_1__["chunks"])(s.split(''), 8).map(chunk => chunk.join(''));
    var offset = 0;
    var buffer = new Buffer(4);
    byteChunks.forEach(byteStr => {
      var byte = Number.parseInt(byteStr, 2);
      if (byte > 127) byte -= 256;
      buffer.writeInt8(byte, offset);
      offset += 1;
    });
    return buffer.readFloatBE(0);
  }

  static getProperty(representation) {
    if (this.isPositiveZero(representation)) {
      return FloatProperty.PositiveZero;
    }

    if (this.isNegativeZero(representation)) {
      return FloatProperty.NegativeZero;
    }

    if (this.isPositiveInfinity(representation)) {
      return FloatProperty.PositiveInfinity;
    }

    if (this.isNegativeInfinity(representation)) {
      return FloatProperty.NegativeInfinity;
    }

    if (this.isDenormalized(representation)) {
      return FloatProperty.Denormalized;
    }

    if (this.IsNAN(representation)) {
      return FloatProperty.NAN;
    }

    return FloatProperty.Normalized;
  }

  static isPositiveZero(representation) {
    return representation.sign === '0' && /^0*$/.test(representation.exponent) && /^0*$/.test(representation.mantissa);
  }

  static isNegativeZero(representation) {
    return representation.sign === '1' && /^0*$/.test(representation.exponent) && /^0*$/.test(representation.mantissa);
  }

  static isDenormalized(representation) {
    return /^0*$/.test(representation.exponent) && !/^0*$/.test(representation.mantissa);
  }

  static isPositiveInfinity(representation) {
    return representation.sign === '0' && /^1*$/.test(representation.exponent) && /^0*$/.test(representation.mantissa);
  }

  static isNegativeInfinity(representation) {
    return representation.sign === '1' && /^1*$/.test(representation.exponent) && /^0*$/.test(representation.mantissa);
  }

  static IsNAN(representation) {
    return /^1*$/.test(representation.exponent) && !/^0*$/.test(representation.mantissa);
  }

}
class FloatingRepresentation {
  constructor() {
    this.exponentLength = 8;
    this.mantissaLength = 23;
    this.binaryLength = 32;
    this.bias = 127;
    this.binary = '';
  }

}
class SingleRepresentation extends FloatingRepresentation {
  constructor(str) {
    super();
    this.binary = str;
  }

  get value() {
    return FloatConverter.BinaryStringToSingle(this.binary);
  }

  get sign() {
    return this.binary[0];
  }

  get signEncoding() {
    return this.binary[0];
  }

  get signValue() {
    return this.binary[0] === '0' ? '+1' : '-1';
  }

  get exponent() {
    return this.binary.substr(1, this.exponentLength);
  }

  get mantissa() {
    return this.binary.substr(1 + this.exponentLength, this.mantissaLength);
  }

  get exponentEncoding() {
    return Number.parseInt(this.exponent, 2);
  }

  get mantissaEncoding() {
    return Number.parseInt('0' + this.mantissa, 2);
  }

  get exponentValue() {
    return this.exponentEncoding - this.bias;
  }

  get mantissaValue() {
    return Object(_positional_base_converter__WEBPACK_IMPORTED_MODULE_0__["fromString"])('1.' + this.mantissa, 2, 10).result.decimalValue.toNumber();
  }

}
class DoubleRepresentation extends SingleRepresentation {
  constructor() {
    super(...arguments);
    this.exponentLength = 11;
    this.mantissaLength = 52;
    this.binaryLength = 64;
    this.bias = 1023;
  }

  get value() {
    return FloatConverter.BinaryStringToDouble(this.binary);
  }

}

/***/ }),

/***/ "../../../libs/calc-arithmetic/src/lib/helpers/conversion-helpers.ts":
/*!*******************************************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/calc-arithmetic/src/lib/helpers/conversion-helpers.ts ***!
  \*******************************************************************************************************/
/*! exports provided: representationStrToStrArray, getRepresentationRegexPattern, removeZeroDigits, isValidString, arbitraryIntegralToDecimal, decimalIntegerToArbitrary, decimalFractionToArbitrary, arbitraryFractionToDecimal, isFloatingPointStr, splitToPartsArr, splitToDigits, splitToDigitsList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "representationStrToStrArray", function() { return representationStrToStrArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRepresentationRegexPattern", function() { return getRepresentationRegexPattern; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeZeroDigits", function() { return removeZeroDigits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidString", function() { return isValidString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arbitraryIntegralToDecimal", function() { return arbitraryIntegralToDecimal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decimalIntegerToArbitrary", function() { return decimalIntegerToArbitrary; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decimalFractionToArbitrary", function() { return decimalFractionToArbitrary; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arbitraryFractionToDecimal", function() { return arbitraryFractionToDecimal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFloatingPointStr", function() { return isFloatingPointStr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "splitToPartsArr", function() { return splitToPartsArr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "splitToDigits", function() { return splitToDigits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "splitToDigitsList", function() { return splitToDigitsList; });
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bignumber.js */ "../../../node_modules/bignumber.js/bignumber.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _positional_base_digits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../positional/base-digits */ "../../../libs/calc-arithmetic/src/lib/positional/base-digits.ts");
/* harmony import */ var _positional_representations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../positional/representations */ "../../../libs/calc-arithmetic/src/lib/positional/representations.ts");
/* harmony import */ var _calc_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @calc/utils */ "../../../libs/utils/src/index.ts");




/**
 *  Splits the representation string into digits array
 * @param str
 * @param base
 */

function representationStrToStrArray(str, base) {
  return str.split(base <= 36 ? '' : ' ');
}
/**
 * Generates regex pattern that matches any number in positional system specified by base
 * @param base Base (radix) of a positional system, must in range <2-36>
 * @returns regex pattern string for given base
 */

function getRepresentationRegexPattern(base) {
  if (base > 36) {
    throw new Error('Matching characters by regex only supporter for bases 2- 36');
  }

  var pattern = '';

  if (base <= 10) {
    // All characters that optionally start with -, are between 0 - given number
    // and might have . in between
    pattern = '^-?[0-#]+([.][0-#]+)?$';
    pattern = Object(_calc_utils__WEBPACK_IMPORTED_MODULE_3__["replaceAll"])(pattern, '#', _positional_base_digits__WEBPACK_IMPORTED_MODULE_1__["BaseDigits"].getDigit(base - 1, base)[0]);
  } else {
    // All characters that optionally start with -, are between 0 - 9 or A - last character of representation
    // and might . in between
    pattern = '^-?[0-9A-#]+([.][0-9A-#]+)?$';
    pattern = Object(_calc_utils__WEBPACK_IMPORTED_MODULE_3__["replaceAll"])(pattern, '#', _positional_base_digits__WEBPACK_IMPORTED_MODULE_1__["BaseDigits"].getDigit(base - 1, base)[0]);
  }

  return pattern;
}
/**
 * Removes any digits that represent value 0 from the end of digit array
 * @param digits
 */

function removeZeroDigits(digits) {
  var invalidDigitCount = 0;

  for (var i = digits.length - 1; i >= 0; i--) {
    if (digits[i] === '0' || digits[i] === '00') {
      invalidDigitCount++;
    } else {
      break;
    }
  }

  return digits.slice(0, digits.length - invalidDigitCount);
}
/**
 * Checks whether string can be interpreted as number in some positional system
 * specified by base
 * @param str number string
 * @param base base of positional system
 */

function isValidString(str, base) {
  if (base <= 36) {
    var re = new RegExp(getRepresentationRegexPattern(base));
    return re.test(str);
  }

  if (str[0] === '-') {
    str = str.substr(1);
  }

  var strList = str.replace('.', ' ').split(' ');
  return strList.some(digit => {
    var num = parseInt(digit, 10);
    return !Number.isNaN(num) && num < base;
  });
}
/**
 * Converts arbitrary base integer to decimal
 * @param repStr number representation string
 * @param base the base of repStr
 */

function arbitraryIntegralToDecimal(repStr, base) {
  if (isValidString(repStr, base)) {
    var result = new bignumber_js__WEBPACK_IMPORTED_MODULE_0___default.a(0);
    var multiplier = 1; // While converting, the numbers are assumed to be unsigned
    // Detect and remember if number was negative

    if (repStr.charAt(0) === '-') {
      repStr = repStr.substr(1);
      multiplier = -1;
    } // Digits at positions in some representation are represented by multiple characters,
    // so it's necessary to convert valueString to list of strings


    var strArr = representationStrToStrArray(repStr, base); // The value at each position is calculated by taking the value of digit
    // and multiplying it by the base of number to the power of exponent
    // The exponents at positions are as follows:
    // For number 531
    // Exponents:  ...2 1 0
    // Digits:        5 3 1
    // So the starting value of exponent is the count of elements in lis -1

    var exponent = strArr.length - 1;

    for (var i = 0; i <= exponent; i++) {
      result = result.plus(new bignumber_js__WEBPACK_IMPORTED_MODULE_0___default.a(_positional_base_digits__WEBPACK_IMPORTED_MODULE_1__["BaseDigits"].getValue(strArr[i], base) * Math.pow(base, exponent - i)));
    }

    return result.multipliedBy(multiplier);
  }

  throw new Error('Invalid string for given base');
}
/**
 * Converts decimal integer to arbitrary base integer. Returns the digits of
 * resulting number as string array and all the intermediate steps of conversion
 * (dividends/quotients) as second string array.
 * @param num number to convert
 * @param base result base
 * @returns arr[0] - digits, arr[1] - steps
 */

function decimalIntegerToArbitrary(num, base) {
  if (num.isZero()) {
    return [new _positional_representations__WEBPACK_IMPORTED_MODULE_2__["Digits"]([_positional_base_digits__WEBPACK_IMPORTED_MODULE_1__["BaseDigits"].getDigit(0, base)], base), []];
  }

  var remainders = [];
  var resultDigits = [];
  var currentNum = num.abs();

  while (!currentNum.isZero()) {
    remainders.push(currentNum.toString());
    var remainder = currentNum.mod(base);
    resultDigits.push(_positional_base_digits__WEBPACK_IMPORTED_MODULE_1__["BaseDigits"].getDigit(remainder.toNumber(), base));
    currentNum = currentNum.dividedToIntegerBy(base);
  }

  return [new _positional_representations__WEBPACK_IMPORTED_MODULE_2__["Digits"](resultDigits.reverse(), base), remainders];
}
function decimalFractionToArbitrary(fraction, base) {
  var precision = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 30;

  if (fraction.isZero()) {
    return [new _positional_representations__WEBPACK_IMPORTED_MODULE_2__["Digits"]([], base), []];
  }

  if (fraction.isNegative()) {
    fraction = fraction.negated();
  }

  var result = [];
  var num = new bignumber_js__WEBPACK_IMPORTED_MODULE_0___default.a(0);
  var fractionPart;
  var wholePart = 0;
  var fractions = [];
  fractionPart = fraction;

  for (var i = 0; i < precision; i++) {
    fractions.push(fractionPart.toString());
    num = fractionPart.multipliedBy(base);
    fractions.push(num.toString());
    fractionPart = num.mod(1);
    wholePart = num.minus(fractionPart).toNumber();
    result.push(_positional_base_digits__WEBPACK_IMPORTED_MODULE_1__["BaseDigits"].getDigit(wholePart, base));
  }

  result = removeZeroDigits(result);
  fractions = removeZeroDigits(fractions);
  return [new _positional_representations__WEBPACK_IMPORTED_MODULE_2__["Digits"](result, base), fractions];
}
/**
 * Converts fractional-part of number in some positional system specified by
 * base to decimal
 * @param fractionStr
 * @param base
 * @returns fractional-part of number in decimal
 */

function arbitraryFractionToDecimal(fractionStr, base) {
  var decimalFraction = new bignumber_js__WEBPACK_IMPORTED_MODULE_0___default.a(0.0);
  var exponent = 1.0;
  var strArr = representationStrToStrArray(fractionStr, base); // The exponents at positions in fraction are as follows:
  // For fraction  0.531
  // Exponents:  0  . -1 -2 -3
  // Digits:     0  .  5  3  1

  for (var digit of strArr) {
    decimalFraction = decimalFraction.plus(_positional_base_digits__WEBPACK_IMPORTED_MODULE_1__["BaseDigits"].getValue(digit, base) * Math.pow(base, exponent * -1));
    exponent++;
  }

  return decimalFraction;
}
/**
 * Checks whether string contains delimiter
 * @param str
 */

function isFloatingPointStr(str) {
  return str.includes('.');
}
/**
 * Splits input BigNumber into integer part and fractional part digit arrays.
 * Skips sign, if the number is negative.
 * @param  num Number to split
 * @param base
 * @returns Array of two string arrays - arr[0] - digits of integer part, arr[1] - digits of fractional part
 */

function splitToPartsArr(num) {
  var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  var integerPart = [];
  var fractionalPart = [];
  var digits = typeof num === 'string' ? num : num.toString();
  var separator = base > 36 ? ' ' : '';

  if (digits.charAt(0) === '-') {
    digits = digits.substring(1);
  }

  if (digits.includes('.')) {
    // Number has non zero fraction part
    fractionalPart = digits.split('.')[1].split(separator);
  }

  integerPart = digits.split('.')[0].split(separator);
  return [integerPart, fractionalPart];
}
function splitToDigits(num) {
  var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  var result = splitToPartsArr(num, base);
  return [new _positional_representations__WEBPACK_IMPORTED_MODULE_2__["Digits"](result[0], base), new _positional_representations__WEBPACK_IMPORTED_MODULE_2__["Digits"](result[1], base)];
}
function splitToDigitsList(num) {
  var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  var [integerPart, fractionalPart] = splitToPartsArr(num, base);
  return [...integerPart.map((digit, index) => {
    return {
      valueInDecimal: _positional_base_digits__WEBPACK_IMPORTED_MODULE_1__["BaseDigits"].getValue(digit, base),
      base,
      position: integerPart.length - 1 - index,
      valueInBase: digit
    };
  }), ...fractionalPart.map((digit, index) => {
    return {
      valueInDecimal: _positional_base_digits__WEBPACK_IMPORTED_MODULE_1__["BaseDigits"].getValue(digit, base),
      base,
      position: -1 * (index + 1),
      valueInBase: digit
    };
  })];
}

/***/ }),

/***/ "../../../libs/calc-arithmetic/src/lib/models/associated-base-conversion-details.ts":
/*!**********************************************************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/calc-arithmetic/src/lib/models/associated-base-conversion-details.ts ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "../../../libs/calc-arithmetic/src/lib/models/digit-mapping.ts":
/*!*************************************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/calc-arithmetic/src/lib/models/digit-mapping.ts ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "../../../libs/calc-arithmetic/src/lib/models/index.ts":
/*!*****************************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/calc-arithmetic/src/lib/models/index.ts ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "../../../libs/calc-arithmetic/src/lib/positional/addition.ts":
/*!************************************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/calc-arithmetic/src/lib/positional/addition.ts ***!
  \************************************************************************************************/
/*! exports provided: addPositionalNumbers, areSameBaseNumbers, addDigitsArrays, findPositionRange, buildPositionalNumberFromDigits, extractResultDigitsFromPositionResults, addDigitsAtPosition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addPositionalNumbers", function() { return addPositionalNumbers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "areSameBaseNumbers", function() { return areSameBaseNumbers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addDigitsArrays", function() { return addDigitsArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findPositionRange", function() { return findPositionRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildPositionalNumberFromDigits", function() { return buildPositionalNumberFromDigits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractResultDigitsFromPositionResults", function() { return extractResultDigitsFromPositionResults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addDigitsAtPosition", function() { return addDigitsAtPosition; });
/* harmony import */ var _base_digits__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-digits */ "../../../libs/calc-arithmetic/src/lib/positional/base-digits.ts");
/* harmony import */ var _base_converter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base-converter */ "../../../libs/calc-arithmetic/src/lib/positional/base-converter.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



function addPositionalNumbers(numbers) {
  if (!areSameBaseNumbers(numbers)) {
    throw Error('Numbers to add must have same base');
  }

  var numbersAsDigits = numbers.map(number => number.toDigitsList());
  return addDigitsArrays(numbersAsDigits);
}
function areSameBaseNumbers(numbers) {
  var base = numbers[0].base;
  return numbers.map(num => num.base).every(numBase => numBase === base);
}
function addDigitsArrays(digits) {
  var carryLookup = {};
  var digitsPositionLookup = digits.map(toDigitMap);
  var {
    mostSignificantPosition,
    leastSignificantPosition
  } = findPositionRange(digits);
  var result = [];
  var currentPosition = leastSignificantPosition;
  var mostSignificant = mostSignificantPosition;

  while (currentPosition <= mostSignificant) {
    var allDigitsAtCurrentPosition = digitsPositionLookup.map(digits => digits[currentPosition]).filter(digit => !!digit);
    var allCarriesAtCurrentPosition = carryLookup[currentPosition] || [];
    var digitsToAdd = [...allCarriesAtCurrentPosition.map(carry => _objectSpread(_objectSpread({}, carry), {}, {
      isCarry: true
    })), ...allDigitsAtCurrentPosition];
    var positionResult = addDigitsAtPosition(digitsToAdd, currentPosition);
    positionResult.carry.forEach(carry => {
      if (carryLookup[carry.position]) {
        carryLookup[carry.position].push(carry);
      } else {
        carryLookup[carry.position] = [carry];
      }
    });
    var mostSignificantCarryPosition = positionResult.carry[0] ? positionResult.carry[0].position : undefined;

    if (mostSignificantCarryPosition && mostSignificantCarryPosition > mostSignificantPosition) {
      mostSignificant = mostSignificantCarryPosition;
    }

    result.push(positionResult);
    currentPosition += 1;
  }

  var resultDigits = extractResultDigitsFromPositionResults(result);
  var numberResult = buildPositionalNumberFromDigits(resultDigits);
  return {
    positionResults: result,
    resultDigits,
    numberResult,
    operands: digits
  };
}
function findPositionRange(allDigits) {
  var allMostSignificant = allDigits.map(digits => digits[0].position);
  var allLeastSignificant = allDigits.map(digits => digits[digits.length - 1].position);
  return {
    mostSignificantPosition: Math.max(...allMostSignificant),
    leastSignificantPosition: Math.min(...allLeastSignificant)
  };
}
function buildPositionalNumberFromDigits(resultDigits) {
  var representationStr = '';
  var base = resultDigits[0].base;
  resultDigits.forEach(digit => {
    var firstFractionalPartDigitIndex = -1;
    if (digit.position === firstFractionalPartDigitIndex) representationStr += '.';
    representationStr += digit.valueInBase;
  });
  return Object(_base_converter__WEBPACK_IMPORTED_MODULE_1__["fromString"])(representationStr, base, base).result;
}
function extractResultDigitsFromPositionResults(positionResults) {
  var digitsFromPositions = positionResults.map(res => res.valueAtPosition);
  var carryDigitsNotConsideredInResult = [];
  positionResults.forEach(result => {
    var missingCarryDigits = result.carry.filter(dgt => {
      return !digitsFromPositions.find(posDgt => dgt.position === posDgt.position);
    });
    carryDigitsNotConsideredInResult.push(...missingCarryDigits);
  });
  return [...carryDigitsNotConsideredInResult.reverse(), ...digitsFromPositions.reverse()];
}

function toDigitMap(digits) {
  return digits.reduce((digitMap, digit) => {
    digitMap[digit.position] = digit;
    return digitMap;
  }, {});
}

function addDigitsAtPosition(digits, position) {
  var base = digits[0].base;

  if (!digits.length) {
    return {
      carry: [],
      valueAtPosition: {
        valueInBase: _base_digits__WEBPACK_IMPORTED_MODULE_0__["BaseDigits"].getDigit(0, base),
        valueInDecimal: 0,
        position: position,
        base
      },
      operands: []
    };
  }

  var decimalSum = digits.reduce((sum, digit) => {
    return sum + digit.valueInDecimal;
  }, 0);
  var decimalPositionValue = decimalSum % base;
  var valueInBase = _base_digits__WEBPACK_IMPORTED_MODULE_0__["BaseDigits"].getDigit(decimalPositionValue, base);
  var decimalCarry = (decimalSum - decimalPositionValue) / base;
  var valueAtPosition = {
    base,
    valueInBase: valueInBase,
    valueInDecimal: decimalPositionValue,
    position: position
  };
  if (!decimalCarry) return {
    valueAtPosition,
    carry: [],
    operands: digits
  };
  return {
    valueAtPosition,
    carry: carryToDigits(decimalCarry, base, position + 1),
    operands: digits
  };
}

function carryToDigits(decimalValue, base, startingPosition) {
  var {
    result
  } = Object(_base_converter__WEBPACK_IMPORTED_MODULE_1__["fromNumber"])(decimalValue, base);
  return result.toDigitsList().filter(isNonZeroDigit).map(digit => _objectSpread(_objectSpread({}, digit), {}, {
    position: digit.position + startingPosition
  }));
}

function isNonZeroDigit(digit) {
  return digit.valueInDecimal != 0;
}

/***/ }),

/***/ "../../../libs/calc-arithmetic/src/lib/positional/associated-base-converter.ts":
/*!*****************************************************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/calc-arithmetic/src/lib/positional/associated-base-converter.ts ***!
  \*****************************************************************************************************************/
/*! exports provided: convertUsingAssociatedBases, mapToAssociatedBaseDigits, splitToSmallerBaseDigits, reduceToGreaterBaseDigit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertUsingAssociatedBases", function() { return convertUsingAssociatedBases; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapToAssociatedBaseDigits", function() { return mapToAssociatedBaseDigits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "splitToSmallerBaseDigits", function() { return splitToSmallerBaseDigits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reduceToGreaterBaseDigit", function() { return reduceToGreaterBaseDigit; });
/* harmony import */ var _base_converter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-converter */ "../../../libs/calc-arithmetic/src/lib/positional/base-converter.ts");
/* harmony import */ var _calc_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @calc/utils */ "../../../libs/utils/src/index.ts");
/* harmony import */ var _base_digits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base-digits */ "../../../libs/calc-arithmetic/src/lib/positional/base-digits.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




function convertUsingAssociatedBases(valueStr, inputBase, resultBase) {
  if (!_base_digits__WEBPACK_IMPORTED_MODULE_2__["BaseDigits"].canConvertUsingAssociateBaseMethod(inputBase, resultBase)) {
    throw new Error("Cannot convert from base ".concat(inputBase, " to ").concat(resultBase, "\n             using associate base methods. Possible output bases are\n             ").concat(_base_digits__WEBPACK_IMPORTED_MODULE_2__["BaseDigits"].getAllPossibleBasesForAssociateConversion(inputBase)));
  }

  var inputNum = Object(_base_converter__WEBPACK_IMPORTED_MODULE_0__["fromString"])(valueStr, inputBase, inputBase).result;
  var digits = inputNum.toDigitsList();
  var details = mapToAssociatedBaseDigits(digits, resultBase);
  var num = Object(_base_converter__WEBPACK_IMPORTED_MODULE_0__["fromDigits"])(details.resultDigits, inputNum.isNegative).result;
  var conv = new _base_converter__WEBPACK_IMPORTED_MODULE_0__["Conversion"]();
  conv.addStage(new _base_converter__WEBPACK_IMPORTED_MODULE_0__["AssociatedBaseConversion"]([valueStr, inputBase], num, details));
  return conv;
}
function mapToAssociatedBaseDigits(digits, outputBase) {
  var inputBase = digits[0].base;

  if (inputBase > outputBase) {
    var mappings = digits.map(digit => splitToSmallerBaseDigits(digit, outputBase));
    var strippedMappings = stripRedundantZeroDigits(mappings);
    return {
      positionMappings: strippedMappings,
      resultDigits: strippedMappings.reduce((arr, mapping) => {
        return [...arr, ...mapping.output];
      }, [])
    };
  } else {
    var integerPart = digits.filter(digit => digit.position >= 0);
    var fractionalPart = digits.filter(digit => digit.position < 0);
    var numDigitsPerPosition = Math.round(Object(_calc_utils__WEBPACK_IMPORTED_MODULE_1__["logBase"])(outputBase, inputBase));
    var reducedIntegerPart = Object(_calc_utils__WEBPACK_IMPORTED_MODULE_1__["chunksFromEnd"])(integerPart, numDigitsPerPosition).map(chunk => reduceToGreaterBaseDigit(chunk, outputBase));
    var reducedFractionalPart = Object(_calc_utils__WEBPACK_IMPORTED_MODULE_1__["chunks"])(fractionalPart, numDigitsPerPosition).map(chunk => reduceToGreaterBaseDigit(chunk, outputBase));
    var _mappings = [...reducedIntegerPart, ...reducedFractionalPart];

    var _strippedMappings = stripRedundantZeroDigits(_mappings);

    return {
      positionMappings: _strippedMappings,
      resultDigits: _strippedMappings.reduce((arr, mapping) => {
        return [...arr, ...mapping.output];
      }, [])
    };
  }
}
function splitToSmallerBaseDigits(digit, outputBase) {
  var {
    valueInDecimal,
    base,
    position
  } = digit;
  var numDigitsPerPosition = Math.round(Object(_calc_utils__WEBPACK_IMPORTED_MODULE_1__["logBase"])(base, outputBase));
  var meaningfulDigits = Object(_base_converter__WEBPACK_IMPORTED_MODULE_0__["fromNumber"])(valueInDecimal, outputBase).result.toDigitsList().map(digit => {
    return _objectSpread(_objectSpread({}, digit), {}, {
      position: 0
    });
  });
  var numOfZeroDigitsMissing = numDigitsPerPosition - meaningfulDigits.length;
  var missingZeroDigits = [...Array(numOfZeroDigitsMissing)].map(() => {
    return {
      base: outputBase,
      position: 0,
      valueInDecimal: 0,
      valueInBase: _base_digits__WEBPACK_IMPORTED_MODULE_2__["BaseDigits"].getDigit(0, outputBase)
    };
  });
  var output = [...missingZeroDigits, ...meaningfulDigits].map((digit, positionInChunk) => {
    return _objectSpread(_objectSpread({}, digit), {}, {
      position: getSmallerDigitsPositionInChunk(numDigitsPerPosition, position, positionInChunk)
    });
  });
  return {
    input: [digit],
    output
  };
}

function getSmallerDigitsPositionInChunk(numDigitsPerPosition, greaterDigitPosition, relativePositionInChunk) {
  return (greaterDigitPosition + 1) * numDigitsPerPosition - (relativePositionInChunk + 1);
}

function stripRedundantZeroDigits(mappings) {
  var result = [...mappings];
  var lastMappingIndex = mappings.length - 1;
  result[0] = removeZeroDigitsFromFirstMapping(result[0]);
  result[lastMappingIndex] = removeZeroDigitsFromLastMapping(result[lastMappingIndex]);
  return result;
}

function isZeroDigit(digit) {
  return digit.valueInDecimal === 0;
}

function removeZeroDigitsFromFirstMapping(mapping) {
  var {
    output,
    input
  } = mapping;
  var areAllMappingDigitZeros = output.every(isZeroDigit);
  return {
    input,
    output: areAllMappingDigitZeros ? output.slice(0, 1) : Object(_calc_utils__WEBPACK_IMPORTED_MODULE_1__["trimStartByPredicate"])(output, isZeroDigit)
  };
}

function removeZeroDigitsFromLastMapping(mapping) {
  var {
    output,
    input
  } = mapping;
  return {
    input,
    output: Object(_calc_utils__WEBPACK_IMPORTED_MODULE_1__["trimEndByPredicate"])(output, isZeroDigit)
  };
}

function reduceToGreaterBaseDigit(digits, outputBase) {
  var inputBase = digits[0].base;
  var numDigitsPerPosition = Math.round(Object(_calc_utils__WEBPACK_IMPORTED_MODULE_1__["logBase"])(outputBase, inputBase));
  var resultPosition = digits[digits.length - 1].position / numDigitsPerPosition;
  var digitsWithNormalizedPositions = digits.map((digit, position) => _objectSpread(_objectSpread({}, digit), {}, {
    position
  }));
  var combinedDigitValue = Object(_base_converter__WEBPACK_IMPORTED_MODULE_0__["fromDigits"])(digitsWithNormalizedPositions).result.decimalValue.toNumber();
  var digitInOutputBase = _base_digits__WEBPACK_IMPORTED_MODULE_2__["BaseDigits"].getDigit(combinedDigitValue, outputBase);
  return {
    input: digits,
    output: [{
      valueInBase: digitInOutputBase,
      base: outputBase,
      valueInDecimal: combinedDigitValue,
      position: resultPosition
    }]
  };
}

/***/ }),

/***/ "../../../libs/calc-arithmetic/src/lib/positional/base-converter.ts":
/*!******************************************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/calc-arithmetic/src/lib/positional/base-converter.ts ***!
  \******************************************************************************************************/
/*! exports provided: ConversionType, Conversion, ConversionToDecimal, DirectConversion, ConversionToArbitrary, AssociatedBaseConversion, StandardBaseConverter, fromNumber, fromString, fromStringDirect, fromDigits */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConversionType", function() { return ConversionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Conversion", function() { return Conversion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConversionToDecimal", function() { return ConversionToDecimal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DirectConversion", function() { return DirectConversion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConversionToArbitrary", function() { return ConversionToArbitrary; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssociatedBaseConversion", function() { return AssociatedBaseConversion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StandardBaseConverter", function() { return StandardBaseConverter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromNumber", function() { return fromNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromString", function() { return fromString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromStringDirect", function() { return fromStringDirect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromDigits", function() { return fromDigits; });
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bignumber.js */ "../../../node_modules/bignumber.js/bignumber.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers_conversion_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/conversion-helpers */ "../../../libs/calc-arithmetic/src/lib/helpers/conversion-helpers.ts");
/* harmony import */ var _complement_converter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./complement-converter */ "../../../libs/calc-arithmetic/src/lib/positional/complement-converter.ts");
/* harmony import */ var _representations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./representations */ "../../../libs/calc-arithmetic/src/lib/positional/representations.ts");




var ConversionType;

(function (ConversionType) {
  ConversionType["DIRECT"] = "direct";
  ConversionType["INDIRECT"] = "indirect";
})(ConversionType || (ConversionType = {}));

class Conversion {
  constructor() {
    this.stages = [];
    this.type = ConversionType.DIRECT;
  }

  get result() {
    return this.stages[this.stages.length - 1].result;
  }

  get resultNumDigits() {
    return this.result.integerPart.length + this.result.fractionalPart.length;
  }

  get inputNumDigits() {
    var [inputStr, base] = this.stages[0].input;
    return base >= 36 ? inputStr.split(' ').length : inputStr.length;
  }

  addStage(stage) {
    this.stages.push(stage);
    this.assignConversionType();
  }

  getStage(index) {
    return this.stages[index];
  }

  getLastStage() {
    return this.stages[this.stages.length - 1];
  }

  getFirstStage() {
    return this.stages[0];
  }

  concatConversion(conversion) {
    this.stages = this.stages.concat(conversion.stages);
    this.assignConversionType();
  }

  assignConversionType() {
    this.type = this.stages.length > 1 ? ConversionType.INDIRECT : ConversionType.DIRECT;
  }

}
class ConversionToDecimal {
  constructor(input, result) {
    this.input = void 0;
    this.result = void 0;
    this.inputDigitList = void 0;
    this.input = input;
    this.result = result;
    this.inputDigitList = Object(_helpers_conversion_helpers__WEBPACK_IMPORTED_MODULE_1__["splitToDigitsList"])(input[0], input[1]);
  }

}
class DirectConversion {
  constructor(input, result) {
    this.input = void 0;
    this.result = void 0;
    this.digitList = void 0;
    this.input = input;
    this.result = result;
    this.digitList = Object(_helpers_conversion_helpers__WEBPACK_IMPORTED_MODULE_1__["splitToDigitsList"])(input[0], input[1]);
  }

}
class ConversionToArbitrary extends ConversionToDecimal {
  constructor(input, result, divisors, multipliers) {
    super(input, result);
    this.integralDivisors = void 0;
    this.fractionalMultipliers = void 0;
    this.integralDivisors = divisors;
    this.fractionalMultipliers = multipliers;
  }

}
class AssociatedBaseConversion {
  constructor(input, result, details) {
    this.input = void 0;
    this.result = void 0;
    this.details = void 0;
    this.input = input;
    this.result = result;
    this.details = details;
  }

}
class StandardBaseConverter {
  fromNumber(num, resultBase) {
    var precision = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 30;
    var decimalValue = new bignumber_js__WEBPACK_IMPORTED_MODULE_0___default.a(0);

    if (typeof num === 'number') {
      decimalValue = new bignumber_js__WEBPACK_IMPORTED_MODULE_0___default.a(num);
    }

    if (num instanceof bignumber_js__WEBPACK_IMPORTED_MODULE_0___default.a) {
      decimalValue = num;
    }

    var sign = decimalValue.isNegative() ? '-' : '';
    var fractionalPart = decimalValue.mod(1);
    var integerPart = decimalValue.minus(fractionalPart);
    var integerPartDigits = Object(_helpers_conversion_helpers__WEBPACK_IMPORTED_MODULE_1__["decimalIntegerToArbitrary"])(integerPart, resultBase);
    var fractionalPartDigits = Object(_helpers_conversion_helpers__WEBPACK_IMPORTED_MODULE_1__["decimalFractionToArbitrary"])(fractionalPart, resultBase, precision);
    var repStr = integerPartDigits[0].toString() + '.' + fractionalPartDigits[0];
    var complement = _complement_converter__WEBPACK_IMPORTED_MODULE_2__["ComplementConverter"].getComplement(sign + repStr, resultBase);
    var result = new _representations__WEBPACK_IMPORTED_MODULE_3__["PositionalNumber"](integerPartDigits[0], fractionalPartDigits[0], resultBase, decimalValue, complement);
    var conversion = new Conversion();
    conversion.addStage(new ConversionToArbitrary([num.toString(), 10], result, integerPartDigits[1], fractionalPartDigits[1]));
    return conversion;
  }

  fromString(valueStr, inputBase, resultBase) {
    var precision = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 30;

    if (!Object(_helpers_conversion_helpers__WEBPACK_IMPORTED_MODULE_1__["isValidString"])(valueStr, inputBase)) {
      throw new Error("The string ".concat(valueStr, " does not match the input base ").concat(inputBase));
    }

    var conversion = new Conversion();
    var decimalValue = StandardBaseConverter.getDecimalValue(valueStr, inputBase);
    var complement = _complement_converter__WEBPACK_IMPORTED_MODULE_2__["ComplementConverter"].getComplement(decimalValue.toString(), resultBase); // Split into two str arrays - integral part digits arr and
    // fractional part digits arr

    var digits = Object(_helpers_conversion_helpers__WEBPACK_IMPORTED_MODULE_1__["splitToPartsArr"])(decimalValue);
    var inputInDecimal = new _representations__WEBPACK_IMPORTED_MODULE_3__["PositionalNumber"](digits[0], digits[1], 10, decimalValue, complement);
    conversion.addStage(new ConversionToDecimal([valueStr, inputBase], inputInDecimal));
    conversion.concatConversion(this.fromNumber(inputInDecimal.decimalValue, resultBase));
    return conversion;
  }

  fromStringDirect(valueStr, inputBase) {
    if (!Object(_helpers_conversion_helpers__WEBPACK_IMPORTED_MODULE_1__["isValidString"])(valueStr, inputBase)) {
      throw new Error("The string ".concat(valueStr, " does not match the input base ").concat(inputBase));
    }

    var conversion = new Conversion();
    var digits = Object(_helpers_conversion_helpers__WEBPACK_IMPORTED_MODULE_1__["splitToPartsArr"])(valueStr, inputBase);
    var decimalValue = StandardBaseConverter.getDecimalValue(valueStr, inputBase);
    var complement = _complement_converter__WEBPACK_IMPORTED_MODULE_2__["ComplementConverter"].getComplement(valueStr, inputBase);
    var inputInDecimal = new _representations__WEBPACK_IMPORTED_MODULE_3__["PositionalNumber"](digits[0], digits[1], inputBase, decimalValue, complement);
    conversion.addStage(new DirectConversion([valueStr, inputBase], inputInDecimal));
    return conversion;
  }

  fromDigitsDirect(digits, isNegative) {
    var valueStr = digits.reduce((str, digit) => {
      return digit.position === -1 ? str.concat(".".concat(digit.valueInBase)) : str.concat(digit.valueInBase);
    }, isNegative ? '-' : '');
    var base = digits[0].base;
    return this.fromStringDirect(valueStr, base);
  }

  static getDecimalValue(valueStr, inputBase) {
    if (!Object(_helpers_conversion_helpers__WEBPACK_IMPORTED_MODULE_1__["isFloatingPointStr"])(valueStr)) {
      return Object(_helpers_conversion_helpers__WEBPACK_IMPORTED_MODULE_1__["arbitraryIntegralToDecimal"])(valueStr, inputBase);
    }

    var valueParts = valueStr.split('.');
    var integerPart = Object(_helpers_conversion_helpers__WEBPACK_IMPORTED_MODULE_1__["arbitraryIntegralToDecimal"])(valueParts[0], inputBase);
    var fractionalPart = Object(_helpers_conversion_helpers__WEBPACK_IMPORTED_MODULE_1__["arbitraryFractionToDecimal"])(valueParts[1], inputBase); // Make the fractionalPart negative if the integer part is also negative
    // This is needed when both parts are added together to create whole value

    if (integerPart.isNegative()) {
      fractionalPart = fractionalPart.negated();
    }

    return integerPart.plus(fractionalPart);
  }

}
function fromNumber(num, resultBase) {
  var precision = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 30;
  var converter = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new StandardBaseConverter();
  return converter.fromNumber(num, resultBase, precision);
}
function fromString(valueStr, inputBase, resultBase) {
  var precision = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 30;
  var converter = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : new StandardBaseConverter();
  var valueStrWithoutExtraSpaces = valueStr.replace(/\s+/g, ' ').trim();
  return converter.fromString(valueStrWithoutExtraSpaces, inputBase, resultBase, precision);
}
function fromStringDirect(valueStr, inputBase) {
  var converter = new StandardBaseConverter();
  var valueStrWithoutExtraSpaces = valueStr.replace(/\s+/g, ' ').trim();
  return converter.fromStringDirect(valueStrWithoutExtraSpaces, inputBase);
}
function fromDigits(digit, isNegative) {
  var converter = new StandardBaseConverter();
  return converter.fromDigitsDirect(digit, isNegative);
}

/***/ }),

/***/ "../../../libs/calc-arithmetic/src/lib/positional/base-digits.ts":
/*!***************************************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/calc-arithmetic/src/lib/positional/base-digits.ts ***!
  \***************************************************************************************************/
/*! exports provided: BaseDigits */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseDigits", function() { return BaseDigits; });
/* harmony import */ var _calc_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @calc/utils */ "../../../libs/utils/src/index.ts");

/**
 * Handles conversions digit <-> value for positional systems of different bases
 */

class BaseDigits {
  /**
   * Checks whether base is between 2 and MAX_BASE
   * @param base
   */
  static isValidRadix(base) {
    return base >= this.MIN_BASE && base <= this.MAX_BASE;
  }
  /**
   * Returns digit that has specified value in base
   * @param value
   * @param base
   * @example getDigit(10, 16) will return 'A'
   */


  static getDigit(value, base) {
    if (!this.isValidRadix(base)) {
      throw new Error("Base must be between ".concat(this.MIN_BASE, " and ").concat(this.MAX_BASE, ", but was \"").concat(base, "\""));
    }

    if (value < base) {
      if (base <= 36) {
        return this.defaultDigits[value];
      }

      return value < 10 ? '0' + value.toString() : value.toString();
    }

    throw new Error("The value ".concat(value, " is not in range 0 - ").concat((base - 1).toString()));
  }
  /**
   * Returns value of specified digit.
   * @param digit must be number or uppercase letter
   * @param base
   * @example getValue('A', 16) will return 10
   */


  static getValue(digit, base) {
    if (!this.isValidRadix(base)) {
      throw new Error("Base must be between ".concat(this.MIN_BASE, " and ").concat(this.MAX_BASE));
    }

    return base <= 36 ? this.defaultDigits.indexOf(digit) : Number.parseInt(digit, 10);
  }

  static getAllPossibleBasesForAssociateConversion(base) {
    if (!this.isValidRadix(base)) return [];
    return [...this.getSmallerAssociateBases(base), ...this.getGreaterAssociateBases(base)];
  }

  static getGreaterAssociateBases(base) {
    var possibleBases = [];
    var minExponent = 2;

    for (var n = minExponent;; n++) {
      var newGreaterBase = Math.pow(base, n);
      if (newGreaterBase > this.MAX_BASE) break;
      possibleBases.push(newGreaterBase);
    }

    return possibleBases;
  }

  static getSmallerAssociateBases(base) {
    var possibleBases = [];

    for (var n = 2;; n++) {
      var nthRoot = Math.pow(base, 1 / n);
      if (nthRoot < this.MIN_BASE) break;
      if (Number.isInteger(nthRoot)) possibleBases.push(nthRoot);
    }

    return possibleBases.reverse();
  }

  static canConvertUsingAssociateBaseMethod(inputBase, outputBase) {
    var smaller = Math.min(inputBase, outputBase);
    var greater = Math.max(inputBase, outputBase);
    var log = +Object(_calc_utils__WEBPACK_IMPORTED_MODULE_0__["logBase"])(greater, smaller).toFixed(4);
    return Number.isInteger(log);
  }

}
BaseDigits.MAX_BASE = 99;
BaseDigits.MIN_BASE = 2;
BaseDigits.defaultDigits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/***/ }),

/***/ "../../../libs/calc-arithmetic/src/lib/positional/complement-converter.ts":
/*!************************************************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/calc-arithmetic/src/lib/positional/complement-converter.ts ***!
  \************************************************************************************************************/
/*! exports provided: ComplementConverter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComplementConverter", function() { return ComplementConverter; });
/* harmony import */ var _helpers_conversion_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/conversion-helpers */ "../../../libs/calc-arithmetic/src/lib/helpers/conversion-helpers.ts");
/* harmony import */ var _base_digits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base-digits */ "../../../libs/calc-arithmetic/src/lib/positional/base-digits.ts");
/* harmony import */ var _representations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./representations */ "../../../libs/calc-arithmetic/src/lib/positional/representations.ts");



/**
 * Handles creating number's BaseComplement form it's string representation
 */

class ComplementConverter {
  static isNegative(str) {
    return str.charAt(0) === '-';
  }
  /**
   * Checks whether the sign in front of complement str is negative
   * @param str
   * @param base
   */


  static isComplementStrNegative(str) {
    var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
    // Total sign length can be 3 - (9) or 4 (63), in comparision use only
    // value in between parenthesis
    var signLength = base > 36 ? 2 : 1;
    var sign = str.substr(1, signLength);
    return sign === _base_digits__WEBPACK_IMPORTED_MODULE_1__["BaseDigits"].getDigit(base - 1, base);
  }
  /**
   * Check whether given string can be used to represent complement of
   * a number.
   * @param str
   * @param base
   */


  static isValidComplementStr(str, base) {
    if (this.hasValidComplementSign(str, base)) {
      var noSignComplementStr = str.split(')')[1];
      return Object(_helpers_conversion_helpers__WEBPACK_IMPORTED_MODULE_0__["isValidString"])(noSignComplementStr, base);
    } else {
      return false;
    }
  }
  /**
   * Checks whether given string starts with valid sign
   * ex. (0) or (9) for base 10
   * @param str
   * @param base
   */


  static hasValidComplementSign(str, base) {
    var zeroDigit = _base_digits__WEBPACK_IMPORTED_MODULE_1__["BaseDigits"].getDigit(0, base);
    var maxDigit = _base_digits__WEBPACK_IMPORTED_MODULE_1__["BaseDigits"].getDigit(base - 1, base);
    var regStr = '^(\\(*\\)|\\(#\\)).*'.replace('*', zeroDigit).replace('#', maxDigit);
    var reg = new RegExp(regStr);
    return reg.test(str);
  }
  /**
   * Checks whether string has delimiter (is floating point string).
   * Accepts delimiters '.' and ','
   * @param str
   */


  static hasDelimiter(str) {
    return str.includes('.') || str.includes(',');
  }
  /**
   * Computes a complement of a number, represented either by value string or
   * NumberComplement
   * @param value value representing a number
   * @param base base of a input, default value is 10
   */


  static getComplement(value) {
    var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
    var val = '';

    if (value instanceof _representations__WEBPACK_IMPORTED_MODULE_2__["NumberComplement"]) {
      val = value.noSignValue();
      base = value.base;
    }

    if (typeof value === 'string') {
      val = value;
    }

    if (ComplementConverter.isNegative(val)) {
      return this.getNegativeNumberComplement(val, base);
    } else {
      return this.getPositiveNumberComplement(val, base);
    }
  }
  /**
   * Computes complement of a negative number
   * @param repStr
   * @param base
   */


  static getNegativeNumberComplement(repStr, base) {
    var repParts = Object(_helpers_conversion_helpers__WEBPACK_IMPORTED_MODULE_0__["splitToDigits"])(repStr.substr(1), base);
    var complementDigits = ComplementConverter.computeComplement(repParts[0], repParts[1], base);
    return new _representations__WEBPACK_IMPORTED_MODULE_2__["NumberComplement"](complementDigits[0], complementDigits[1], base, true);
  }
  /**
   * Computes complement of a positive number
   * @param valueStr
   * @param base
   */


  static getPositiveNumberComplement(valueStr, base) {
    var digits = Object(_helpers_conversion_helpers__WEBPACK_IMPORTED_MODULE_0__["splitToDigits"])(valueStr, base);
    return new _representations__WEBPACK_IMPORTED_MODULE_2__["NumberComplement"](digits[0], digits[1], base, false);
  }
  /**
   * Returns complement of a single in some positional system specified by
   * base
   * @param digit
   * @param base
   */


  static getDigitComplement(digit, base) {
    return _base_digits__WEBPACK_IMPORTED_MODULE_1__["BaseDigits"].getDigit(base - 1 - _base_digits__WEBPACK_IMPORTED_MODULE_1__["BaseDigits"].getValue(digit, base), base);
  }
  /**
   * Increments the value of number represented by digit list by 1
   * @param digits
   * @param base
   */


  static incrementNumber(digits, base) {
    for (var i = digits.length - 1; i >= 0; i--) {
      var val = _base_digits__WEBPACK_IMPORTED_MODULE_1__["BaseDigits"].getValue(digits[i], base);

      if (val === base - 1) {
        digits[i] = _base_digits__WEBPACK_IMPORTED_MODULE_1__["BaseDigits"].getDigit(0, base);
      } else {
        digits[i] = _base_digits__WEBPACK_IMPORTED_MODULE_1__["BaseDigits"].getDigit(val + 1, base);
        break;
      }
    }

    return digits;
  }
  /**
   * Computes a complement of a number represented by its integral and fractional
   * parts digits
   * @param integral
   * @param fractional
   * @param base
   */


  static computeComplement(integral, fractional, base) {
    var digits = integral.digits.concat(fractional.digits);

    for (var i = 0; i < digits.length; i++) {
      digits[i] = ComplementConverter.getDigitComplement(digits[i], base);
    }

    digits = this.incrementNumber(digits, base);
    return [new _representations__WEBPACK_IMPORTED_MODULE_2__["Digits"](digits.slice(0, integral.length), base), new _representations__WEBPACK_IMPORTED_MODULE_2__["Digits"](digits.slice(integral.length, integral.length + fractional.length), base)];
  }
  /**
   * Computes the string representation of a number, given its complement
   * string
   * @param str
   * @param base
   */


  static complementStrToBaseStr(str, base) {
    var noSignStr = str.substring(3);
    var result = '';

    if (this.isComplementStrNegative(str, base)) {
      var digits = Object(_helpers_conversion_helpers__WEBPACK_IMPORTED_MODULE_0__["splitToDigits"])(noSignStr);
      var baseDigits = this.computeComplement(digits[0], digits[1], base);
      var delimiter = baseDigits[1].length === 0 ? '' : '.';
      result = '-' + baseDigits[0].toString() + delimiter + baseDigits[1].toString();
    } else {
      result = noSignStr;
    }

    return result;
  }

}

/***/ }),

/***/ "../../../libs/calc-arithmetic/src/lib/positional/representations.ts":
/*!*******************************************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/calc-arithmetic/src/lib/positional/representations.ts ***!
  \*******************************************************************************************************/
/*! exports provided: Digits, NumberComplement, PositionalNumber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Digits", function() { return Digits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NumberComplement", function() { return NumberComplement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PositionalNumber", function() { return PositionalNumber; });
/* harmony import */ var _base_digits__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-digits */ "../../../libs/calc-arithmetic/src/lib/positional/base-digits.ts");

class Digits {
  constructor(digits, base) {
    this.digits = void 0;
    this.base = void 0;
    this.digits = digits;
    this.base = base;
  }

  get length() {
    return this.digits.length;
  }

  getDigit(index) {
    return this.digits[index];
  }

  getDigitValue(index) {
    return _base_digits__WEBPACK_IMPORTED_MODULE_0__["BaseDigits"].getValue(this.digits[index], this.base);
  }

  toString() {
    return this.base > 36 ? this.digits.join(' ') : this.digits.join('');
  }

}

/**
 * Represents complement of number in positional system
 */
class NumberComplement {
  constructor(integral, fractional, base, isNegative) {
    this.base = void 0;
    this.fractionalPart = void 0;
    this.integerPart = void 0;
    this.isNegative = void 0;
    this.integerPart = integral instanceof Digits ? integral : new Digits(integral, base);
    this.fractionalPart = fractional instanceof Digits ? fractional : new Digits(fractional, base);
    this.base = base;
    this.isNegative = isNegative;
  }

  get sign() {
    return '(' + _base_digits__WEBPACK_IMPORTED_MODULE_0__["BaseDigits"].getDigit(this.isNegative ? this.base - 1 : 0, this.base) + ')';
  }

  get delimiter() {
    return this.fractionalPart.length ? '.' : '';
  }

  toString() {
    var precision = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 30;
    return this.sign + this.noSignValue(precision);
  }

  noSignValue() {
    var precision = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 30;
    return this.integerPart.toString() + this.delimiter + this.fractionalPart.toString().slice(0, precision);
  }

}
class PositionalNumber extends NumberComplement {
  constructor(integral, fractional, base, decimalValue, complement) {
    super(integral, fractional, base, decimalValue.isNegative());
    this.complement = void 0;
    this.decimalValue = void 0;
    this.decimalValue = decimalValue;
    this.complement = complement;
  }

  get valueInBase() {
    return this.toString();
  }

  get sign() {
    return this.decimalValue.isNegative() ? '-' : '';
  }

  toDigitsList() {
    var integerPart = this.integerPart.digits.map((digit, index) => {
      var position = this.integerPart.digits.length - 1 - index;
      return {
        position,
        base: this.base,
        valueInBase: digit,
        valueInDecimal: _base_digits__WEBPACK_IMPORTED_MODULE_0__["BaseDigits"].getValue(digit, this.base)
      };
    });
    var fractionalPart = this.fractionalPart.digits.map((digit, index) => {
      var position = -1 - index;
      return {
        position,
        base: this.base,
        valueInBase: digit,
        valueInDecimal: _base_digits__WEBPACK_IMPORTED_MODULE_0__["BaseDigits"].getValue(digit, this.base)
      };
    });
    return [...integerPart, ...fractionalPart];
  }

}

/***/ }),

/***/ "../../../libs/docs/src/index.ts":
/*!*******************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/docs/src/index.ts ***!
  \*******************************************************************/
/*! exports provided: DocPage, useDocs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_components_doc_page_doc_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/components/doc-page/doc-page */ "../../../libs/docs/src/lib/components/doc-page/doc-page.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DocPage", function() { return _lib_components_doc_page_doc_page__WEBPACK_IMPORTED_MODULE_0__["DocPage"]; });

/* harmony import */ var _lib_hooks_use_docs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/hooks/use-docs */ "../../../libs/docs/src/lib/hooks/use-docs.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useDocs", function() { return _lib_hooks_use_docs__WEBPACK_IMPORTED_MODULE_1__["useDocs"]; });




/***/ }),

/***/ "../../../libs/docs/src/lib/components/doc-page/doc-page.tsx":
/*!***********************************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/docs/src/lib/components/doc-page/doc-page.tsx ***!
  \***********************************************************************************************/
/*! exports provided: useStyles, DocPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useStyles", function() { return useStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocPage", function() { return DocPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hooks_use_docs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../hooks/use-docs */ "../../../libs/docs/src/lib/hooks/use-docs.tsx");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "../../../node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _markdown_renderer_markdown_renderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../markdown-renderer/markdown-renderer */ "../../../libs/docs/src/lib/components/markdown-renderer/markdown-renderer.tsx");
/* harmony import */ var _scroll_spy_scroll_spy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../scroll-spy/scroll-spy */ "../../../libs/docs/src/lib/components/scroll-spy/scroll-spy.tsx");
/* harmony import */ var _core_functions_heading_ids__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/functions/heading-ids */ "../../../libs/docs/src/lib/core/functions/heading-ids.ts");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/styles */ "../../../node_modules/@material-ui/core/esm/styles/index.js");







var useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__["makeStyles"])(theme => {
  return Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["createStyles"])({
    box: {
      paddingBottom: '400px',
      [theme.breakpoints.down('md')]: {
        paddingRight: '250px'
      },
      [theme.breakpoints.up('lg')]: {
        paddingRight: '0px'
      }
    }
  });
});
var DocPage = (_ref) => {
  var {
    path
  } = _ref;
  var markdown = Object(_hooks_use_docs__WEBPACK_IMPORTED_MODULE_1__["useDocs"])(path);
  var imageUriPrefix = 'assets/docs/';
  var classes = useStyles();
  var ids = Object(_core_functions_heading_ids__WEBPACK_IMPORTED_MODULE_5__["extractHeadingIds"])(markdown);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Box"], {
    className: classes.box
  }, !!ids.length && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_scroll_spy_scroll_spy__WEBPACK_IMPORTED_MODULE_4__["ScrollSpy"], {
    entries: ids
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_markdown_renderer_markdown_renderer__WEBPACK_IMPORTED_MODULE_3__["MarkdownRenderer"], {
    source: markdown,
    escapeHtml: false,
    transformImageUri: uri => {
      return imageUriPrefix + path + '/' + uri;
    }
  }));
};

/***/ }),

/***/ "../../../libs/docs/src/lib/components/heading-renderer/heading-renderer.tsx":
/*!***************************************************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/docs/src/lib/components/heading-renderer/heading-renderer.tsx ***!
  \***************************************************************************************************************/
/*! exports provided: HeadingRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeadingRenderer", function() { return HeadingRenderer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "../../../node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _core_functions_heading_ids__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/functions/heading-ids */ "../../../libs/docs/src/lib/core/functions/heading-ids.ts");



var HeadingRenderer = (_ref) => {
  var {
    level,
    children
  } = _ref;

  function flatten(text, child) {
    return typeof child === 'string' ? text + child : react__WEBPACK_IMPORTED_MODULE_0___default.a.Children.toArray(child.props.children).reduce(flatten, text);
  }

  var arrayChildren = react__WEBPACK_IMPORTED_MODULE_0___default.a.Children.toArray(children);
  var text = arrayChildren.reduce(flatten, '');
  var id = Object(_core_functions_heading_ids__WEBPACK_IMPORTED_MODULE_2__["getHeadingSlug"])(text);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Typography"], {
    id: id,
    variant: "h".concat(level + 3)
  }, children);
};

/***/ }),

/***/ "../../../libs/docs/src/lib/components/markdown-renderer/markdown-renderer.tsx":
/*!*****************************************************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/docs/src/lib/components/markdown-renderer/markdown-renderer.tsx ***!
  \*****************************************************************************************************************/
/*! exports provided: MarkdownRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkdownRenderer", function() { return MarkdownRenderer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-markdown */ "../../../node_modules/react-markdown/lib/react-markdown.js");
/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_markdown__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var katex_dist_katex_min_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! katex/dist/katex.min.css */ "../../../node_modules/katex/dist/katex.min.css");
/* harmony import */ var katex_dist_katex_min_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(katex_dist_katex_min_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var remark_math__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! remark-math */ "../../../node_modules/remark-math/index.js");
/* harmony import */ var remark_math__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(remark_math__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_katex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-katex */ "../../../node_modules/react-katex/dist/react-katex.js");
/* harmony import */ var react_katex__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_katex__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core */ "../../../node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _heading_renderer_heading_renderer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../heading-renderer/heading-renderer */ "../../../libs/docs/src/lib/components/heading-renderer/heading-renderer.tsx");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var MarkdownRenderer = props => {
  var newProps = _objectSpread(_objectSpread({}, props), {}, {
    plugins: [remark_math__WEBPACK_IMPORTED_MODULE_3___default.a],
    renderers: _objectSpread(_objectSpread({}, props.renderers), {}, {
      math: props => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_katex__WEBPACK_IMPORTED_MODULE_4__["BlockMath"], {
        math: props.value
      }),
      inlineMath: props => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_katex__WEBPACK_IMPORTED_MODULE_4__["InlineMath"], {
        math: props.value
      }),
      heading: _heading_renderer_heading_renderer__WEBPACK_IMPORTED_MODULE_6__["HeadingRenderer"],
      p: props => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["Typography"], {
        paragraph: true
      }, props.children)
    })
  });

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_markdown__WEBPACK_IMPORTED_MODULE_1___default.a, newProps);
};

/***/ }),

/***/ "../../../libs/docs/src/lib/components/scroll-spy/scroll-spy.tsx":
/*!***************************************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/docs/src/lib/components/scroll-spy/scroll-spy.tsx ***!
  \***************************************************************************************************/
/*! exports provided: ScrollSpy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScrollSpy", function() { return ScrollSpy; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/styles */ "../../../node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "../../../node_modules/@material-ui/core/esm/index.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var SPY_INTERVAL = 100;
var useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__["makeStyles"])(theme => Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["createStyles"])({
  active: {
    color: theme.palette.text.secondary,
    borderLeft: "2px solid ".concat(theme.palette.text.secondary),
    cursor: 'pointer'
  },
  normal: {
    color: theme.palette.text.primary,
    cursor: 'pointer'
  },
  container: {
    listStyleType: 'none',
    right: theme.spacing(2),
    top: 64 + theme.spacing(1),
    position: 'fixed',
    display: 'block',
    width: '250px'
  }
}));
var ScrollSpy = (_ref) => {
  var {
    entries
  } = _ref;
  var [items, setItems] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  var classes = useStyles();
  var offset = 20;
  var headerHeight = 64;
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    var timer = window.setInterval(spy, SPY_INTERVAL);
    return () => window.clearInterval(timer);
  });

  var spy = () => {
    var items = entries.reduce((all, entry) => {
      var element = document.getElementById(entry.id);
      if (!element) return all;

      var item = _objectSpread({
        inView: isInView(element),
        element
      }, entry);

      return [...all, item];
    }, []);
    var firstTrueItem = items.find(item => !!item && item.inView);
    if (!firstTrueItem) return;
    var update = items.map(item => {
      return _objectSpread(_objectSpread({}, item), {}, {
        inView: item === firstTrueItem
      });
    });
    setItems(update);
  };

  var isInView = element => {
    if (!element) {
      return false;
    }

    var rect = element.getBoundingClientRect();
    return rect.top >= 0 - offset && rect.bottom <= window.innerHeight + offset;
  };

  var scrollTo = element => {
    var y = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: classes.container
  }, items.map((item, k) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["List"], {
      style: {
        paddingLeft: 2 + (item.inView ? 0 : 2) + item.level * 15
      },
      className: item.inView ? classes.active : classes.normal,
      key: k,
      onClick: () => {
        scrollTo(item.element);
      }
    }, item.element.innerText);
  }));
};

/***/ }),

/***/ "../../../libs/docs/src/lib/core/functions/heading-ids.ts":
/*!********************************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/docs/src/lib/core/functions/heading-ids.ts ***!
  \********************************************************************************************/
/*! exports provided: extractHeadingIds, getHeadingSlug */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractHeadingIds", function() { return extractHeadingIds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHeadingSlug", function() { return getHeadingSlug; });
/* harmony import */ var _latinize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./latinize */ "../../../libs/docs/src/lib/core/functions/latinize.ts");

function extractHeadingIds(markdown) {
  if (!markdown) return [];
  var headingRegex = /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/gm;
  return markdown.match(headingRegex).map(heading => {
    var withoutHashes = heading.replace(/#/g, '');
    var level = heading.split('#').length - 1;
    return {
      id: getHeadingSlug(withoutHashes),
      level: level
    };
  });
}
function getHeadingSlug(heading) {
  var slug = heading.trim().toLowerCase();
  return Object(_latinize__WEBPACK_IMPORTED_MODULE_0__["latinize"])(slug).replace(/\W/g, '-');
}

/***/ }),

/***/ "../../../libs/docs/src/lib/core/functions/latinize.ts":
/*!*****************************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/docs/src/lib/core/functions/latinize.ts ***!
  \*****************************************************************************************/
/*! exports provided: latinize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "latinize", function() { return latinize; });
var latinLookup = {
  'Á': 'A',
  'Ă': 'A',
  'Ắ': 'A',
  'Ặ': 'A',
  'Ằ': 'A',
  'Ẳ': 'A',
  'Ẵ': 'A',
  'Ǎ': 'A',
  'Â': 'A',
  'Ấ': 'A',
  'Ậ': 'A',
  'Ầ': 'A',
  'Ẩ': 'A',
  'Ẫ': 'A',
  'Ä': 'A',
  'Ǟ': 'A',
  'Ȧ': 'A',
  'Ǡ': 'A',
  'Ạ': 'A',
  'Ȁ': 'A',
  'À': 'A',
  'Ả': 'A',
  'Ȃ': 'A',
  'Ā': 'A',
  'Ą': 'A',
  'Å': 'A',
  'Ǻ': 'A',
  'Ḁ': 'A',
  'Ⱥ': 'A',
  'Ã': 'A',
  'Ꜳ': 'AA',
  'Æ': 'AE',
  'Ǽ': 'AE',
  'Ǣ': 'AE',
  'Ꜵ': 'AO',
  'Ꜷ': 'AU',
  'Ꜹ': 'AV',
  'Ꜻ': 'AV',
  'Ꜽ': 'AY',
  'Ḃ': 'B',
  'Ḅ': 'B',
  'Ɓ': 'B',
  'Ḇ': 'B',
  'Ƀ': 'B',
  'Ƃ': 'B',
  'Ć': 'C',
  'Č': 'C',
  'Ç': 'C',
  'Ḉ': 'C',
  'Ĉ': 'C',
  'Ċ': 'C',
  'Ƈ': 'C',
  'Ȼ': 'C',
  'Ď': 'D',
  'Ḑ': 'D',
  'Ḓ': 'D',
  'Ḋ': 'D',
  'Ḍ': 'D',
  'Ɗ': 'D',
  'Ḏ': 'D',
  'ǲ': 'D',
  'ǅ': 'D',
  'Đ': 'D',
  'Ƌ': 'D',
  'Ǳ': 'DZ',
  'Ǆ': 'DZ',
  'É': 'E',
  'Ĕ': 'E',
  'Ě': 'E',
  'Ȩ': 'E',
  'Ḝ': 'E',
  'Ê': 'E',
  'Ế': 'E',
  'Ệ': 'E',
  'Ề': 'E',
  'Ể': 'E',
  'Ễ': 'E',
  'Ḙ': 'E',
  'Ë': 'E',
  'Ė': 'E',
  'Ẹ': 'E',
  'Ȅ': 'E',
  'È': 'E',
  'Ẻ': 'E',
  'Ȇ': 'E',
  'Ē': 'E',
  'Ḗ': 'E',
  'Ḕ': 'E',
  'Ę': 'E',
  'Ɇ': 'E',
  'Ẽ': 'E',
  'Ḛ': 'E',
  'Ꝫ': 'ET',
  'Ḟ': 'F',
  'Ƒ': 'F',
  'Ǵ': 'G',
  'Ğ': 'G',
  'Ǧ': 'G',
  'Ģ': 'G',
  'Ĝ': 'G',
  'Ġ': 'G',
  'Ɠ': 'G',
  'Ḡ': 'G',
  'Ǥ': 'G',
  'Ḫ': 'H',
  'Ȟ': 'H',
  'Ḩ': 'H',
  'Ĥ': 'H',
  'Ⱨ': 'H',
  'Ḧ': 'H',
  'Ḣ': 'H',
  'Ḥ': 'H',
  'Ħ': 'H',
  'Í': 'I',
  'Ĭ': 'I',
  'Ǐ': 'I',
  'Î': 'I',
  'Ï': 'I',
  'Ḯ': 'I',
  'İ': 'I',
  'Ị': 'I',
  'Ȉ': 'I',
  'Ì': 'I',
  'Ỉ': 'I',
  'Ȋ': 'I',
  'Ī': 'I',
  'Į': 'I',
  'Ɨ': 'I',
  'Ĩ': 'I',
  'Ḭ': 'I',
  'Ꝺ': 'D',
  'Ꝼ': 'F',
  'Ᵹ': 'G',
  'Ꞃ': 'R',
  'Ꞅ': 'S',
  'Ꞇ': 'T',
  'Ꝭ': 'IS',
  'Ĵ': 'J',
  'Ɉ': 'J',
  'Ḱ': 'K',
  'Ǩ': 'K',
  'Ķ': 'K',
  'Ⱪ': 'K',
  'Ꝃ': 'K',
  'Ḳ': 'K',
  'Ƙ': 'K',
  'Ḵ': 'K',
  'Ꝁ': 'K',
  'Ꝅ': 'K',
  'Ĺ': 'L',
  'Ƚ': 'L',
  'Ľ': 'L',
  'Ļ': 'L',
  'Ḽ': 'L',
  'Ḷ': 'L',
  'Ḹ': 'L',
  'Ⱡ': 'L',
  'Ꝉ': 'L',
  'Ḻ': 'L',
  'Ŀ': 'L',
  'Ɫ': 'L',
  'ǈ': 'L',
  'Ł': 'L',
  'Ǉ': 'LJ',
  'Ḿ': 'M',
  'Ṁ': 'M',
  'Ṃ': 'M',
  'Ɱ': 'M',
  'Ń': 'N',
  'Ň': 'N',
  'Ņ': 'N',
  'Ṋ': 'N',
  'Ṅ': 'N',
  'Ṇ': 'N',
  'Ǹ': 'N',
  'Ɲ': 'N',
  'Ṉ': 'N',
  'Ƞ': 'N',
  'ǋ': 'N',
  'Ñ': 'N',
  'Ǌ': 'NJ',
  'Ó': 'O',
  'Ŏ': 'O',
  'Ǒ': 'O',
  'Ô': 'O',
  'Ố': 'O',
  'Ộ': 'O',
  'Ồ': 'O',
  'Ổ': 'O',
  'Ỗ': 'O',
  'Ö': 'O',
  'Ȫ': 'O',
  'Ȯ': 'O',
  'Ȱ': 'O',
  'Ọ': 'O',
  'Ő': 'O',
  'Ȍ': 'O',
  'Ò': 'O',
  'Ỏ': 'O',
  'Ơ': 'O',
  'Ớ': 'O',
  'Ợ': 'O',
  'Ờ': 'O',
  'Ở': 'O',
  'Ỡ': 'O',
  'Ȏ': 'O',
  'Ꝋ': 'O',
  'Ꝍ': 'O',
  'Ō': 'O',
  'Ṓ': 'O',
  'Ṑ': 'O',
  'Ɵ': 'O',
  'Ǫ': 'O',
  'Ǭ': 'O',
  'Ø': 'O',
  'Ǿ': 'O',
  'Õ': 'O',
  'Ṍ': 'O',
  'Ṏ': 'O',
  'Ȭ': 'O',
  'Ƣ': 'OI',
  'Ꝏ': 'OO',
  'Ɛ': 'E',
  'Ɔ': 'O',
  'Ȣ': 'OU',
  'Ṕ': 'P',
  'Ṗ': 'P',
  'Ꝓ': 'P',
  'Ƥ': 'P',
  'Ꝕ': 'P',
  'Ᵽ': 'P',
  'Ꝑ': 'P',
  'Ꝙ': 'Q',
  'Ꝗ': 'Q',
  'Ŕ': 'R',
  'Ř': 'R',
  'Ŗ': 'R',
  'Ṙ': 'R',
  'Ṛ': 'R',
  'Ṝ': 'R',
  'Ȑ': 'R',
  'Ȓ': 'R',
  'Ṟ': 'R',
  'Ɍ': 'R',
  'Ɽ': 'R',
  'Ꜿ': 'C',
  'Ǝ': 'E',
  'Ś': 'S',
  'Ṥ': 'S',
  'Š': 'S',
  'Ṧ': 'S',
  'Ş': 'S',
  'Ŝ': 'S',
  'Ș': 'S',
  'Ṡ': 'S',
  'Ṣ': 'S',
  'Ṩ': 'S',
  'Ť': 'T',
  'Ţ': 'T',
  'Ṱ': 'T',
  'Ț': 'T',
  'Ⱦ': 'T',
  'Ṫ': 'T',
  'Ṭ': 'T',
  'Ƭ': 'T',
  'Ṯ': 'T',
  'Ʈ': 'T',
  'Ŧ': 'T',
  'Ɐ': 'A',
  'Ꞁ': 'L',
  'Ɯ': 'M',
  'Ʌ': 'V',
  'Ꜩ': 'TZ',
  'Ú': 'U',
  'Ŭ': 'U',
  'Ǔ': 'U',
  'Û': 'U',
  'Ṷ': 'U',
  'Ü': 'U',
  'Ǘ': 'U',
  'Ǚ': 'U',
  'Ǜ': 'U',
  'Ǖ': 'U',
  'Ṳ': 'U',
  'Ụ': 'U',
  'Ű': 'U',
  'Ȕ': 'U',
  'Ù': 'U',
  'Ủ': 'U',
  'Ư': 'U',
  'Ứ': 'U',
  'Ự': 'U',
  'Ừ': 'U',
  'Ử': 'U',
  'Ữ': 'U',
  'Ȗ': 'U',
  'Ū': 'U',
  'Ṻ': 'U',
  'Ų': 'U',
  'Ů': 'U',
  'Ũ': 'U',
  'Ṹ': 'U',
  'Ṵ': 'U',
  'Ꝟ': 'V',
  'Ṿ': 'V',
  'Ʋ': 'V',
  'Ṽ': 'V',
  'Ꝡ': 'VY',
  'Ẃ': 'W',
  'Ŵ': 'W',
  'Ẅ': 'W',
  'Ẇ': 'W',
  'Ẉ': 'W',
  'Ẁ': 'W',
  'Ⱳ': 'W',
  'Ẍ': 'X',
  'Ẋ': 'X',
  'Ý': 'Y',
  'Ŷ': 'Y',
  'Ÿ': 'Y',
  'Ẏ': 'Y',
  'Ỵ': 'Y',
  'Ỳ': 'Y',
  'Ƴ': 'Y',
  'Ỷ': 'Y',
  'Ỿ': 'Y',
  'Ȳ': 'Y',
  'Ɏ': 'Y',
  'Ỹ': 'Y',
  'Ź': 'Z',
  'Ž': 'Z',
  'Ẑ': 'Z',
  'Ⱬ': 'Z',
  'Ż': 'Z',
  'Ẓ': 'Z',
  'Ȥ': 'Z',
  'Ẕ': 'Z',
  'Ƶ': 'Z',
  'Ĳ': 'IJ',
  'Œ': 'OE',
  'ᴀ': 'A',
  'ᴁ': 'AE',
  'ʙ': 'B',
  'ᴃ': 'B',
  'ᴄ': 'C',
  'ᴅ': 'D',
  'ᴇ': 'E',
  'ꜰ': 'F',
  'ɢ': 'G',
  'ʛ': 'G',
  'ʜ': 'H',
  'ɪ': 'I',
  'ʁ': 'R',
  'ᴊ': 'J',
  'ᴋ': 'K',
  'ʟ': 'L',
  'ᴌ': 'L',
  'ᴍ': 'M',
  'ɴ': 'N',
  'ᴏ': 'O',
  'ɶ': 'OE',
  'ᴐ': 'O',
  'ᴕ': 'OU',
  'ᴘ': 'P',
  'ʀ': 'R',
  'ᴎ': 'N',
  'ᴙ': 'R',
  'ꜱ': 'S',
  'ᴛ': 'T',
  'ⱻ': 'E',
  'ᴚ': 'R',
  'ᴜ': 'U',
  'ᴠ': 'V',
  'ᴡ': 'W',
  'ʏ': 'Y',
  'ᴢ': 'Z',
  'á': 'a',
  'ă': 'a',
  'ắ': 'a',
  'ặ': 'a',
  'ằ': 'a',
  'ẳ': 'a',
  'ẵ': 'a',
  'ǎ': 'a',
  'â': 'a',
  'ấ': 'a',
  'ậ': 'a',
  'ầ': 'a',
  'ẩ': 'a',
  'ẫ': 'a',
  'ä': 'a',
  'ǟ': 'a',
  'ȧ': 'a',
  'ǡ': 'a',
  'ạ': 'a',
  'ȁ': 'a',
  'à': 'a',
  'ả': 'a',
  'ȃ': 'a',
  'ā': 'a',
  'ą': 'a',
  'ᶏ': 'a',
  'ẚ': 'a',
  'å': 'a',
  'ǻ': 'a',
  'ḁ': 'a',
  'ⱥ': 'a',
  'ã': 'a',
  'ꜳ': 'aa',
  'æ': 'ae',
  'ǽ': 'ae',
  'ǣ': 'ae',
  'ꜵ': 'ao',
  'ꜷ': 'au',
  'ꜹ': 'av',
  'ꜻ': 'av',
  'ꜽ': 'ay',
  'ḃ': 'b',
  'ḅ': 'b',
  'ɓ': 'b',
  'ḇ': 'b',
  'ᵬ': 'b',
  'ᶀ': 'b',
  'ƀ': 'b',
  'ƃ': 'b',
  'ɵ': 'o',
  'ć': 'c',
  'č': 'c',
  'ç': 'c',
  'ḉ': 'c',
  'ĉ': 'c',
  'ɕ': 'c',
  'ċ': 'c',
  'ƈ': 'c',
  'ȼ': 'c',
  'ď': 'd',
  'ḑ': 'd',
  'ḓ': 'd',
  'ȡ': 'd',
  'ḋ': 'd',
  'ḍ': 'd',
  'ɗ': 'd',
  'ᶑ': 'd',
  'ḏ': 'd',
  'ᵭ': 'd',
  'ᶁ': 'd',
  'đ': 'd',
  'ɖ': 'd',
  'ƌ': 'd',
  'ı': 'i',
  'ȷ': 'j',
  'ɟ': 'j',
  'ʄ': 'j',
  'ǳ': 'dz',
  'ǆ': 'dz',
  'é': 'e',
  'ĕ': 'e',
  'ě': 'e',
  'ȩ': 'e',
  'ḝ': 'e',
  'ê': 'e',
  'ế': 'e',
  'ệ': 'e',
  'ề': 'e',
  'ể': 'e',
  'ễ': 'e',
  'ḙ': 'e',
  'ë': 'e',
  'ė': 'e',
  'ẹ': 'e',
  'ȅ': 'e',
  'è': 'e',
  'ẻ': 'e',
  'ȇ': 'e',
  'ē': 'e',
  'ḗ': 'e',
  'ḕ': 'e',
  'ⱸ': 'e',
  'ę': 'e',
  'ᶒ': 'e',
  'ɇ': 'e',
  'ẽ': 'e',
  'ḛ': 'e',
  'ꝫ': 'et',
  'ḟ': 'f',
  'ƒ': 'f',
  'ᵮ': 'f',
  'ᶂ': 'f',
  'ǵ': 'g',
  'ğ': 'g',
  'ǧ': 'g',
  'ģ': 'g',
  'ĝ': 'g',
  'ġ': 'g',
  'ɠ': 'g',
  'ḡ': 'g',
  'ᶃ': 'g',
  'ǥ': 'g',
  'ḫ': 'h',
  'ȟ': 'h',
  'ḩ': 'h',
  'ĥ': 'h',
  'ⱨ': 'h',
  'ḧ': 'h',
  'ḣ': 'h',
  'ḥ': 'h',
  'ɦ': 'h',
  'ẖ': 'h',
  'ħ': 'h',
  'ƕ': 'hv',
  'í': 'i',
  'ĭ': 'i',
  'ǐ': 'i',
  'î': 'i',
  'ï': 'i',
  'ḯ': 'i',
  'ị': 'i',
  'ȉ': 'i',
  'ì': 'i',
  'ỉ': 'i',
  'ȋ': 'i',
  'ī': 'i',
  'į': 'i',
  'ᶖ': 'i',
  'ɨ': 'i',
  'ĩ': 'i',
  'ḭ': 'i',
  'ꝺ': 'd',
  'ꝼ': 'f',
  'ᵹ': 'g',
  'ꞃ': 'r',
  'ꞅ': 's',
  'ꞇ': 't',
  'ꝭ': 'is',
  'ǰ': 'j',
  'ĵ': 'j',
  'ʝ': 'j',
  'ɉ': 'j',
  'ḱ': 'k',
  'ǩ': 'k',
  'ķ': 'k',
  'ⱪ': 'k',
  'ꝃ': 'k',
  'ḳ': 'k',
  'ƙ': 'k',
  'ḵ': 'k',
  'ᶄ': 'k',
  'ꝁ': 'k',
  'ꝅ': 'k',
  'ĺ': 'l',
  'ƚ': 'l',
  'ɬ': 'l',
  'ľ': 'l',
  'ļ': 'l',
  'ḽ': 'l',
  'ȴ': 'l',
  'ḷ': 'l',
  'ḹ': 'l',
  'ⱡ': 'l',
  'ꝉ': 'l',
  'ḻ': 'l',
  'ŀ': 'l',
  'ɫ': 'l',
  'ᶅ': 'l',
  'ɭ': 'l',
  'ł': 'l',
  'ǉ': 'lj',
  'ſ': 's',
  'ẜ': 's',
  'ẛ': 's',
  'ẝ': 's',
  'ḿ': 'm',
  'ṁ': 'm',
  'ṃ': 'm',
  'ɱ': 'm',
  'ᵯ': 'm',
  'ᶆ': 'm',
  'ń': 'n',
  'ň': 'n',
  'ņ': 'n',
  'ṋ': 'n',
  'ȵ': 'n',
  'ṅ': 'n',
  'ṇ': 'n',
  'ǹ': 'n',
  'ɲ': 'n',
  'ṉ': 'n',
  'ƞ': 'n',
  'ᵰ': 'n',
  'ᶇ': 'n',
  'ɳ': 'n',
  'ñ': 'n',
  'ǌ': 'nj',
  'ó': 'o',
  'ŏ': 'o',
  'ǒ': 'o',
  'ô': 'o',
  'ố': 'o',
  'ộ': 'o',
  'ồ': 'o',
  'ổ': 'o',
  'ỗ': 'o',
  'ö': 'o',
  'ȫ': 'o',
  'ȯ': 'o',
  'ȱ': 'o',
  'ọ': 'o',
  'ő': 'o',
  'ȍ': 'o',
  'ò': 'o',
  'ỏ': 'o',
  'ơ': 'o',
  'ớ': 'o',
  'ợ': 'o',
  'ờ': 'o',
  'ở': 'o',
  'ỡ': 'o',
  'ȏ': 'o',
  'ꝋ': 'o',
  'ꝍ': 'o',
  'ⱺ': 'o',
  'ō': 'o',
  'ṓ': 'o',
  'ṑ': 'o',
  'ǫ': 'o',
  'ǭ': 'o',
  'ø': 'o',
  'ǿ': 'o',
  'õ': 'o',
  'ṍ': 'o',
  'ṏ': 'o',
  'ȭ': 'o',
  'ƣ': 'oi',
  'ꝏ': 'oo',
  'ɛ': 'e',
  'ᶓ': 'e',
  'ɔ': 'o',
  'ᶗ': 'o',
  'ȣ': 'ou',
  'ṕ': 'p',
  'ṗ': 'p',
  'ꝓ': 'p',
  'ƥ': 'p',
  'ᵱ': 'p',
  'ᶈ': 'p',
  'ꝕ': 'p',
  'ᵽ': 'p',
  'ꝑ': 'p',
  'ꝙ': 'q',
  'ʠ': 'q',
  'ɋ': 'q',
  'ꝗ': 'q',
  'ŕ': 'r',
  'ř': 'r',
  'ŗ': 'r',
  'ṙ': 'r',
  'ṛ': 'r',
  'ṝ': 'r',
  'ȑ': 'r',
  'ɾ': 'r',
  'ᵳ': 'r',
  'ȓ': 'r',
  'ṟ': 'r',
  'ɼ': 'r',
  'ᵲ': 'r',
  'ᶉ': 'r',
  'ɍ': 'r',
  'ɽ': 'r',
  'ↄ': 'c',
  'ꜿ': 'c',
  'ɘ': 'e',
  'ɿ': 'r',
  'ś': 's',
  'ṥ': 's',
  'š': 's',
  'ṧ': 's',
  'ş': 's',
  'ŝ': 's',
  'ș': 's',
  'ṡ': 's',
  'ṣ': 's',
  'ṩ': 's',
  'ʂ': 's',
  'ᵴ': 's',
  'ᶊ': 's',
  'ȿ': 's',
  'ɡ': 'g',
  'ᴑ': 'o',
  'ᴓ': 'o',
  'ᴝ': 'u',
  'ť': 't',
  'ţ': 't',
  'ṱ': 't',
  'ț': 't',
  'ȶ': 't',
  'ẗ': 't',
  'ⱦ': 't',
  'ṫ': 't',
  'ṭ': 't',
  'ƭ': 't',
  'ṯ': 't',
  'ᵵ': 't',
  'ƫ': 't',
  'ʈ': 't',
  'ŧ': 't',
  'ᵺ': 'th',
  'ɐ': 'a',
  'ᴂ': 'ae',
  'ǝ': 'e',
  'ᵷ': 'g',
  'ɥ': 'h',
  'ʮ': 'h',
  'ʯ': 'h',
  'ᴉ': 'i',
  'ʞ': 'k',
  'ꞁ': 'l',
  'ɯ': 'm',
  'ɰ': 'm',
  'ᴔ': 'oe',
  'ɹ': 'r',
  'ɻ': 'r',
  'ɺ': 'r',
  'ⱹ': 'r',
  'ʇ': 't',
  'ʌ': 'v',
  'ʍ': 'w',
  'ʎ': 'y',
  'ꜩ': 'tz',
  'ú': 'u',
  'ŭ': 'u',
  'ǔ': 'u',
  'û': 'u',
  'ṷ': 'u',
  'ü': 'u',
  'ǘ': 'u',
  'ǚ': 'u',
  'ǜ': 'u',
  'ǖ': 'u',
  'ṳ': 'u',
  'ụ': 'u',
  'ű': 'u',
  'ȕ': 'u',
  'ù': 'u',
  'ủ': 'u',
  'ư': 'u',
  'ứ': 'u',
  'ự': 'u',
  'ừ': 'u',
  'ử': 'u',
  'ữ': 'u',
  'ȗ': 'u',
  'ū': 'u',
  'ṻ': 'u',
  'ų': 'u',
  'ᶙ': 'u',
  'ů': 'u',
  'ũ': 'u',
  'ṹ': 'u',
  'ṵ': 'u',
  'ᵫ': 'ue',
  'ꝸ': 'um',
  'ⱴ': 'v',
  'ꝟ': 'v',
  'ṿ': 'v',
  'ʋ': 'v',
  'ᶌ': 'v',
  'ⱱ': 'v',
  'ṽ': 'v',
  'ꝡ': 'vy',
  'ẃ': 'w',
  'ŵ': 'w',
  'ẅ': 'w',
  'ẇ': 'w',
  'ẉ': 'w',
  'ẁ': 'w',
  'ⱳ': 'w',
  'ẘ': 'w',
  'ẍ': 'x',
  'ẋ': 'x',
  'ᶍ': 'x',
  'ý': 'y',
  'ŷ': 'y',
  'ÿ': 'y',
  'ẏ': 'y',
  'ỵ': 'y',
  'ỳ': 'y',
  'ƴ': 'y',
  'ỷ': 'y',
  'ỿ': 'y',
  'ȳ': 'y',
  'ẙ': 'y',
  'ɏ': 'y',
  'ỹ': 'y',
  'ź': 'z',
  'ž': 'z',
  'ẑ': 'z',
  'ʑ': 'z',
  'ⱬ': 'z',
  'ż': 'z',
  'ẓ': 'z',
  'ȥ': 'z',
  'ẕ': 'z',
  'ᵶ': 'z',
  'ᶎ': 'z',
  'ʐ': 'z',
  'ƶ': 'z',
  'ɀ': 'z',
  'ﬀ': 'ff',
  'ﬃ': 'ffi',
  'ﬄ': 'ffl',
  'ﬁ': 'fi',
  'ﬂ': 'fl',
  'ĳ': 'ij',
  'œ': 'oe',
  'ﬆ': 'st',
  'ₐ': 'a',
  'ₑ': 'e',
  'ᵢ': 'i',
  'ⱼ': 'j',
  'ₒ': 'o',
  'ᵣ': 'r',
  'ᵤ': 'u',
  'ᵥ': 'v',
  'ₓ': 'x'
};
function latinize(str) {
  return str.replace(/[^\w ]/g, char => latinLookup[char] || char);
}

/***/ }),

/***/ "../../../libs/docs/src/lib/hooks/use-docs.tsx":
/*!*********************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/docs/src/lib/hooks/use-docs.tsx ***!
  \*********************************************************************************/
/*! exports provided: useDocs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useDocs", function() { return useDocs; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");


var useDocs = path => {
  var [doc, setDoc] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  var {
    i18n
  } = Object(react_i18next__WEBPACK_IMPORTED_MODULE_1__["useTranslation"])();
  var fileName = path.split('/').pop();
  var prefix = './assets/docs';
  var languageKeySuffix = i18n.language;
  var url = "".concat(prefix, "/").concat(path, "/").concat(fileName, "_").concat(languageKeySuffix, ".md");
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    fetch(url).then(response => response.text()).then(mdDoc => {
      setDoc(mdDoc);
    });
  });
  return doc;
};

/***/ }),

/***/ "../../../libs/grid/src/index.ts":
/*!*******************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/grid/src/index.ts ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_components_hover_cell_hover_grid_cell__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/components/hover-cell/hover-grid-cell */ "../../../libs/grid/src/lib/components/hover-cell/hover-grid-cell.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useGridCellStyles", function() { return _lib_components_hover_cell_hover_grid_cell__WEBPACK_IMPORTED_MODULE_0__["useGridCellStyles"]; });

/* harmony import */ var _lib_components_hover_grid_hover_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/components/hover-grid/hover-grid */ "../../../libs/grid/src/lib/components/hover-grid/hover-grid.tsx");
/* empty/unused harmony star reexport *//* harmony import */ var _lib_core_grid_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/core/grid-utils */ "../../../libs/grid/src/lib/core/grid-utils.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "buildRowGroups", function() { return _lib_core_grid_utils__WEBPACK_IMPORTED_MODULE_2__["buildRowGroups"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "buildCellGroupLookup", function() { return _lib_core_grid_utils__WEBPACK_IMPORTED_MODULE_2__["buildCellGroupLookup"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getOutlierAtPosition", function() { return _lib_core_grid_utils__WEBPACK_IMPORTED_MODULE_2__["getOutlierAtPosition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "coordsEqual", function() { return _lib_core_grid_utils__WEBPACK_IMPORTED_MODULE_2__["coordsEqual"]; });

/* harmony import */ var _lib_models_hover_operation_grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/models/hover-operation-grid */ "../../../libs/grid/src/lib/models/hover-operation-grid.ts");
/* harmony import */ var _lib_models_hover_operation_grid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lib_models_hover_operation_grid__WEBPACK_IMPORTED_MODULE_3__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _lib_models_hover_operation_grid__WEBPACK_IMPORTED_MODULE_3__) if(["CellCoords","CellGroup","GridCellDisplayPreset","GridCellConfig","LineType","GridLine","CellPosition","buildColumnGroups","gridToAscii","groupCellsInStraightLine","buildEmptyGrid","buildRowGroup","buildFractionalConversionGrid","buildIntegralConversionGrid","buildAdditionGrid","HoverGrid","RowConversionOperation","FloatingPartConversionInfo","GridLookup","useGridCellStyles","default","buildRowGroups","buildCellGroupLookup","getOutlierAtPosition","coordsEqual","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _lib_models_hover_operation_grid__WEBPACK_IMPORTED_MODULE_3__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _lib_models_cell_coords__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/models/cell-coords */ "../../../libs/grid/src/lib/models/cell-coords.ts");
/* harmony import */ var _lib_models_cell_coords__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lib_models_cell_coords__WEBPACK_IMPORTED_MODULE_4__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CellCoords", function() { return _lib_models_cell_coords__WEBPACK_IMPORTED_MODULE_4__["CellCoords"]; });

/* harmony import */ var _lib_models_cell_group__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/models/cell-group */ "../../../libs/grid/src/lib/models/cell-group.ts");
/* harmony import */ var _lib_models_cell_group__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lib_models_cell_group__WEBPACK_IMPORTED_MODULE_5__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CellGroup", function() { return _lib_models_cell_group__WEBPACK_IMPORTED_MODULE_5__["CellGroup"]; });

/* harmony import */ var _lib_models_grid_cell_display_preset__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/models/grid-cell-display-preset */ "../../../libs/grid/src/lib/models/grid-cell-display-preset.ts");
/* harmony import */ var _lib_models_grid_cell_display_preset__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_lib_models_grid_cell_display_preset__WEBPACK_IMPORTED_MODULE_6__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GridCellDisplayPreset", function() { return _lib_models_grid_cell_display_preset__WEBPACK_IMPORTED_MODULE_6__["GridCellDisplayPreset"]; });

/* harmony import */ var _lib_models_grid_cell_config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/models/grid-cell-config */ "../../../libs/grid/src/lib/models/grid-cell-config.ts");
/* harmony import */ var _lib_models_grid_cell_config__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_lib_models_grid_cell_config__WEBPACK_IMPORTED_MODULE_7__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GridCellConfig", function() { return _lib_models_grid_cell_config__WEBPACK_IMPORTED_MODULE_7__["GridCellConfig"]; });

/* harmony import */ var _lib_models_line_type__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lib/models/line-type */ "../../../libs/grid/src/lib/models/line-type.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LineType", function() { return _lib_models_line_type__WEBPACK_IMPORTED_MODULE_8__["LineType"]; });

/* harmony import */ var _lib_models_grid_line__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./lib/models/grid-line */ "../../../libs/grid/src/lib/models/grid-line.ts");
/* harmony import */ var _lib_models_grid_line__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_lib_models_grid_line__WEBPACK_IMPORTED_MODULE_9__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GridLine", function() { return _lib_models_grid_line__WEBPACK_IMPORTED_MODULE_9__["GridLine"]; });

/* harmony import */ var _lib_models_cell_position__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./lib/models/cell-position */ "../../../libs/grid/src/lib/models/cell-position.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CellPosition", function() { return _lib_models_cell_position__WEBPACK_IMPORTED_MODULE_10__["CellPosition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "buildColumnGroups", function() { return _lib_core_grid_utils__WEBPACK_IMPORTED_MODULE_2__["buildColumnGroups"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "gridToAscii", function() { return _lib_core_grid_utils__WEBPACK_IMPORTED_MODULE_2__["gridToAscii"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "groupCellsInStraightLine", function() { return _lib_core_grid_utils__WEBPACK_IMPORTED_MODULE_2__["groupCellsInStraightLine"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "buildEmptyGrid", function() { return _lib_core_grid_utils__WEBPACK_IMPORTED_MODULE_2__["buildEmptyGrid"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "buildRowGroup", function() { return _lib_core_grid_utils__WEBPACK_IMPORTED_MODULE_2__["buildRowGroup"]; });

/* harmony import */ var _lib_core_conversion_grid__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./lib/core/conversion-grid */ "../../../libs/grid/src/lib/core/conversion-grid.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "buildFractionalConversionGrid", function() { return _lib_core_conversion_grid__WEBPACK_IMPORTED_MODULE_11__["buildFractionalConversionGrid"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "buildIntegralConversionGrid", function() { return _lib_core_conversion_grid__WEBPACK_IMPORTED_MODULE_11__["buildIntegralConversionGrid"]; });

/* harmony import */ var _lib_core_addition_gid__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./lib/core/addition-gid */ "../../../libs/grid/src/lib/core/addition-gid.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "buildAdditionGrid", function() { return _lib_core_addition_gid__WEBPACK_IMPORTED_MODULE_12__["buildAdditionGrid"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HoverGrid", function() { return _lib_components_hover_grid_hover_grid__WEBPACK_IMPORTED_MODULE_1__["HoverGrid"]; });

/* harmony import */ var _lib_models_row_conversion_operation__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./lib/models/row-conversion-operation */ "../../../libs/grid/src/lib/models/row-conversion-operation.ts");
/* harmony import */ var _lib_models_row_conversion_operation__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_lib_models_row_conversion_operation__WEBPACK_IMPORTED_MODULE_13__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RowConversionOperation", function() { return _lib_models_row_conversion_operation__WEBPACK_IMPORTED_MODULE_13__["RowConversionOperation"]; });

/* harmony import */ var _lib_models_floating_part_conversion_info__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./lib/models/floating-part-conversion-info */ "../../../libs/grid/src/lib/models/floating-part-conversion-info.ts");
/* harmony import */ var _lib_models_floating_part_conversion_info__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_lib_models_floating_part_conversion_info__WEBPACK_IMPORTED_MODULE_14__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FloatingPartConversionInfo", function() { return _lib_models_floating_part_conversion_info__WEBPACK_IMPORTED_MODULE_14__["FloatingPartConversionInfo"]; });

/* harmony import */ var _lib_models_grid_lookup__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./lib/models/grid-lookup */ "../../../libs/grid/src/lib/models/grid-lookup.ts");
/* harmony import */ var _lib_models_grid_lookup__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_lib_models_grid_lookup__WEBPACK_IMPORTED_MODULE_15__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GridLookup", function() { return _lib_models_grid_lookup__WEBPACK_IMPORTED_MODULE_15__["GridLookup"]; });




















/***/ }),

/***/ "../../../libs/grid/src/lib/components/hover-cell/hover-grid-cell.tsx":
/*!********************************************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/grid/src/lib/components/hover-cell/hover-grid-cell.tsx ***!
  \********************************************************************************************************/
/*! exports provided: useGridCellStyles, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useGridCellStyles", function() { return useGridCellStyles; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/styles */ "../../../node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "../../../node_modules/@material-ui/core/esm/index.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var useGridCellStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__["makeStyles"])(theme => {
  var baseCell = {
    minWidth: '32px',
    height: '32px',
    minHeight: '32px',
    padding: '4px',
    textAlign: 'center',
    background: theme.palette.background.default,
    border: "1px ".concat(theme.palette.action.selected, " dashed"),
    color: theme.palette.text.disabled
  };
  return Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["createStyles"])({
    defaultCell: _objectSpread({}, baseCell),
    hoverCell: _objectSpread(_objectSpread({}, baseCell), {}, {
      background: theme.palette.action.focus,
      border: 'none'
    }),
    highlightedCell: _objectSpread(_objectSpread({}, baseCell), {}, {
      background: theme.palette.primary.light,
      color: theme.palette.getContrastText(theme.palette.primary.light)
    }),
    highlightedCellHover: _objectSpread(_objectSpread({}, baseCell), {}, {
      background: theme.palette.primary.light,
      color: theme.palette.getContrastText(theme.palette.primary.light),
      border: 'none'
    }),
    horizontalLine: {
      borderBottom: "1px solid ".concat(theme.palette.action.active)
    },
    verticalLine: {
      borderRight: "1px solid ".concat(theme.palette.action.active)
    }
  });
});

var HoverGridCell = (_ref) => {
  var {
    x,
    y,
    config,
    hovered,
    horizontalLine,
    verticalLine,
    onHover,
    onClick
  } = _ref;
  var {
    content,
    preset
  } = config;
  var classes = useGridCellStyles();

  var handleClick = () => {
    if (onClick) {
      var cellEvent = {
        x,
        y
      };
      onClick(cellEvent);
    }
  };

  var handleHover = hovered => {
    if (onHover) {
      var cellEvent = {
        x,
        y,
        hovered: hovered
      };
      onHover(cellEvent);
    }
  };

  var getCellClassName = () => {
    if (hovered) return getHoveredCellClassName();
    if (preset && preset.default) return classes[preset.default] || preset.default;
    return classes.defaultCell;
  };

  var getHoveredCellClassName = () => {
    if (preset && !!preset.hover) return classes[preset.hover] || preset.hover;
    return classes.hoverCell;
  };

  var getLineClassName = () => {
    var classNames = [];
    if (horizontalLine) classNames.push(classes.horizontalLine);
    if (verticalLine) classNames.push(classes.verticalLine);
    return classNames;
  };

  var getClassNames = () => {
    var classNames = [getCellClassName(), ...getLineClassName()];
    return classNames.join(' ');
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: getClassNames(),
    onClick: handleClick,
    key: "".concat(x, "-").concat(y),
    onMouseEnter: () => handleHover(true),
    onMouseLeave: () => handleHover(false)
  }, content);
};

/* harmony default export */ __webpack_exports__["default"] = (HoverGridCell);

/***/ }),

/***/ "../../../libs/grid/src/lib/components/hover-grid/hover-grid.tsx":
/*!***************************************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/grid/src/lib/components/hover-grid/hover-grid.tsx ***!
  \***************************************************************************************************/
/*! exports provided: HoverGrid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HoverGrid", function() { return HoverGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hover_cell_hover_grid_cell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../hover-cell/hover-grid-cell */ "../../../libs/grid/src/lib/components/hover-cell/hover-grid-cell.tsx");
/* harmony import */ var _ant_design_icons_lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ant-design/icons/lib */ "../../../node_modules/@ant-design/icons/lib/index.js");
/* harmony import */ var _ant_design_icons_lib__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons_lib__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _core_grid_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/grid-utils */ "../../../libs/grid/src/lib/core/grid-utils.ts");
/* harmony import */ var _models_cell_position__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../models/cell-position */ "../../../libs/grid/src/lib/models/cell-position.ts");
/* harmony import */ var _calc_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @calc/ui */ "../../../libs/ui/src/index.ts");
/* harmony import */ var _core_grid_line_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/grid-line-utils */ "../../../libs/grid/src/lib/core/grid-line-utils.ts");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core */ "../../../node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/styles */ "../../../node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var dom_to_image__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! dom-to-image */ "../../../node_modules/dom-to-image/src/dom-to-image.js");
/* harmony import */ var dom_to_image__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(dom_to_image__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! file-saver */ "../../../node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_10__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }












var HtmlTooltip = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__["withStyles"])(theme => ({
  tooltip: {
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9'
  }
}))(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__["Tooltip"]);
var useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8__["makeStyles"])(theme => {
  return Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__["createStyles"])({
    gridRow: {
      display: 'flex',
      flexDirection: 'row'
    },
    gridWrapper: {
      display: 'flex',
      maxWidth: '45vw',
      flexDirection: 'column',
      alignItems: 'flex-start',
      overflowX: 'auto'
    },
    cellBox: {
      width: '100%',
      maxHeight: '500px',
      display: 'inline-block'
    },
    cellContent: {
      width: 'auto',
      height: 'auto'
    },
    indicesBox: {
      display: 'flex',
      flexDirection: 'row'
    },
    columnIndex: {
      minWidth: '32px',
      height: '32px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
});
var HoverGrid = (_ref) => {
  var {
    values,
    groups,
    lines,
    groupBuilder,
    title,
    xAxis
  } = _ref;
  var lookup = Object(_core_grid_utils__WEBPACK_IMPORTED_MODULE_3__["buildCellGroupLookup"])(groups);
  var [hoverCell, setHoveredCell] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  var [hoveredGroup, setHoveredGroup] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  var gridRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  var classes = useStyles();

  var handleClick = event => {
    console.log('Click Event', event);
  };

  var handleHover = event => {
    if (event.hovered) {
      var {
        x,
        y
      } = event;
      var cellAlreadyHovered = hoverCell && hoverCell.x === event.x && hoverCell.y === event.y;
      if (cellAlreadyHovered) return; // find which group of cells
      // need to hovered, and set first group

      setHoveredCell({
        x,
        y
      });
      var hoverGroupKey = "".concat(x, "-").concat(y);
      var group = lookup[hoverGroupKey];
      if (group && group.length) setHoveredGroup(group[0]);
    } else {
      setHoveredCell(undefined);
      setHoveredGroup(undefined);
    }
  };

  var cellBelongsToHoveredGroup = (x, y) => {
    if (!hoveredGroup) return false;
    return !!hoveredGroup.cells.find(cell => {
      return cell.x === x && cell.y === y;
    });
  };

  var getGroupPopoverAnchorCoords = () => {
    if (!hoveredGroup) return {
      x: -1,
      y: -1
    };
    var position = hoveredGroup.popoverPlacement || _models_cell_position__WEBPACK_IMPORTED_MODULE_4__["CellPosition"].Top;
    return Object(_core_grid_utils__WEBPACK_IMPORTED_MODULE_3__["getOutlierAtPosition"])(hoveredGroup, position);
  };

  var anchor = getGroupPopoverAnchorCoords();
  var rows = values.map((row, y) => {
    var cells = row.map((cellConfig, x) => {
      var horizontalLine = Object(_core_grid_line_utils__WEBPACK_IMPORTED_MODULE_6__["anyHorizontalLineIntersects"])(x, y, lines);
      var verticalLine = Object(_core_grid_line_utils__WEBPACK_IMPORTED_MODULE_6__["anyVerticalLineIntersects"])(x, y, lines);
      var shouldHover = cellBelongsToHoveredGroup(x, y);
      var cellProps = {
        onClick: handleClick,
        onHover: handleHover,
        hovered: shouldHover,
        key: "".concat(x, "-").concat(y),
        x,
        y,
        horizontalLine,
        verticalLine,
        config: cellConfig
      };
      var isCellGroupAnchor = Object(_core_grid_utils__WEBPACK_IMPORTED_MODULE_3__["coordsEqual"])(anchor, {
        x,
        y
      }) && shouldHover;
      var hasBuilder = hoveredGroup && (hoveredGroup.contentBuilder || groupBuilder);
      var canBuildPopoverContent = hasBuilder && !!hoveredGroup.contentProps;

      if (isCellGroupAnchor && canBuildPopoverContent) {
        var content = groupBuilder ? groupBuilder(hoveredGroup.contentProps) : hoveredGroup.contentBuilder(hoveredGroup.contentProps);
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(HtmlTooltip, {
          title: content,
          open: true,
          key: "".concat(x, "-").concat(y),
          arrow: true,
          placement: 'top'
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_hover_cell_hover_grid_cell__WEBPACK_IMPORTED_MODULE_1__["default"], cellProps)));
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_hover_cell_hover_grid_cell__WEBPACK_IMPORTED_MODULE_1__["default"], cellProps);
    });
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: classes.gridRow,
      key: y
    }, cells);
  });
  var xAxisIndices = xAxis ? xAxis.indices.map(value => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: value,
      className: classes.columnIndex
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_calc_ui__WEBPACK_IMPORTED_MODULE_5__["NumberSubscript"], {
      value: xAxis.prefix,
      subscript: value,
      noBraces: true
    }));
  }) : [];

  var saveAsImage = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(function* () {
      if (gridRef) {
        yield dom_to_image__WEBPACK_IMPORTED_MODULE_9___default.a.toBlob(gridRef.current).then(function (blob) {
          Object(file_saver__WEBPACK_IMPORTED_MODULE_10__["saveAs"])(blob, 'result.png');
        }).catch(error => console.log(error));
      }
    });

    return function saveAsImage() {
      return _ref2.apply(this, arguments);
    };
  }();

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.gridWrapper
  }, title && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "title"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__["Typography"], null, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__["Button"], {
    size: 'small',
    onClick: saveAsImage
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ant_design_icons_lib__WEBPACK_IMPORTED_MODULE_2__["CopyOutlined"], null))), xAxis && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.indicesBox
  }, xAxisIndices), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.cellBox
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.cellContent,
    ref: gridRef
  }, rows)));
};

/***/ }),

/***/ "../../../libs/grid/src/lib/core/addition-gid.ts":
/*!***********************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/grid/src/lib/core/addition-gid.ts ***!
  \***********************************************************************************/
/*! exports provided: buildAdditionGrid, padWithEmptyCells, padWithEmptyCellDigits */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildAdditionGrid", function() { return buildAdditionGrid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "padWithEmptyCells", function() { return padWithEmptyCells; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "padWithEmptyCellDigits", function() { return padWithEmptyCellDigits; });
/* harmony import */ var _calc_calc_arithmetic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @calc/calc-arithmetic */ "../../../libs/calc-arithmetic/src/index.ts");
/* harmony import */ var _conversion_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./conversion-grid */ "../../../libs/grid/src/lib/core/conversion-grid.ts");
/* harmony import */ var _grid_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./grid-utils */ "../../../libs/grid/src/lib/core/grid-utils.ts");
/* harmony import */ var _models_line_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../models/line-type */ "../../../libs/grid/src/lib/models/line-type.ts");
/* harmony import */ var _axis_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./axis-utils */ "../../../libs/grid/src/lib/core/axis-utils.ts");





function buildAdditionGrid(result) {
  var rows = [];
  var base = result.resultDigits[0].base;
  var info = extractDelimiterInfo(result);
  var verticalLineIndex = info.numIntegerPartDigits;
  var carryRows = carriesToCellConfig(result);
  rows.push(...carryRows);
  var horizontalLineIndex = result.operands.length - 1 + carryRows.length;
  result.operands.forEach((operandDigits, index) => {
    var cells = operandDigitsToCellConfig(operandDigits, info, base);
    if (index === result.operands.length - 1) cells[0].content = '+';
    rows.push(cells);
  });
  var resultRow = digitsToCellConfig(result.resultDigits);
  rows.push(padWithEmptyCells(resultRow, info.totalWidth + 1, 'Left'));
  var groups = Object(_grid_utils__WEBPACK_IMPORTED_MODULE_2__["buildColumnGroups"])(rows, [undefined, ...result.positionResults.reverse()]);
  var xAxis = Object(_axis_utils__WEBPACK_IMPORTED_MODULE_4__["buildAxis"])(result.resultDigits[0].position + 1, result.resultDigits.length + 1);
  return {
    values: rows,
    groups,
    lines: [{
      type: _models_line_type__WEBPACK_IMPORTED_MODULE_3__["LineType"].Vertical,
      index: verticalLineIndex
    }, {
      type: _models_line_type__WEBPACK_IMPORTED_MODULE_3__["LineType"].Horizontal,
      index: horizontalLineIndex
    }, getUnderlineForCarries(carryRows)],
    xAxis
  };
}

function getUnderlineForCarries(carryRows) {
  var index = carryRows.length - 1;
  var span = {
    from: carryRows[index].findIndex(cell => cell.content !== '')
  };
  return {
    type: _models_line_type__WEBPACK_IMPORTED_MODULE_3__["LineType"].Horizontal,
    index,
    span
  };
}

function carriesToCellConfig(result) {
  var width = result.resultDigits.length + 1;
  var positionCarryLookup = {};
  var positionIndexLookup = {};
  result.resultDigits.forEach((posDigit, index) => {
    positionIndexLookup[posDigit.position] = index + 1;
  });
  var mostCarriesPerPosition = 0;
  result.positionResults.forEach(posResult => {
    posResult.carry.forEach(carry => {
      if (positionCarryLookup[carry.position]) {
        positionCarryLookup[carry.position].push(carry);
      } else {
        positionCarryLookup[carry.position] = [carry];
      }

      var numCarries = positionCarryLookup[carry.position].length;

      if (mostCarriesPerPosition < numCarries) {
        mostCarriesPerPosition = numCarries;
      }
    });
  });
  var emptyCarryGrid = buildEmptyGrid(width, mostCarriesPerPosition);
  Object.entries(positionCarryLookup).forEach((_ref) => {
    var [strPosition, positionCarries] = _ref;
    var numPosition = parseInt(strPosition);
    positionCarries.forEach((carry, carryIndex) => {
      var positionIndex = positionIndexLookup[numPosition];
      emptyCarryGrid[carryIndex][positionIndex].content = carry.valueInBase;
      emptyCarryGrid[carryIndex][positionIndex].preset = _conversion_grid__WEBPACK_IMPORTED_MODULE_1__["highlightedCellPreset"];
    });
  });
  return emptyCarryGrid;
}

function buildEmptyGrid(width, height) {
  return [...Array(height).keys()].map(() => buildEmptyRow(width));
}

function buildEmptyRow(width) {
  return [...Array(width).keys()].map(() => ({
    content: ''
  }));
}

function operandDigitsToCellConfig(digits, info, base) {
  var indexOfZeroPositionDigit = digits.findIndex(digit => digit.position === 0);

  if (indexOfZeroPositionDigit === -1) {
    return [];
  }

  var integerPartDigits = digits.slice(0, indexOfZeroPositionDigit + 1);
  var fractionalPartDigits = digits.slice(indexOfZeroPositionDigit + 1);
  var paddedIntegerPartDigits = padWithEmptyCellDigits(integerPartDigits, info.numIntegerPartDigits + 1, base, 'Left');
  var paddedFractionalPartDigits = padWithEmptyCellDigits(fractionalPartDigits, info.numFractionalDigits, base, 'Right');
  return [...paddedIntegerPartDigits, ...paddedFractionalPartDigits];
}

function extractDelimiterInfo(result) {
  return {
    totalWidth: result.resultDigits.length,
    numIntegerPartDigits: result.numberResult.integerPart.length,
    numFractionalDigits: result.numberResult.fractionalPart.length
  };
}

function padWithEmptyCells(cells, desiredWidth, direction) {
  if (desiredWidth <= cells.length) return cells;
  var missingCellsCount = desiredWidth - cells.length;
  var newEmptyCells = [...Array(missingCellsCount).keys()].map(() => ({
    content: ''
  }));
  return direction === 'Left' ? [...newEmptyCells, ...cells] : [...cells, ...newEmptyCells];
}
function padWithEmptyCellDigits(digits, desiredWidth, base, direction) {
  var cells = digitsToCellConfig(digits);
  if (desiredWidth <= digits.length) return cells;
  var missingCellsCount = desiredWidth - digits.length;
  var newEmptyCells = [...Array(missingCellsCount).keys()].map(() => {
    var value = direction === 'Left' ? '' : _calc_calc_arithmetic__WEBPACK_IMPORTED_MODULE_0__["BaseDigits"].getDigit(0, base);
    return {
      content: value
    };
  });
  return direction === 'Left' ? [...newEmptyCells, ...cells] : [...cells, ...newEmptyCells];
}

function digitsToCellConfig(digits) {
  return digits.map(digit => {
    var celLValue = digit.position === 0 ? "".concat(digit.valueInBase, ".") : digit.valueInBase;
    return {
      content: celLValue
    };
  });
}

/***/ }),

/***/ "../../../libs/grid/src/lib/core/axis-utils.ts":
/*!*********************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/grid/src/lib/core/axis-utils.ts ***!
  \*********************************************************************************/
/*! exports provided: buildAxis */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildAxis", function() { return buildAxis; });
function buildAxis(start, desiredLength) {
  var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'n';
  var indices = [];
  var num = start;

  while (indices.length < desiredLength) {
    indices.push(num.toString());
    num--;
  }

  return {
    prefix,
    indices
  };
}

/***/ }),

/***/ "../../../libs/grid/src/lib/core/conversion-grid.ts":
/*!**************************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/grid/src/lib/core/conversion-grid.ts ***!
  \**************************************************************************************/
/*! exports provided: defaultCellPreset, highlightedCellPreset, buildFractionalConversionGrid, buildIntegralConversionGrid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultCellPreset", function() { return defaultCellPreset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "highlightedCellPreset", function() { return highlightedCellPreset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildFractionalConversionGrid", function() { return buildFractionalConversionGrid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildIntegralConversionGrid", function() { return buildIntegralConversionGrid; });
/* harmony import */ var _calc_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @calc/utils */ "../../../libs/utils/src/index.ts");
/* harmony import */ var _grid_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./grid-utils */ "../../../libs/grid/src/lib/core/grid-utils.ts");
/* harmony import */ var _models_line_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/line-type */ "../../../libs/grid/src/lib/models/line-type.ts");



var defaultCellPreset = {
  default: 'defaultCell',
  hover: 'hoverCell'
};
var highlightedCellPreset = {
  default: 'highlightedCell',
  hover: 'highlightedCellHover'
};
function buildFractionalConversionGrid(conversion) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
  var {
    fractionalMultipliers
  } = extractConversionToArbitrary(conversion);
  var rows = [];
  var groups = [];
  var lines = [];
  var multiplicandMaxLength = 0;
  var resultMaxLength = 0;
  Object(_calc_utils__WEBPACK_IMPORTED_MODULE_0__["walk"])(fractionalMultipliers.slice(0, precision * 2), 2, (_ref, index) => {
    var [leftMultiplicand, rightResult] = _ref;

    /*
       Grid row for single operation below:
       0.1234 x 2 = 0.2468
       Will look like that:
       |0.|1|2|3|4| ----------- |0.| ------------- |2|4|6|8| --------- |2|
       multiplicand   fraction digit result   multiplication result   base
                                 |                      |
                                 |------- result -------|
     */
    if (index === fractionalMultipliers.length - 1) return;
    var multiplicandCells = buildMultiplicandCells(leftMultiplicand, multiplicandMaxLength + 1);
    var multiplicationResultCells = buildMultiplicationResultCells(rightResult, resultMaxLength);
    var baseCell = {
      content: conversion.result.base.toString()
    };
    var newRow = [...multiplicandCells, ...multiplicationResultCells, baseCell];
    var propContent = {
      base: conversion.result.base.toString(),
      multiplier: leftMultiplicand,
      result: rightResult
    };
    groups.push(Object(_grid_utils__WEBPACK_IMPORTED_MODULE_1__["buildRowGroup"])(newRow, index / 2, propContent));
    rows.push(newRow);

    if (index === 0) {
      multiplicandMaxLength = multiplicandCells.length - 1;
      resultMaxLength = multiplicationResultCells.length - 1;
      var separatorLine = {
        index: multiplicandCells.length - 1,
        type: _models_line_type__WEBPACK_IMPORTED_MODULE_2__["LineType"].Vertical
      };
      lines.push(separatorLine);
    }
  });
  return {
    values: rows,
    lines,
    groups
  };
}

function buildMultiplicandCells(multiplicand, desiredLength) {
  var delimiterIndex = multiplicand.indexOf('.');
  var multiplicandWithoutDelimiter = multiplicand.replace('.', '');
  var cellsWithContent = [...multiplicandWithoutDelimiter.split('').map((val, index) => {
    return index === delimiterIndex - 1 ? {
      preset: defaultCellPreset,
      content: val + '.'
    } : {
      preset: defaultCellPreset,
      content: val
    };
  })];
  var leftEmptyCells = getEmptyCellsPadding(desiredLength, cellsWithContent.length);
  return [...leftEmptyCells, ...cellsWithContent];
}

function buildMultiplicationResultCells(rightResult, desiredLength) {
  var [beforeRightDelimiter, afterRightDelimiter] = rightResult.split('.');
  var digitResultCell = {
    content: beforeRightDelimiter + '.',
    preset: highlightedCellPreset
  };
  var restOfMultiplicationResultCells = afterRightDelimiter ? [...afterRightDelimiter.split('').map(val => ({
    content: val,
    preset: defaultCellPreset
  }))] : [];
  var allRightCells = [digitResultCell].concat(restOfMultiplicationResultCells);
  var defaultRightEmptyCell = [{
    content: ' '
  }];
  var rightEmptyCells = getEmptyCellsPadding(desiredLength, allRightCells.length).concat(defaultRightEmptyCell);
  return [...allRightCells, ...rightEmptyCells];
}

function buildIntegralConversionGrid(conversion) {
  var firstStage = extractConversionToArbitrary(conversion);
  var reversedResultDigits = [...firstStage.result.integerPart.digits].reverse();
  var rows = [];
  var initialEmptyCellOffset = [[], []];
  var rowGroups = [];
  var lines = [];
  var divisors = firstStage.integralDivisors;
  divisors.forEach((value, index) => {
    if (index === divisors.length - 1) return;
    var [emptyLeft, emptyRight] = initialEmptyCellOffset;
    var left = [...value.split('').map(val => ({
      content: val,
      preset: defaultCellPreset
    }))];
    var leftEmptyCells = getEmptyCellsPadding(emptyLeft.length, left.length);
    var right = [...divisors[index + 1].split('')].map(val => ({
      content: val,
      preset: defaultCellPreset
    }));
    var defaultRightEmptyCell = [{
      content: ' '
    }];
    var rightEmptyCells = getEmptyCellsPadding(emptyRight.length, right.length).concat(defaultRightEmptyCell);

    if (index === divisors.length - 2) {
      right = right.map(val => ({
        content: val.content,
        preset: highlightedCellPreset
      }));
      rightEmptyCells = rightEmptyCells.map(val => ({
        content: val.content,
        preset: highlightedCellPreset
      }));
      var separatorLine = {
        type: _models_line_type__WEBPACK_IMPORTED_MODULE_2__["LineType"].Vertical,
        index: leftEmptyCells.length + left.length - 1
      };
      lines.push(separatorLine);
    }

    var propContent = {
      base: firstStage.result.base.toString(),
      dividend: value,
      remainder: reversedResultDigits[index],
      result: divisors[index + 1]
    };
    var newRow = [...leftEmptyCells, ...left, ...right, ...rightEmptyCells, {
      content: reversedResultDigits[index],
      preset: highlightedCellPreset
    }];
    rowGroups.push(Object(_grid_utils__WEBPACK_IMPORTED_MODULE_1__["buildRowGroup"])(newRow, index, propContent));
    rows.push(newRow);
    if (index === 0) initialEmptyCellOffset = [left, right];
  });
  return {
    values: rows,
    groups: rowGroups,
    lines
  };
}

function extractConversionToArbitrary(conversion) {
  var conversionToArbitrary = conversion.stages.length > 1 ? conversion.getLastStage() : conversion.getFirstStage();
  return conversionToArbitrary;
}

function getEmptyCellsPadding(initialLength, currentLength) {
  var offset = initialLength - currentLength;
  return offset > 0 ? ' '.repeat(offset).split('').map(value => ({
    content: value
  })) : [];
}

/***/ }),

/***/ "../../../libs/grid/src/lib/core/grid-line-utils.ts":
/*!**************************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/grid/src/lib/core/grid-line-utils.ts ***!
  \**************************************************************************************/
/*! exports provided: verticalLineIntersects, horizontalLineIntersects, anyHorizontalLineIntersects, anyVerticalLineIntersects */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "verticalLineIntersects", function() { return verticalLineIntersects; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "horizontalLineIntersects", function() { return horizontalLineIntersects; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "anyHorizontalLineIntersects", function() { return anyHorizontalLineIntersects; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "anyVerticalLineIntersects", function() { return anyVerticalLineIntersects; });
/* harmony import */ var _models_line_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/line-type */ "../../../libs/grid/src/lib/models/line-type.ts");


function isInSpan(index, range) {
  if (!range) return true;
  if (!range.to) return index >= range.from;
  if (!range.from) return index <= range.to;
  return index >= range.from && index <= range.to;
}

function verticalLineIntersects(x, y, line) {
  return x === line.index && isInSpan(y, line.span);
}
function horizontalLineIntersects(x, y, line) {
  return y === line.index && isInSpan(x, line.span);
}
function anyHorizontalLineIntersects(x, y, lines) {
  return lines.some(line => {
    if (line.type === _models_line_type__WEBPACK_IMPORTED_MODULE_0__["LineType"].Vertical) return false;
    return horizontalLineIntersects(x, y, line);
  });
}
function anyVerticalLineIntersects(x, y, lines) {
  return lines.some(line => {
    if (line.type === _models_line_type__WEBPACK_IMPORTED_MODULE_0__["LineType"].Horizontal) return false;
    return verticalLineIntersects(x, y, line);
  });
}

/***/ }),

/***/ "../../../libs/grid/src/lib/core/grid-utils.ts":
/*!*********************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/grid/src/lib/core/grid-utils.ts ***!
  \*********************************************************************************/
/*! exports provided: buildEmptyGrid, buildRowGroups, buildRowGroup, buildColumnGroups, buildCellGroupLookup, groupCellsInStraightLine, getOutlierAtPosition, coordsEqual, gridToAscii */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildEmptyGrid", function() { return buildEmptyGrid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildRowGroups", function() { return buildRowGroups; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildRowGroup", function() { return buildRowGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildColumnGroups", function() { return buildColumnGroups; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildCellGroupLookup", function() { return buildCellGroupLookup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "groupCellsInStraightLine", function() { return groupCellsInStraightLine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOutlierAtPosition", function() { return getOutlierAtPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "coordsEqual", function() { return coordsEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gridToAscii", function() { return gridToAscii; });
/* harmony import */ var _calc_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @calc/utils */ "../../../libs/utils/src/index.ts");
/* harmony import */ var _models_cell_position__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/cell-position */ "../../../libs/grid/src/lib/models/cell-position.ts");
/* harmony import */ var _models_line_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/line-type */ "../../../libs/grid/src/lib/models/line-type.ts");



function buildEmptyGrid(width, height) {
  return [...Array(height).keys()].map(() => buildEmptyRow(width));
}

function buildEmptyRow(width) {
  var preset = {
    default: 'defaultCell'
  };
  return [...Array(width).keys()].map(() => ({
    content: '',
    preset
  }));
}

function buildRowGroups(cells, contentProps, builder) {
  if (!cells.length) return [];
  return cells.map((row, rowIndex) => {
    var [start, end] = getStartEndRowCoords(row, rowIndex);
    var cells = groupCellsInStraightLine(start, end);
    return {
      cells: cells,
      contentProps: contentProps,
      contentBuilder: builder
    };
  });
}
function buildRowGroup(row, rowIndex, contentProps, contentBuilder) {
  var [start, end] = getStartEndRowCoords(row, rowIndex);
  return {
    cells: groupCellsInStraightLine(start, end),
    contentBuilder: contentBuilder,
    contentProps: contentProps
  };
}
function buildColumnGroups(cells, contentProps, contentBuilder) {
  if (!cells.length) return [];
  var groups = [];

  for (var x = 0; x < cells[0].length; x++) {
    var start = {
      x,
      y: 0
    };
    var end = {
      x,
      y: cells.length - 1
    };
    var group = {
      cells: groupCellsInStraightLine(start, end),
      contentProps: contentProps && contentProps[x] ? contentProps[x] : '',
      contentBuilder: contentBuilder
    };
    groups.push(group);
  }

  return groups;
}
function buildCellGroupLookup(groups) {
  var sortedGroups = groups.sort((a, b) => {
    return a.cells.length > b.cells.length ? 1 : -1;
  });
  return sortedGroups.reduce((lookup, group) => {
    group.cells.forEach(cell => {
      var cellKey = "".concat(cell.x, "-").concat(cell.y);

      if (lookup[cellKey]) {
        lookup[cellKey].push(group);
      } else {
        lookup[cellKey] = [group];
      }
    });
    return lookup;
  }, {});
}

function getStartEndRowCoords(row, rowIndex) {
  var start = {
    x: 0,
    y: rowIndex
  };
  var end = {
    x: row.length - 1,
    y: rowIndex
  };
  return [start, end];
}

function groupCellsInStraightLine(a, b) {
  var horizontalLine = a.y === b.y;
  var verticalLine = a.x === b.x;

  if (horizontalLine) {
    var {
      start,
      range: _range
    } = getCellRange(a.x, b.x);
    return _range.map(x => ({
      x: start + x,
      y: a.y
    }));
  }

  if (verticalLine) {
    var {
      start: _start,
      range: _range2
    } = getCellRange(a.y, b.y);
    return _range2.map(y => ({
      y: _start + y,
      x: a.x
    }));
  }

  return [];
}

function getCellRange(a, b) {
  var to = Math.max(a, b);
  var from = Math.min(a, b);
  var diff = to - from;
  return {
    range: Object(_calc_utils__WEBPACK_IMPORTED_MODULE_0__["range"])(0, diff),
    start: from
  };
}

function getOutlierAtPosition(cellGroup, position) {
  if (!cellGroup.cells) return {
    x: -1,
    y: -1
  };
  return {
    [_models_cell_position__WEBPACK_IMPORTED_MODULE_1__["CellPosition"].TopRight]: getTopRightOutlier(cellGroup),
    [_models_cell_position__WEBPACK_IMPORTED_MODULE_1__["CellPosition"].TopLeft]: getTopLeftOutlier(cellGroup),
    [_models_cell_position__WEBPACK_IMPORTED_MODULE_1__["CellPosition"].Top]: getTopMiddleOutlier(cellGroup)
  }[position] || getTopRightOutlier(cellGroup);
}

function getTopMiddleOutlier(cellGroup) {
  var topmost = getTopMostCells(cellGroup);
  return topmost[Math.floor((topmost.length - 1) / 2)];
}

function getTopMostCells(cellGroup) {
  return getOutliers(cellGroup, Math.min, 'y');
}

function getBottommostCells(cellGroup) {
  return getOutliers(cellGroup, Math.max, 'y');
}

function getRightmostCells(cellGroup) {
  return getOutliers(cellGroup, Math.max, 'x');
}

function getLeftmostCells(cellGroup) {
  return getOutliers(cellGroup, Math.min, 'x');
}

function getTopRightOutlier(cellGroup) {
  var topmost = getTopMostCells(cellGroup);
  var rightmost = getRightmostCells(cellGroup);
  var [topRight] = Object(_calc_utils__WEBPACK_IMPORTED_MODULE_0__["intersect"])(topmost, rightmost, coordsEqual);
  return topRight || topmost[0];
}

function getTopLeftOutlier(cellGroup) {
  var topmost = getTopMostCells(cellGroup);
  var leftmost = getLeftmostCells(cellGroup);
  var [topRight] = Object(_calc_utils__WEBPACK_IMPORTED_MODULE_0__["intersect"])(topmost, leftmost, coordsEqual);
  return topRight || topmost[0];
}

function coordsEqual(a, b) {
  return a.x === b.x && a.y === b.y;
}

function getOutliers(cellGroup, minmax, key) {
  var {
    cells
  } = cellGroup;
  var outlier = minmax(...cells.map(cell => cell[key]));
  return cells.filter(cell => cell[key] === outlier);
}

function gridToAscii(grid) {
  var ascii = '\n';
  grid.values.forEach((row, rowIndex) => {
    var horizontalLine = grid.lines.find(line => {
      return line.type === _models_line_type__WEBPACK_IMPORTED_MODULE_2__["LineType"].Horizontal && line.index === rowIndex;
    });

    if (horizontalLine) {
      ascii = ascii.concat('_'.repeat(grid.values[0].length).concat('\n'));
      return;
    }

    row.forEach((cell, columnIndex) => {
      ascii = ascii.concat(cell.content + ' ');
      var verticalLine = grid.lines.find(line => {
        return line.type === _models_line_type__WEBPACK_IMPORTED_MODULE_2__["LineType"].Vertical && line.index === columnIndex;
      });

      if (verticalLine) {
        ascii = ascii.concat('| ');
      }
    });
    ascii = ascii.concat('\n');
  });
  return ascii;
}

/***/ }),

/***/ "../../../libs/grid/src/lib/models/cell-coords.ts":
/*!************************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/grid/src/lib/models/cell-coords.ts ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "../../../libs/grid/src/lib/models/cell-group.ts":
/*!***********************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/grid/src/lib/models/cell-group.ts ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "../../../libs/grid/src/lib/models/cell-position.ts":
/*!**************************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/grid/src/lib/models/cell-position.ts ***!
  \**************************************************************************************/
/*! exports provided: CellPosition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CellPosition", function() { return CellPosition; });
var CellPosition;

(function (CellPosition) {
  CellPosition["TopLeft"] = "TopLeft";
  CellPosition["Top"] = "Top";
  CellPosition["TopRight"] = "TopRight";
  CellPosition["Right"] = "Right";
  CellPosition["BottomRight"] = "BottomRight";
  CellPosition["Bottom"] = "Bottom";
  CellPosition["BottomLeft"] = "BottomLeft";
  CellPosition["Left"] = "Left";
})(CellPosition || (CellPosition = {}));

/***/ }),

/***/ "../../../libs/grid/src/lib/models/floating-part-conversion-info.ts":
/*!******************************************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/grid/src/lib/models/floating-part-conversion-info.ts ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "../../../libs/grid/src/lib/models/grid-cell-config.ts":
/*!*****************************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/grid/src/lib/models/grid-cell-config.ts ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "../../../libs/grid/src/lib/models/grid-cell-display-preset.ts":
/*!*************************************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/grid/src/lib/models/grid-cell-display-preset.ts ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "../../../libs/grid/src/lib/models/grid-line.ts":
/*!**********************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/grid/src/lib/models/grid-line.ts ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "../../../libs/grid/src/lib/models/grid-lookup.ts":
/*!************************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/grid/src/lib/models/grid-lookup.ts ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "../../../libs/grid/src/lib/models/hover-operation-grid.ts":
/*!*********************************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/grid/src/lib/models/hover-operation-grid.ts ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "../../../libs/grid/src/lib/models/line-type.ts":
/*!**********************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/grid/src/lib/models/line-type.ts ***!
  \**********************************************************************************/
/*! exports provided: LineType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineType", function() { return LineType; });
var LineType;

(function (LineType) {
  LineType["Vertical"] = "Vertical";
  LineType["Horizontal"] = "Horizontal";
})(LineType || (LineType = {}));

/***/ }),

/***/ "../../../libs/grid/src/lib/models/row-conversion-operation.ts":
/*!*************************************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/grid/src/lib/models/row-conversion-operation.ts ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "../../../libs/ui/src/index.ts":
/*!*****************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/ui/src/index.ts ***!
  \*****************************************************************/
/*! exports provided: copyToClipboard, InputWithCopy, InputType, NumberSubscript, darkTheme, lightTheme, AppTheme, getTheme, availableThemes, GitlabIcon, TabPanel, a11yProps */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_core_functions_copy_to_clipboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/core/functions/copy-to-clipboard */ "../../../libs/ui/src/lib/core/functions/copy-to-clipboard.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "copyToClipboard", function() { return _lib_core_functions_copy_to_clipboard__WEBPACK_IMPORTED_MODULE_0__["copyToClipboard"]; });

/* harmony import */ var _lib_components_input_with_copy_input_with_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/components/input-with-copy/input-with-copy */ "../../../libs/ui/src/lib/components/input-with-copy/input-with-copy.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InputWithCopy", function() { return _lib_components_input_with_copy_input_with_copy__WEBPACK_IMPORTED_MODULE_1__["InputWithCopy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InputType", function() { return _lib_components_input_with_copy_input_with_copy__WEBPACK_IMPORTED_MODULE_1__["InputType"]; });

/* harmony import */ var _lib_components_number_subscript_number_subscript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/components/number-subscript/number-subscript */ "../../../libs/ui/src/lib/components/number-subscript/number-subscript.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NumberSubscript", function() { return _lib_components_number_subscript_number_subscript__WEBPACK_IMPORTED_MODULE_2__["NumberSubscript"]; });

/* harmony import */ var _lib_themes_dark__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/themes/dark */ "../../../libs/ui/src/lib/themes/dark.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "darkTheme", function() { return _lib_themes_dark__WEBPACK_IMPORTED_MODULE_3__["darkTheme"]; });

/* harmony import */ var _lib_themes_light__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/themes/light */ "../../../libs/ui/src/lib/themes/light.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "lightTheme", function() { return _lib_themes_light__WEBPACK_IMPORTED_MODULE_4__["lightTheme"]; });

/* harmony import */ var _lib_themes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/themes */ "../../../libs/ui/src/lib/themes/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppTheme", function() { return _lib_themes__WEBPACK_IMPORTED_MODULE_5__["AppTheme"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getTheme", function() { return _lib_themes__WEBPACK_IMPORTED_MODULE_5__["getTheme"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "availableThemes", function() { return _lib_themes__WEBPACK_IMPORTED_MODULE_5__["availableThemes"]; });

/* harmony import */ var _lib_components_gitlab_icon_gitlab_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/components/gitlab-icon/gitlab-icon */ "../../../libs/ui/src/lib/components/gitlab-icon/gitlab-icon.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GitlabIcon", function() { return _lib_components_gitlab_icon_gitlab_icon__WEBPACK_IMPORTED_MODULE_6__["GitlabIcon"]; });

/* harmony import */ var _lib_components_tab_panel_tab_panel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/components/tab-panel/tab-panel */ "../../../libs/ui/src/lib/components/tab-panel/tab-panel.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TabPanel", function() { return _lib_components_tab_panel_tab_panel__WEBPACK_IMPORTED_MODULE_7__["TabPanel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a11yProps", function() { return _lib_components_tab_panel_tab_panel__WEBPACK_IMPORTED_MODULE_7__["a11yProps"]; });










/***/ }),

/***/ "../../../libs/ui/src/lib/components/gitlab-icon/gitlab-icon.tsx":
/*!***************************************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/ui/src/lib/components/gitlab-icon/gitlab-icon.tsx ***!
  \***************************************************************************************************/
/*! exports provided: GitlabIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GitlabIcon", function() { return GitlabIcon; });
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core */ "../../../node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var GitlabIcon = props => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["SvgIcon"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("path", {
    d: "M21.94 13.11l-1.05-3.22c0-.03-.01-.06-.02-.09l-2.11-6.48a.859.859 0 0 0-.8-.57c-.36 0-.68.25-.79.58l-2 6.17H8.84L6.83 3.33a.851.851 0 0 0-.79-.58c-.37 0-.69.25-.8.58L3.13 9.82v.01l-1.07 3.28c-.16.5.01 1.04.44 1.34l9.22 6.71c.17.12.39.12.56-.01l9.22-6.7c.43-.3.6-.84.44-1.34M8.15 10.45l2.57 7.91l-6.17-7.91m8.73 7.92l2.47-7.59l.1-.33h3.61l-5.59 7.16m4.1-13.67l1.81 5.56h-3.62m-1.3.95l-1.79 5.51L12 19.24l-2.86-8.79M6.03 3.94L7.84 9.5H4.23m-1.18 4.19c-.09-.07-.13-.19-.09-.29l.79-2.43l5.82 7.45m11.38-4.73l-6.51 4.73l.02-.03l5.79-7.42l.79 2.43c.04.1 0 .22-.09.29"
  }));
};

/***/ }),

/***/ "../../../libs/ui/src/lib/components/input-with-copy/input-with-copy.tsx":
/*!***********************************************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/ui/src/lib/components/input-with-copy/input-with-copy.tsx ***!
  \***********************************************************************************************************/
/*! exports provided: InputType, InputWithCopy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputType", function() { return InputType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputWithCopy", function() { return InputWithCopy; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "../../../node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _material_ui_icons_FileCopy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/icons/FileCopy */ "../../../node_modules/@material-ui/icons/FileCopy.js");
/* harmony import */ var _material_ui_icons_FileCopy__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_FileCopy__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_lab_Alert__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/lab/Alert */ "../../../node_modules/@material-ui/lab/esm/Alert/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/styles */ "../../../node_modules/@material-ui/core/esm/styles/index.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var InputType;

(function (InputType) {
  InputType["Text"] = "text";
  InputType["Number"] = "number";
})(InputType || (InputType = {}));

function Alert(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_lab_Alert__WEBPACK_IMPORTED_MODULE_4__["default"], Object.assign({
    elevation: 6,
    variant: "filled"
  }, props));
}

var useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__["makeStyles"])(theme => {
  return Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["createStyles"])({
    row: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap'
    }
  });
});
var InputWithCopy = (_ref) => {
  var {
    onValueChange,
    onChange,
    style,
    className,
    value,
    id,
    name,
    size,
    error,
    helperText,
    label,
    inputType,
    readOnly
  } = _ref;
  var textAreaRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  var {
    t
  } = Object(react_i18next__WEBPACK_IMPORTED_MODULE_1__["useTranslation"])();
  var [open, setOpen] = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(false);
  var classes = useStyles();

  var handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  var copyToClipboard = () => {
    if (textAreaRef.current) {
      textAreaRef.current.select();
      document.execCommand('copy');
      setOpen(true);
    }
  };

  var handleChange = event => {
    if (onValueChange) {
      var _value = event.target.value;
      onValueChange(_value);
    }

    if (onChange) onChange(event);
  };

  var handleNumberChange = value => {
    if (onValueChange) {
      onValueChange(value);
    }
  };

  var props = {
    error,
    id,
    name,
    helperText,
    style: _objectSpread(_objectSpread({}, style), {}, {
      flexGrow: 1
    }),
    inputProps: {
      'aria-readonly': readOnly
    },
    variant: 'outlined',
    inputRef: textAreaRef,
    label,
    value: value,
    onChange: inputType === InputType.Number ? handleNumberChange : handleChange
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: className
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: classes.row
  }, inputType === InputType.Number ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TextField"], Object.assign({
    type: 'number'
  }, props)) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TextField"], props), document.queryCommandSupported('copy') && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: {
      paddingLeft: '5px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["IconButton"], {
    onClick: copyToClipboard
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_FileCopy__WEBPACK_IMPORTED_MODULE_3___default.a, null)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Snackbar"], {
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'right'
    },
    open: open,
    autoHideDuration: 2000,
    onClose: handleClose
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Alert, {
    severity: "info"
  }, t('common.copy'))));
};

/***/ }),

/***/ "../../../libs/ui/src/lib/components/number-subscript/number-subscript.tsx":
/*!*************************************************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/ui/src/lib/components/number-subscript/number-subscript.tsx ***!
  \*************************************************************************************************************/
/*! exports provided: NumberSubscript */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NumberSubscript", function() { return NumberSubscript; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var NumberSubscript = (_ref) => {
  var {
    value,
    subscript,
    noBraces
  } = _ref;

  if (noBraces) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, value, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("sub", null, subscript));
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, value, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("sub", null, "(", subscript, ")"));
};

/***/ }),

/***/ "../../../libs/ui/src/lib/components/tab-panel/tab-panel.tsx":
/*!***********************************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/ui/src/lib/components/tab-panel/tab-panel.tsx ***!
  \***********************************************************************************************/
/*! exports provided: a11yProps, TabPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a11yProps", function() { return a11yProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabPanel", function() { return TabPanel; });
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core */ "../../../node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }



function a11yProps(index) {
  return {
    id: "simple-tab-".concat(index),
    'aria-controls': "simple-tabpanel-".concat(index)
  };
}
var TabPanel = (_ref) => {
  var {
    children,
    value,
    index
  } = _ref,
      other = _objectWithoutProperties(_ref, ["children", "value", "index"]);

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", Object.assign({
    role: "tabpanel",
    hidden: value !== index,
    id: "simple-tabpanel-".concat(index),
    "aria-labelledby": "simple-tab-".concat(index)
  }, other), value === index && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["Box"], null, children));
};

/***/ }),

/***/ "../../../libs/ui/src/lib/core/functions/copy-to-clipboard.ts":
/*!************************************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/ui/src/lib/core/functions/copy-to-clipboard.ts ***!
  \************************************************************************************************/
/*! exports provided: copyToClipboard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copyToClipboard", function() { return copyToClipboard; });
function copyToClipboard(text) {
  var textarea = document.createElement('textarea');
  document.body.appendChild(textarea);
  textarea.value = text;
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

/***/ }),

/***/ "../../../libs/ui/src/lib/themes/dark.ts":
/*!***************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/ui/src/lib/themes/dark.ts ***!
  \***************************************************************************/
/*! exports provided: darkTheme */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "darkTheme", function() { return darkTheme; });
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core */ "../../../node_modules/@material-ui/core/esm/index.js");

var darkTheme = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["createMuiTheme"])({
  palette: {
    type: 'dark',
    primary: {
      main: '#333'
    }
  }
});

/***/ }),

/***/ "../../../libs/ui/src/lib/themes/index.ts":
/*!****************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/ui/src/lib/themes/index.ts ***!
  \****************************************************************************/
/*! exports provided: AppTheme, availableThemes, getTheme */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppTheme", function() { return AppTheme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "availableThemes", function() { return availableThemes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTheme", function() { return getTheme; });
/* harmony import */ var _dark__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dark */ "../../../libs/ui/src/lib/themes/dark.ts");
/* harmony import */ var _light__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./light */ "../../../libs/ui/src/lib/themes/light.ts");


var AppTheme;

(function (AppTheme) {
  AppTheme["Light"] = "light";
  AppTheme["Dark"] = "dark";
})(AppTheme || (AppTheme = {}));

var availableThemes = {
  [AppTheme.Dark]: _dark__WEBPACK_IMPORTED_MODULE_0__["darkTheme"],
  [AppTheme.Light]: _light__WEBPACK_IMPORTED_MODULE_1__["lightTheme"]
};
function getTheme(theme) {
  return availableThemes[theme];
}

/***/ }),

/***/ "../../../libs/ui/src/lib/themes/light.ts":
/*!****************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/ui/src/lib/themes/light.ts ***!
  \****************************************************************************/
/*! exports provided: lightTheme */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lightTheme", function() { return lightTheme; });
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core */ "../../../node_modules/@material-ui/core/esm/index.js");

var lightTheme = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["createMuiTheme"])({
  palette: {
    type: 'light',
    primary: {
      main: '#1976d2',
      light: '#1976d2'
    }
  }
});

/***/ }),

/***/ "../../../libs/utils/src/index.ts":
/*!********************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/utils/src/index.ts ***!
  \********************************************************************/
/*! exports provided: chunks, chunksFromEnd, walk, logBase, trimEndByPredicate, trimStartByPredicate, range, intersect, replaceAll, clean */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_chunks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/chunks */ "../../../libs/utils/src/lib/chunks.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "chunks", function() { return _lib_chunks__WEBPACK_IMPORTED_MODULE_0__["chunks"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "chunksFromEnd", function() { return _lib_chunks__WEBPACK_IMPORTED_MODULE_0__["chunksFromEnd"]; });

/* harmony import */ var _lib_walk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/walk */ "../../../libs/utils/src/lib/walk.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "walk", function() { return _lib_walk__WEBPACK_IMPORTED_MODULE_1__["walk"]; });

/* harmony import */ var _lib_log__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/log */ "../../../libs/utils/src/lib/log.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "logBase", function() { return _lib_log__WEBPACK_IMPORTED_MODULE_2__["logBase"]; });

/* harmony import */ var _lib_trim__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/trim */ "../../../libs/utils/src/lib/trim.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "trimEndByPredicate", function() { return _lib_trim__WEBPACK_IMPORTED_MODULE_3__["trimEndByPredicate"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "trimStartByPredicate", function() { return _lib_trim__WEBPACK_IMPORTED_MODULE_3__["trimStartByPredicate"]; });

/* harmony import */ var _lib_range__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/range */ "../../../libs/utils/src/lib/range.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "range", function() { return _lib_range__WEBPACK_IMPORTED_MODULE_4__["range"]; });

/* harmony import */ var _lib_intersect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/intersect */ "../../../libs/utils/src/lib/intersect.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "intersect", function() { return _lib_intersect__WEBPACK_IMPORTED_MODULE_5__["intersect"]; });

/* harmony import */ var _lib_replace_all__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/replace-all */ "../../../libs/utils/src/lib/replace-all.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "replaceAll", function() { return _lib_replace_all__WEBPACK_IMPORTED_MODULE_6__["replaceAll"]; });

/* harmony import */ var _lib_clean__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/clean */ "../../../libs/utils/src/lib/clean.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clean", function() { return _lib_clean__WEBPACK_IMPORTED_MODULE_7__["clean"]; });










/***/ }),

/***/ "../../../libs/utils/src/lib/chunks.ts":
/*!*************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/utils/src/lib/chunks.ts ***!
  \*************************************************************************/
/*! exports provided: chunks, chunksFromEnd */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "chunks", function() { return chunks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "chunksFromEnd", function() { return chunksFromEnd; });
function chunks(array, chunkSize) {
  return array.reduce((resultArray, item, index) => {
    var chunkIndex = Math.floor(index / chunkSize);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }

    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);
}
function chunksFromEnd(array, chunkSize) {
  var remainder = array.length % chunkSize;
  return remainder ? [array.slice(0, remainder), ...chunks(array.slice(remainder), chunkSize)] : chunks(array, chunkSize);
}

/***/ }),

/***/ "../../../libs/utils/src/lib/clean.ts":
/*!************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/utils/src/lib/clean.ts ***!
  \************************************************************************/
/*! exports provided: clean */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clean", function() { return clean; });
function clean(obj) {
  return Object.entries(obj).reduce((a, _ref) => {
    var [k, v] = _ref;
    return v == null ? a : (a[k] = v, a);
  }, {});
}

/***/ }),

/***/ "../../../libs/utils/src/lib/intersect.ts":
/*!****************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/utils/src/lib/intersect.ts ***!
  \****************************************************************************/
/*! exports provided: intersect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "intersect", function() { return intersect; });
function intersect(a, b, comparer) {
  return a.filter(n => b.some(n2 => comparer(n, n2)));
}

/***/ }),

/***/ "../../../libs/utils/src/lib/log.ts":
/*!**********************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/utils/src/lib/log.ts ***!
  \**********************************************************************/
/*! exports provided: logBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logBase", function() { return logBase; });
function logBase(n, base) {
  return Math.log(n) / Math.log(base);
}

/***/ }),

/***/ "../../../libs/utils/src/lib/range.ts":
/*!************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/utils/src/lib/range.ts ***!
  \************************************************************************/
/*! exports provided: range */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "range", function() { return range; });
function range(start, end) {
  if (start === end) return [];
  return Array.from({
    length: end - start + 1
  }, (_, i) => i);
}

/***/ }),

/***/ "../../../libs/utils/src/lib/replace-all.ts":
/*!******************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/utils/src/lib/replace-all.ts ***!
  \******************************************************************************/
/*! exports provided: replaceAll */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "replaceAll", function() { return replaceAll; });
/**
 * Replaces all the occurrences of toReplace with replacement
 * @param str
 * @param toReplace
 * @param replacement
 */
function replaceAll(str, toReplace, replacement) {
  return str.replace(new RegExp(toReplace, 'g'), replacement);
}

/***/ }),

/***/ "../../../libs/utils/src/lib/trim.ts":
/*!***********************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/utils/src/lib/trim.ts ***!
  \***********************************************************************/
/*! exports provided: trimEndByPredicate, trimStartByPredicate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trimEndByPredicate", function() { return trimEndByPredicate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trimStartByPredicate", function() { return trimStartByPredicate; });
function trimEndByPredicate(array, predicate) {
  if (!array.length) return array;
  var lastFromRightMatching = -1;

  for (var i = array.length - 1; i >= 0; i--) {
    if (predicate(array[i])) lastFromRightMatching = i;else break;
  }

  return lastFromRightMatching === -1 ? array : array.slice(0, lastFromRightMatching);
}
function trimStartByPredicate(array, predicate) {
  if (!array.length) return array;
  var lastFromLeftMatching = -1;

  for (var i = 0; i <= array.length - 1; i++) {
    if (predicate(array[i])) lastFromLeftMatching = i;else break;
  }

  return lastFromLeftMatching === -1 ? array : array.slice(lastFromLeftMatching + 1);
}

/***/ }),

/***/ "../../../libs/utils/src/lib/walk.ts":
/*!***********************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/utils/src/lib/walk.ts ***!
  \***********************************************************************/
/*! exports provided: walk */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "walk", function() { return walk; });
function walk(arr, n, callback) {
  for (var i = 0; i < arr.length; i += n) {
    callback(arr.slice(i, i + n), i, arr);
  }
}

/***/ }),

/***/ "../../../node_modules/postcss-loader/src/index.js?!../../../node_modules/sass-loader/dist/cjs.js?!./app/app.scss":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/node_modules/postcss-loader/src??embedded!C:/Users/Jakub/WebstormProjects/calc/node_modules/sass-loader/dist/cjs.js??ref--5-oneOf-3-2!./app/app.scss ***!
  \*************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*\n * Remove template code below\n */\n.app {\n  font-family: sans-serif;\n  min-width: 300px;\n  max-width: 1200px;\n  margin: 50px auto;\n}\n.app .gutter-left {\n  margin-left: 9px;\n}\n.app .col-span-2 {\n  grid-column: span 2;\n}\n.app .flex {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.app main {\n  padding: 0 36px;\n}\n.app p {\n  text-align: center;\n}\n.app h1 {\n  text-align: center;\n  margin-left: 18px;\n  font-size: 24px;\n}\n.app h2 {\n  text-align: center;\n  font-size: 20px;\n  margin: 40px 0 10px 0;\n}\n.app .resources {\n  text-align: center;\n  list-style: none;\n  padding: 0;\n  display: grid;\n  grid-gap: 9px;\n  grid-template-columns: 1fr 1fr;\n}\n.app .resource {\n  color: #0094ba;\n  height: 36px;\n  background-color: rgba(0, 0, 0, 0);\n  border: 1px solid rgba(0, 0, 0, 0.12);\n  border-radius: 4px;\n  padding: 3px 9px;\n  text-decoration: none;\n}\n.app .resource:hover {\n  background-color: rgba(68, 138, 255, 0.04);\n}\n.app pre {\n  padding: 9px;\n  border-radius: 4px;\n  background-color: black;\n  color: #eee;\n}\n.app details {\n  border-radius: 4px;\n  color: #333;\n  background-color: rgba(0, 0, 0, 0);\n  border: 1px solid rgba(0, 0, 0, 0.12);\n  padding: 3px 9px;\n  margin-bottom: 9px;\n}\n.app summary {\n  outline: none;\n  height: 36px;\n  line-height: 36px;\n}\n.app .github-star-container {\n  margin-top: 12px;\n  line-height: 20px;\n}\n.app .github-star-container a {\n  display: flex;\n  align-items: center;\n  text-decoration: none;\n  color: #333;\n}\n.app .github-star-badge {\n  color: #24292e;\n  display: flex;\n  align-items: center;\n  font-size: 12px;\n  padding: 3px 10px;\n  border: 1px solid rgba(27, 31, 35, 0.2);\n  border-radius: 3px;\n  background-image: linear-gradient(-180deg, #fafbfc, #eff3f6 90%);\n  margin-left: 4px;\n  font-weight: 600;\n}\n.app .github-star-badge:hover {\n  background-image: linear-gradient(-180deg, #f0f3f6, #e6ebf1 90%);\n  border-color: rgba(27, 31, 35, 0.35);\n  background-position: -0.5em;\n}\n.app .github-star-badge .material-icons {\n  height: 16px;\n  width: 16px;\n  margin-right: 4px;\n}\n.logo {\n  height: 32px;\n  background: rgba(255, 255, 255, 0.2);\n  margin: 14px;\n}\n.site-layout {\n  height: 100vh;\n}\n.site-header {\n  position: fixed;\n  z-index: 1;\n  width: calc(100% - 100px);\n  background: unset;\n  display: flex;\n  flex-direction: row-reverse;\n  height: 20px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcHMvY2FsYy13ZWIvc3JjL2FwcC9DOlxcVXNlcnNcXEpha3ViXFxXZWJzdG9ybVByb2plY3RzXFxjYWxjL2FwcHNcXGNhbGMtd2ViXFxzcmNcXGFwcFxcYXBwLnNjc3MiLCJhcHBzL2NhbGMtd2ViL3NyYy9hcHAvYXBwLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0VBQUE7QUFJQTtFQUNFLHVCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLGlCQUFBO0FDQUY7QURHQTtFQUNFLGdCQUFBO0FDQUY7QURHQTtFQUNFLG1CQUFBO0FDQUY7QURHQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0FDQUY7QURHQTtFQUNFLGVBQUE7QUNBRjtBREdBO0VBQ0Usa0JBQUE7QUNBRjtBREdBO0VBQ0Usa0JBQUE7RUFDQSxpQkFBQTtFQUNBLGVBQUE7QUNBRjtBREdBO0VBQ0Usa0JBQUE7RUFDQSxlQUFBO0VBQ0EscUJBQUE7QUNBRjtBREdBO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtFQUNBLFVBQUE7RUFDQSxhQUFBO0VBQ0EsYUFBQTtFQUNBLDhCQUFBO0FDQUY7QURHQTtFQUNFLGNBQUE7RUFDQSxZQUFBO0VBQ0Esa0NBQUE7RUFDQSxxQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxxQkFBQTtBQ0FGO0FER0E7RUFDRSwwQ0FBQTtBQ0FGO0FER0E7RUFDRSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSx1QkFBQTtFQUNBLFdBQUE7QUNBRjtBREdBO0VBQ0Usa0JBQUE7RUFDQSxXQUFBO0VBQ0Esa0NBQUE7RUFDQSxxQ0FBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUNBRjtBREdBO0VBQ0UsYUFBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtBQ0FGO0FER0E7RUFDRSxnQkFBQTtFQUNBLGlCQUFBO0FDQUY7QURHQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHFCQUFBO0VBQ0EsV0FBQTtBQ0FGO0FER0E7RUFDRSxjQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsdUNBQUE7RUFDQSxrQkFBQTtFQUNBLGdFQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtBQ0FGO0FER0E7RUFDRSxnRUFBQTtFQUNBLG9DQUFBO0VBQ0EsMkJBQUE7QUNBRjtBREVBO0VBQ0UsWUFBQTtFQUNBLFdBQUE7RUFDQSxpQkFBQTtBQ0NGO0FERUE7RUFDSSxZQUFBO0VBQ0Esb0NBQUE7RUFDQSxZQUFBO0FDQ0o7QURFQTtFQUNJLGFBQUE7QUNDSjtBREVBO0VBQ0ksZUFBQTtFQUNBLFVBQUE7RUFDQSx5QkFBQTtFQUNBLGlCQUFBO0VBQ0EsYUFBQTtFQUNBLDJCQUFBO0VBQ0EsWUFBQTtBQ0NKIiwiZmlsZSI6ImFwcHMvY2FsYy13ZWIvc3JjL2FwcC9hcHAuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIFJlbW92ZSB0ZW1wbGF0ZSBjb2RlIGJlbG93XHJcbiAqL1xyXG5cclxuLmFwcCB7XHJcbiAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XHJcbiAgbWluLXdpZHRoOiAzMDBweDtcclxuICBtYXgtd2lkdGg6IDEyMDBweDtcclxuICBtYXJnaW46IDUwcHggYXV0bztcclxufVxyXG5cclxuLmFwcCAuZ3V0dGVyLWxlZnQge1xyXG4gIG1hcmdpbi1sZWZ0OiA5cHg7XHJcbn1cclxuXHJcbi5hcHAgLmNvbC1zcGFuLTIge1xyXG4gIGdyaWQtY29sdW1uOiBzcGFuIDI7XHJcbn1cclxuXHJcbi5hcHAgLmZsZXgge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG5cclxuLmFwcCBtYWluIHtcclxuICBwYWRkaW5nOiAwIDM2cHg7XHJcbn1cclxuXHJcbi5hcHAgcCB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4uYXBwIGgxIHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgbWFyZ2luLWxlZnQ6IDE4cHg7XHJcbiAgZm9udC1zaXplOiAyNHB4O1xyXG59XHJcblxyXG4uYXBwIGgyIHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgZm9udC1zaXplOiAyMHB4O1xyXG4gIG1hcmdpbjogNDBweCAwIDEwcHggMDtcclxufVxyXG5cclxuLmFwcCAucmVzb3VyY2VzIHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgbGlzdC1zdHlsZTogbm9uZTtcclxuICBwYWRkaW5nOiAwO1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgZ3JpZC1nYXA6IDlweDtcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XHJcbn1cclxuXHJcbi5hcHAgLnJlc291cmNlIHtcclxuICBjb2xvcjogIzAwOTRiYTtcclxuICBoZWlnaHQ6IDM2cHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTtcclxuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xyXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICBwYWRkaW5nOiAzcHggOXB4O1xyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxufVxyXG5cclxuLmFwcCAucmVzb3VyY2U6aG92ZXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNjgsIDEzOCwgMjU1LCAwLjA0KTtcclxufVxyXG5cclxuLmFwcCBwcmUge1xyXG4gIHBhZGRpbmc6IDlweDtcclxuICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XHJcbiAgY29sb3I6ICNlZWU7XHJcbn1cclxuXHJcbi5hcHAgZGV0YWlscyB7XHJcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gIGNvbG9yOiAjMzMzO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMCk7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjEyKTtcclxuICBwYWRkaW5nOiAzcHggOXB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDlweDtcclxufVxyXG5cclxuLmFwcCBzdW1tYXJ5IHtcclxuICBvdXRsaW5lOiBub25lO1xyXG4gIGhlaWdodDogMzZweDtcclxuICBsaW5lLWhlaWdodDogMzZweDtcclxufVxyXG5cclxuLmFwcCAuZ2l0aHViLXN0YXItY29udGFpbmVyIHtcclxuICBtYXJnaW4tdG9wOiAxMnB4O1xyXG4gIGxpbmUtaGVpZ2h0OiAyMHB4O1xyXG59XHJcblxyXG4uYXBwIC5naXRodWItc3Rhci1jb250YWluZXIgYSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICBjb2xvcjogIzMzMztcclxufVxyXG5cclxuLmFwcCAuZ2l0aHViLXN0YXItYmFkZ2Uge1xyXG4gIGNvbG9yOiAjMjQyOTJlO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBmb250LXNpemU6IDEycHg7XHJcbiAgcGFkZGluZzogM3B4IDEwcHg7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNywgMzEsIDM1LCAwLjIpO1xyXG4gIGJvcmRlci1yYWRpdXM6IDNweDtcclxuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoLTE4MGRlZywgI2ZhZmJmYywgI2VmZjNmNiA5MCUpO1xyXG4gIG1hcmdpbi1sZWZ0OiA0cHg7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxufVxyXG5cclxuLmFwcCAuZ2l0aHViLXN0YXItYmFkZ2U6aG92ZXIge1xyXG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCgtMTgwZGVnLCAjZjBmM2Y2LCAjZTZlYmYxIDkwJSk7XHJcbiAgYm9yZGVyLWNvbG9yOiByZ2JhKDI3LCAzMSwgMzUsIDAuMzUpO1xyXG4gIGJhY2tncm91bmQtcG9zaXRpb246IC0wLjVlbTtcclxufVxyXG4uYXBwIC5naXRodWItc3Rhci1iYWRnZSAubWF0ZXJpYWwtaWNvbnMge1xyXG4gIGhlaWdodDogMTZweDtcclxuICB3aWR0aDogMTZweDtcclxuICBtYXJnaW4tcmlnaHQ6IDRweDtcclxufVxyXG5cclxuLmxvZ28ge1xyXG4gICAgaGVpZ2h0OiAzMnB4O1xyXG4gICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpO1xyXG4gICAgbWFyZ2luOiAxNHB4O1xyXG59XHJcblxyXG4uc2l0ZS1sYXlvdXQge1xyXG4gICAgaGVpZ2h0OiAxMDB2aDtcclxufVxyXG5cclxuLnNpdGUtaGVhZGVyIHtcclxuICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgIHotaW5kZXg6IDE7XHJcbiAgICB3aWR0aDogY2FsYygxMDAlIC0gMTAwcHgpO1xyXG4gICAgYmFja2dyb3VuZDogdW5zZXQ7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdy1yZXZlcnNlO1xyXG4gICAgaGVpZ2h0OiAyMHB4XHJcbn1cclxuIiwiLypcbiAqIFJlbW92ZSB0ZW1wbGF0ZSBjb2RlIGJlbG93XG4gKi9cbi5hcHAge1xuICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcbiAgbWluLXdpZHRoOiAzMDBweDtcbiAgbWF4LXdpZHRoOiAxMjAwcHg7XG4gIG1hcmdpbjogNTBweCBhdXRvO1xufVxuXG4uYXBwIC5ndXR0ZXItbGVmdCB7XG4gIG1hcmdpbi1sZWZ0OiA5cHg7XG59XG5cbi5hcHAgLmNvbC1zcGFuLTIge1xuICBncmlkLWNvbHVtbjogc3BhbiAyO1xufVxuXG4uYXBwIC5mbGV4IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbi5hcHAgbWFpbiB7XG4gIHBhZGRpbmc6IDAgMzZweDtcbn1cblxuLmFwcCBwIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uYXBwIGgxIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBtYXJnaW4tbGVmdDogMThweDtcbiAgZm9udC1zaXplOiAyNHB4O1xufVxuXG4uYXBwIGgyIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmb250LXNpemU6IDIwcHg7XG4gIG1hcmdpbjogNDBweCAwIDEwcHggMDtcbn1cblxuLmFwcCAucmVzb3VyY2VzIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBwYWRkaW5nOiAwO1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLWdhcDogOXB4O1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XG59XG5cbi5hcHAgLnJlc291cmNlIHtcbiAgY29sb3I6ICMwMDk0YmE7XG4gIGhlaWdodDogMzZweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTtcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjEyKTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBwYWRkaW5nOiAzcHggOXB4O1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG59XG5cbi5hcHAgLnJlc291cmNlOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg2OCwgMTM4LCAyNTUsIDAuMDQpO1xufVxuXG4uYXBwIHByZSB7XG4gIHBhZGRpbmc6IDlweDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcbiAgY29sb3I6ICNlZWU7XG59XG5cbi5hcHAgZGV0YWlscyB7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgY29sb3I6ICMzMzM7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMCk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4xMik7XG4gIHBhZGRpbmc6IDNweCA5cHg7XG4gIG1hcmdpbi1ib3R0b206IDlweDtcbn1cblxuLmFwcCBzdW1tYXJ5IHtcbiAgb3V0bGluZTogbm9uZTtcbiAgaGVpZ2h0OiAzNnB4O1xuICBsaW5lLWhlaWdodDogMzZweDtcbn1cblxuLmFwcCAuZ2l0aHViLXN0YXItY29udGFpbmVyIHtcbiAgbWFyZ2luLXRvcDogMTJweDtcbiAgbGluZS1oZWlnaHQ6IDIwcHg7XG59XG5cbi5hcHAgLmdpdGh1Yi1zdGFyLWNvbnRhaW5lciBhIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBjb2xvcjogIzMzMztcbn1cblxuLmFwcCAuZ2l0aHViLXN0YXItYmFkZ2Uge1xuICBjb2xvcjogIzI0MjkyZTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBwYWRkaW5nOiAzcHggMTBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNywgMzEsIDM1LCAwLjIpO1xuICBib3JkZXItcmFkaXVzOiAzcHg7XG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCgtMTgwZGVnLCAjZmFmYmZjLCAjZWZmM2Y2IDkwJSk7XG4gIG1hcmdpbi1sZWZ0OiA0cHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbi5hcHAgLmdpdGh1Yi1zdGFyLWJhZGdlOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KC0xODBkZWcsICNmMGYzZjYsICNlNmViZjEgOTAlKTtcbiAgYm9yZGVyLWNvbG9yOiByZ2JhKDI3LCAzMSwgMzUsIDAuMzUpO1xuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAtMC41ZW07XG59XG5cbi5hcHAgLmdpdGh1Yi1zdGFyLWJhZGdlIC5tYXRlcmlhbC1pY29ucyB7XG4gIGhlaWdodDogMTZweDtcbiAgd2lkdGg6IDE2cHg7XG4gIG1hcmdpbi1yaWdodDogNHB4O1xufVxuXG4ubG9nbyB7XG4gIGhlaWdodDogMzJweDtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpO1xuICBtYXJnaW46IDE0cHg7XG59XG5cbi5zaXRlLWxheW91dCB7XG4gIGhlaWdodDogMTAwdmg7XG59XG5cbi5zaXRlLWhlYWRlciB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgei1pbmRleDogMTtcbiAgd2lkdGg6IGNhbGMoMTAwJSAtIDEwMHB4KTtcbiAgYmFja2dyb3VuZDogdW5zZXQ7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3ctcmV2ZXJzZTtcbiAgaGVpZ2h0OiAyMHB4O1xufSJdfQ== */"

/***/ }),

/***/ "../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!***************************************************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stylesInDom = {};

var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

function listToStyles(list, options) {
  var styles = [];
  var newStyles = {};

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var css = item[1];
    var media = item[2];
    var sourceMap = item[3];
    var part = {
      css: css,
      media: media,
      sourceMap: sourceMap
    };

    if (!newStyles[id]) {
      styles.push(newStyles[id] = {
        id: id,
        parts: [part]
      });
    } else {
      newStyles[id].parts.push(part);
    }
  }

  return styles;
}

function addStylesToDom(styles, options) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i];
    var domStyle = stylesInDom[item.id];
    var j = 0;

    if (domStyle) {
      domStyle.refs++;

      for (; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j]);
      }

      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j], options));
      }
    } else {
      var parts = [];

      for (; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j], options));
      }

      stylesInDom[item.id] = {
        id: item.id,
        refs: 1,
        parts: parts
      };
    }
  }
}

function insertStyleElement(options) {
  var style = document.createElement('style');

  if (typeof options.attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      options.attributes.nonce = nonce;
    }
  }

  Object.keys(options.attributes).forEach(function (key) {
    style.setAttribute(key, options.attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {};
  options.attributes = typeof options.attributes === 'object' ? options.attributes : {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  var styles = listToStyles(list, options);
  addStylesToDom(styles, options);
  return function update(newList) {
    var mayRemove = [];

    for (var i = 0; i < styles.length; i++) {
      var item = styles[i];
      var domStyle = stylesInDom[item.id];

      if (domStyle) {
        domStyle.refs--;
        mayRemove.push(domStyle);
      }
    }

    if (newList) {
      var newStyles = listToStyles(newList, options);
      addStylesToDom(newStyles, options);
    }

    for (var _i = 0; _i < mayRemove.length; _i++) {
      var _domStyle = mayRemove[_i];

      if (_domStyle.refs === 0) {
        for (var j = 0; j < _domStyle.parts.length; j++) {
          _domStyle.parts[j]();
        }

        delete stylesInDom[_domStyle.id];
      }
    }
  };
};

/***/ }),

/***/ "./app/app.scss":
/*!**********************!*\
  !*** ./app/app.scss ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../node_modules/postcss-loader/src??embedded!../../../../node_modules/sass-loader/dist/cjs.js??ref--5-oneOf-3-2!./app.scss */ "../../../node_modules/postcss-loader/src/index.js?!../../../node_modules/sass-loader/dist/cjs.js?!./app/app.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}


/***/ }),

/***/ "./app/app.tsx":
/*!*********************!*\
  !*** ./app/app.tsx ***!
  \*********************/
/*! exports provided: App, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "App", function() { return App; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "../../../node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "../../../node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _components_home_view_home_view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/home-view/home-view */ "./app/components/home-view/home-view.tsx");
/* harmony import */ var _app_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.scss */ "./app/app.scss");
/* harmony import */ var _app_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_app_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _assets_i18n_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../assets/i18n/i18n */ "./assets/i18n/i18n.ts");
/* harmony import */ var _components_sider_menu_sider_menu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/sider-menu/sider-menu */ "./app/components/sider-menu/sider-menu.tsx");
/* harmony import */ var _components_complement_converter_view_complement_converter_view__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/complement-converter-view/complement-converter-view */ "./app/components/complement-converter-view/complement-converter-view.tsx");
/* harmony import */ var _components_float_converter_view_float_converter_view__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/float-converter-view/float-converter-view */ "./app/components/float-converter-view/float-converter-view.tsx");
/* harmony import */ var _components_positional_calculator_positional_calculator_view__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/positional-calculator/positional-calculator-view */ "./app/components/positional-calculator/positional-calculator-view.tsx");
/* harmony import */ var _components_associated_base_converter_view_associated_base_converter_view__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/associated-base-converter-view/associated-base-converter-view */ "./app/components/associated-base-converter-view/associated-base-converter-view.tsx");
/* harmony import */ var _components_language_menu_language_menu__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/language-menu/language-menu */ "./app/components/language-menu/language-menu.tsx");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core */ "../../../node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _calc_ui__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @calc/ui */ "../../../libs/ui/src/index.ts");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-redux */ "../../../node_modules/react-redux/es/index.js");
/* harmony import */ var _store_selectors_options_selectors__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./store/selectors/options.selectors */ "./app/store/selectors/options.selectors.ts");
/* harmony import */ var _components_theme_menu_theme_menu__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/theme-menu/theme-menu */ "./app/components/theme-menu/theme-menu.tsx");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @material-ui/core/styles */ "../../../node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @material-ui/icons/Menu */ "../../../node_modules/@material-ui/icons/Menu.js");
/* harmony import */ var _material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _material_ui_icons_ChevronLeft__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @material-ui/icons/ChevronLeft */ "../../../node_modules/@material-ui/icons/ChevronLeft.js");
/* harmony import */ var _material_ui_icons_ChevronLeft__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_ChevronLeft__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _components_repo_link_repo_link__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./components/repo-link/repo-link */ "./app/components/repo-link/repo-link.tsx");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }























var bconv = Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => __webpack_require__.e(/*! import() | components-base-converter-view-base-converter-view */ "components-base-converter-view-base-converter-view").then(__webpack_require__.bind(null, /*! ./components/base-converter-view/base-converter-view */ "./app/components/base-converter-view/base-converter-view.tsx")));
var drawerWidth = 240;
var useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_17__["makeStyles"])(theme => Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_12__["createStyles"])({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: "calc(100% - ".concat(drawerWidth, "px)"),
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: _objectSpread(_objectSpread({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1)
  }, theme.mixins.toolbar), {}, {
    justifyContent: 'flex-end'
  }),
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));
var App = () => {
  var theme = Object(react_redux__WEBPACK_IMPORTED_MODULE_14__["useSelector"])(_store_selectors_options_selectors__WEBPACK_IMPORTED_MODULE_15__["selectAppTheme"]);
  var classes = useStyles();
  var {
    t
  } = Object(react_i18next__WEBPACK_IMPORTED_MODULE_20__["useTranslation"])();
  var [open, setOpen] = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(false);

  var handleDrawerOpen = () => {
    setOpen(true);
  };

  var handleDrawerClose = () => {
    setOpen(false);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_12__["ThemeProvider"], {
    theme: Object(_calc_ui__WEBPACK_IMPORTED_MODULE_13__["getTheme"])(theme)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_12__["CssBaseline"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["BrowserRouter"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_12__["AppBar"], {
    position: "fixed",
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(classes.appBar, {
      [classes.appBarShift]: open
    })
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_12__["Toolbar"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_12__["IconButton"], {
    color: "inherit",
    "aria-label": "open drawer",
    onClick: handleDrawerOpen,
    edge: "end",
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(classes.menuButton, open && classes.hide)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_18___default.a, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: {
      'flexGrow': 1
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_language_menu_language_menu__WEBPACK_IMPORTED_MODULE_11__["LanguageMenu"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_theme_menu_theme_menu__WEBPACK_IMPORTED_MODULE_16__["ThemeMenu"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_repo_link_repo_link__WEBPACK_IMPORTED_MODULE_21__["RepoLink"], null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_12__["Drawer"], {
    className: classes.drawer,
    variant: "persistent",
    anchor: "left",
    open: open,
    classes: {
      paper: classes.drawerPaper
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.drawerHeader
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_12__["Typography"], {
    variant: 'h4'
  }, t('home.appName')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: {
      flexGrow: 1
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_12__["IconButton"], {
    onClick: handleDrawerClose
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_ChevronLeft__WEBPACK_IMPORTED_MODULE_19___default.a, null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_sider_menu_sider_menu__WEBPACK_IMPORTED_MODULE_6__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", {
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(classes.content, {
      [classes.contentShift]: open
    })
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.drawerHeader
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Suspense"], {
    fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "Loading...")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Switch"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
    exact: true,
    path: "/",
    component: _components_home_view_home_view__WEBPACK_IMPORTED_MODULE_3__["HomeView"]
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
    path: "/base-converter",
    component: bconv
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
    path: "/associated-base-converter",
    component: _components_associated_base_converter_view_associated_base_converter_view__WEBPACK_IMPORTED_MODULE_10__["AssociatedBaseConverterView"]
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
    path: "/complement-converter",
    component: _components_complement_converter_view_complement_converter_view__WEBPACK_IMPORTED_MODULE_7__["ComplementConverterView"]
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
    path: "/float-converter",
    component: _components_float_converter_view_float_converter_view__WEBPACK_IMPORTED_MODULE_8__["FloatConverterView"]
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
    path: "/positional-calculator",
    component: _components_positional_calculator_positional_calculator_view__WEBPACK_IMPORTED_MODULE_9__["PositionalCalculatorView"]
  })))))));
};
/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./app/components/associated-base-conversion-details/associated-base-conversion-details.tsx":
/*!**************************************************************************************************!*\
  !*** ./app/components/associated-base-conversion-details/associated-base-conversion-details.tsx ***!
  \**************************************************************************************************/
/*! exports provided: AssociatedBaseConversionDetails */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssociatedBaseConversionDetails", function() { return AssociatedBaseConversionDetails; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _digit_mapping_digit_mapping_box__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../digit-mapping/digit-mapping-box */ "./app/components/digit-mapping/digit-mapping-box.tsx");
/* harmony import */ var _calc_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @calc/ui */ "../../../libs/ui/src/index.ts");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core */ "../../../node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/styles */ "../../../node_modules/@material-ui/core/esm/styles/index.js");






var useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__["makeStyles"])(theme => {
  return Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["createStyles"])({
    card: {
      padding: theme.spacing(3)
    },
    equation: {
      paddingBottom: theme.spacing(2)
    },
    mappings: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap'
    }
  });
});
var AssociatedBaseConversionDetails = (_ref) => {
  var {
    conversion
  } = _ref;
  var {
    t
  } = Object(react_i18next__WEBPACK_IMPORTED_MODULE_3__["useTranslation"])();
  var [inputStr, inputBase] = conversion.input;
  var outputStr = conversion.result.valueInBase;
  var outputBase = conversion.result.base;
  var classes = useStyles();
  var mappings = conversion.details.positionMappings.map((mapping, index) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_digit_mapping_digit_mapping_box__WEBPACK_IMPORTED_MODULE_1__["DigitMappingBox"], {
      key: index,
      mapping: mapping
    });
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Card"], {
    className: classes.card
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, t('baseConverter.inputNumber')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_calc_ui__WEBPACK_IMPORTED_MODULE_2__["InputWithCopy"], {
    readOnly: true,
    value: conversion.result.valueInBase
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.equation
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_calc_ui__WEBPACK_IMPORTED_MODULE_2__["NumberSubscript"], {
    value: inputStr,
    subscript: inputBase
  }), "\xA0=\xA0", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_calc_ui__WEBPACK_IMPORTED_MODULE_2__["NumberSubscript"], {
    value: conversion.result.decimalValue.toString(),
    subscript: 10
  }), "\xA0=\xA0", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_calc_ui__WEBPACK_IMPORTED_MODULE_2__["NumberSubscript"], {
    value: outputStr,
    subscript: outputBase
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Typography"], null, t('associatedBaseConverter.mappings')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.mappings
  }, mappings));
};

/***/ }),

/***/ "./app/components/associated-base-converter-view/associated-base-converter-view.tsx":
/*!******************************************************************************************!*\
  !*** ./app/components/associated-base-converter-view/associated-base-converter-view.tsx ***!
  \******************************************************************************************/
/*! exports provided: AssociatedBaseConverterView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssociatedBaseConverterView", function() { return AssociatedBaseConverterView; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _associated_base_converter_associated_base_converter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../associated-base-converter/associated-base-converter */ "./app/components/associated-base-converter/associated-base-converter.tsx");
/* harmony import */ var _associated_base_conversion_details_associated_base_conversion_details__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../associated-base-conversion-details/associated-base-conversion-details */ "./app/components/associated-base-conversion-details/associated-base-conversion-details.tsx");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core */ "../../../node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _calc_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @calc/ui */ "../../../libs/ui/src/index.ts");
/* harmony import */ var _calc_docs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @calc/docs */ "../../../libs/docs/src/index.ts");
/* harmony import */ var _core_styles_converter_styles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/styles/converter-styles */ "./app/core/styles/converter-styles.ts");








var AssociatedBaseConverterView = () => {
  var {
    t
  } = Object(react_i18next__WEBPACK_IMPORTED_MODULE_1__["useTranslation"])();
  var [conversion, setConversion] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  var classes = Object(_core_styles_converter_styles__WEBPACK_IMPORTED_MODULE_7__["useConverterStyles"])();

  var onChange = newConversion => {
    if (newConversion) {
      setConversion(newConversion);
    }
  };

  var [value, setValue] = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(0);

  var handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Tabs"], {
    value: value,
    onChange: handleChange
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Tab"], Object.assign({
    label: "Converter"
  }, Object(_calc_ui__WEBPACK_IMPORTED_MODULE_5__["a11yProps"])(0))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Tab"], Object.assign({
    label: "Theory"
  }, Object(_calc_ui__WEBPACK_IMPORTED_MODULE_5__["a11yProps"])(1)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_calc_ui__WEBPACK_IMPORTED_MODULE_5__["TabPanel"], {
    value: value,
    index: 0
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.verticalSpacer
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Typography"], {
    variant: 'h4',
    className: classes.title
  }, t('associatedBaseConverter.title')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_associated_base_converter_associated_base_converter__WEBPACK_IMPORTED_MODULE_2__["AssociatedBaseConverter"], {
    onConversionChange: onChange
  }), conversion && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Typography"], {
    variant: 'h4',
    className: classes.title
  }, t('baseConverter.result')), conversion && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_associated_base_conversion_details_associated_base_conversion_details__WEBPACK_IMPORTED_MODULE_3__["AssociatedBaseConversionDetails"], {
    conversion: conversion.stages[0]
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_calc_ui__WEBPACK_IMPORTED_MODULE_5__["TabPanel"], {
    value: value,
    index: 1
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.verticalSpacer
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Box"], {
    display: 'flex',
    alignItems: 'center',
    maxWidth: 900,
    margin: 'auto'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_calc_docs__WEBPACK_IMPORTED_MODULE_6__["DocPage"], {
    path: "positional/associated-base-conversion"
  }))));
};

/***/ }),

/***/ "./app/components/associated-base-converter/associated-base-converter.tsx":
/*!********************************************************************************!*\
  !*** ./app/components/associated-base-converter/associated-base-converter.tsx ***!
  \********************************************************************************/
/*! exports provided: AssociatedBaseConverter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssociatedBaseConverter", function() { return AssociatedBaseConverter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _calc_calc_arithmetic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @calc/calc-arithmetic */ "../../../libs/calc-arithmetic/src/index.ts");
/* harmony import */ var _calc_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @calc/ui */ "../../../libs/ui/src/index.ts");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "../../../node_modules/react-redux/es/index.js");
/* harmony import */ var _store_selectors_options_selectors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store/selectors/options.selectors */ "./app/store/selectors/options.selectors.ts");
/* harmony import */ var _conversion_options_conversion_options__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../conversion-options/conversion-options */ "./app/components/conversion-options/conversion-options.tsx");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core */ "../../../node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! formik */ "../../../node_modules/formik/dist/formik.esm.js");
/* harmony import */ var _calc_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @calc/utils */ "../../../libs/utils/src/index.ts");
/* harmony import */ var _core_styles_converter_styles__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../core/styles/converter-styles */ "./app/core/styles/converter-styles.ts");











var AssociatedBaseConverter = (_ref) => {
  var {
    onConversionChange
  } = _ref;
  var {
    t
  } = Object(react_i18next__WEBPACK_IMPORTED_MODULE_6__["useTranslation"])();
  var showComplement = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["useSelector"])(_store_selectors_options_selectors__WEBPACK_IMPORTED_MODULE_4__["selectShowComplement"]);
  var showDecimalValue = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["useSelector"])(_store_selectors_options_selectors__WEBPACK_IMPORTED_MODULE_4__["selectShowDecimalValue"]);
  var classes = Object(_core_styles_converter_styles__WEBPACK_IMPORTED_MODULE_10__["useConverterStyles"])();
  var initialValues = {
    inputStr: 'FFAFAFFAF',
    inputBase: 16,
    outputBase: 2
  };

  var onSubmit = values => {
    var {
      inputStr,
      inputBase,
      outputBase
    } = values;
    var conversion = Object(_calc_calc_arithmetic__WEBPACK_IMPORTED_MODULE_1__["convertUsingAssociatedBases"])(inputStr, inputBase, outputBase);
    onConversionChange(conversion);
  };

  var validateBase = base => {
    if (!_calc_calc_arithmetic__WEBPACK_IMPORTED_MODULE_1__["BaseDigits"].isValidRadix(base)) {
      return t('baseConverter.wrongBase', {
        minBase: _calc_calc_arithmetic__WEBPACK_IMPORTED_MODULE_1__["BaseDigits"].MIN_BASE,
        maxBase: _calc_calc_arithmetic__WEBPACK_IMPORTED_MODULE_1__["BaseDigits"].MAX_BASE
      });
    }
  };

  var validateValueStr = (valueStr, inputBase) => {
    if (!Object(_calc_calc_arithmetic__WEBPACK_IMPORTED_MODULE_1__["isValidString"])(valueStr, inputBase)) {
      return t('baseConverter.wrongRepresentationStr', {
        base: inputBase
      });
    }
  };

  var validate = values => {
    var errors = {
      inputBase: validateBase(values.inputBase),
      outputBase: validateBase(values.outputBase),
      inputStr: validateValueStr(values.inputStr, values.inputBase)
    };
    return Object(_calc_utils__WEBPACK_IMPORTED_MODULE_9__["clean"])(errors);
  };

  var form = Object(formik__WEBPACK_IMPORTED_MODULE_8__["useFormik"])({
    initialValues,
    onSubmit,
    validate
  });
  var [inputValue, setInputValue] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(initialValues.inputStr);
  var [inputBase, setInputBase] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(initialValues.inputBase);
  var [possibleOutputBases, setPossibleOutputBases] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(() => {
    return _calc_calc_arithmetic__WEBPACK_IMPORTED_MODULE_1__["BaseDigits"].getAllPossibleBasesForAssociateConversion(initialValues.inputBase);
  });
  var getDecimal = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(() => {
    try {
      if (inputBase === 10) return inputValue;
      return Object(_calc_calc_arithmetic__WEBPACK_IMPORTED_MODULE_1__["fromString"])(inputValue, inputBase, 10).result.decimalValue.toString();
    } catch (e) {
      return '0.0';
    }
  }, [inputBase, inputValue]);
  var getComplement = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(() => {
    try {
      return _calc_calc_arithmetic__WEBPACK_IMPORTED_MODULE_1__["ComplementConverter"].getComplement(inputValue, inputBase).toString();
    } catch (e) {
      return '0.0';
    }
  }, [inputBase, inputValue]);
  var options = possibleOutputBases.map((base, index) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__["MenuItem"], {
      value: base,
      key: index
    }, base);
  });

  var handleInputBaseChange = e => {
    var newInputBase = Number.parseInt(e.target.value);
    setInputBase(newInputBase);
    setPossibleOutputBases(_calc_calc_arithmetic__WEBPACK_IMPORTED_MODULE_1__["BaseDigits"].getAllPossibleBasesForAssociateConversion(newInputBase));
    form.handleChange(e);
  };

  var handleInputStrChange = e => {
    setInputValue(e.target.value);
    form.handleChange(e);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__["Card"], {
    className: classes.card
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_conversion_options_conversion_options__WEBPACK_IMPORTED_MODULE_5__["ConversionOptions"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
    onSubmit: form.handleSubmit
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_calc_ui__WEBPACK_IMPORTED_MODULE_2__["InputWithCopy"], {
    className: classes.input,
    name: 'inputStr',
    id: 'inputStr',
    label: t('baseConverter.inputNumber'),
    error: !!form.errors.inputStr,
    helperText: form.errors.inputStr,
    onChange: handleInputStrChange,
    value: form.values.inputStr
  }), showDecimalValue && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_calc_ui__WEBPACK_IMPORTED_MODULE_2__["InputWithCopy"], {
    className: classes.input,
    label: t('baseConverter.inputDecimalValue'),
    readOnly: true,
    value: getDecimal()
  }), showComplement && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_calc_ui__WEBPACK_IMPORTED_MODULE_2__["InputWithCopy"], {
    style: {
      'paddingBottom': '20px'
    },
    label: t('baseConverter.inputComplement'),
    readOnly: true,
    value: getComplement()
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.row
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__["TextField"], {
    className: classes.inputBase,
    variant: 'outlined',
    name: 'inputBase',
    id: 'inputBase',
    label: t('baseConverter.inputBase'),
    error: !!form.errors.inputBase,
    helperText: form.errors.inputBase,
    onChange: handleInputBaseChange,
    value: form.values.inputBase
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.horizontalSpacer
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__["TextField"], {
    select: true,
    className: classes.outputBase,
    name: 'outputBase',
    id: 'outputBase',
    label: t('baseConverter.outputBase'),
    placeholder: t('associatedBaseConverter.noOutputBase'),
    disabled: !options.length,
    value: form.values.outputBase,
    onChange: form.handleChange,
    variant: 'outlined'
  }, options), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.horizontalSpacer
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__["Button"], {
    color: 'secondary',
    variant: 'contained',
    type: 'submit'
  }, t('baseConverter.convert'))))));
};

/***/ }),

/***/ "./app/components/complement-converter-view/complement-converter-view.tsx":
/*!********************************************************************************!*\
  !*** ./app/components/complement-converter-view/complement-converter-view.tsx ***!
  \********************************************************************************/
/*! exports provided: ComplementConverterView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComplementConverterView", function() { return ComplementConverterView; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "../../../node_modules/@material-ui/core/esm/index.js");



var ComplementConverterView = () => {
  var {
    t
  } = Object(react_i18next__WEBPACK_IMPORTED_MODULE_1__["useTranslation"])();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Typography"], {
    variant: 'h4'
  }, t('complementConverter.title')));
};

/***/ }),

/***/ "./app/components/conversion-options/conversion-options.tsx":
/*!******************************************************************!*\
  !*** ./app/components/conversion-options/conversion-options.tsx ***!
  \******************************************************************/
/*! exports provided: ConversionOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConversionOptions", function() { return ConversionOptions; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _store_actions_options_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../store/actions/options.actions */ "./app/store/actions/options.actions.ts");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "../../../node_modules/react-redux/es/index.js");
/* harmony import */ var _store_selectors_options_selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../store/selectors/options.selectors */ "./app/store/selectors/options.selectors.ts");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core */ "../../../node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/styles */ "../../../node_modules/@material-ui/core/esm/styles/index.js");







var useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__["makeStyles"])(theme => {
  return Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["createStyles"])({
    box: {
      display: 'flex',
      flexDirection: 'row',
      paddingBottom: theme.spacing(2)
    }
  });
});
var ConversionOptions = (_ref) => {
  var {
    style
  } = _ref;
  var {
    t
  } = Object(react_i18next__WEBPACK_IMPORTED_MODULE_4__["useTranslation"])();
  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useDispatch"])();
  var classes = useStyles();
  var showComplement = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"])(_store_selectors_options_selectors__WEBPACK_IMPORTED_MODULE_3__["selectShowComplement"]);
  var showDecimalValue = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"])(_store_selectors_options_selectors__WEBPACK_IMPORTED_MODULE_3__["selectShowDecimalValue"]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.box
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["FormGroup"], {
    row: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["FormControlLabel"], {
    control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["Switch"], {
      color: 'primary',
      checked: showDecimalValue,
      onChange: () => {
        dispatch(Object(_store_actions_options_actions__WEBPACK_IMPORTED_MODULE_1__["setShowDecimalValue"])(!showDecimalValue));
      }
    }),
    label: t('baseConverter.showDecimalValue')
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["FormControlLabel"], {
    control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["Switch"], {
      color: 'primary',
      checked: showComplement,
      onChange: () => {
        dispatch(Object(_store_actions_options_actions__WEBPACK_IMPORTED_MODULE_1__["setShowComplement"])(!showComplement));
      }
    }),
    label: t('baseConverter.showComplement')
  })));
};

/***/ }),

/***/ "./app/components/digit-mapping/digit-mapping-box.tsx":
/*!************************************************************!*\
  !*** ./app/components/digit-mapping/digit-mapping-box.tsx ***!
  \************************************************************/
/*! exports provided: useStyles, DigitMappingBox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useStyles", function() { return useStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DigitMappingBox", function() { return DigitMappingBox; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_archer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-archer */ "../../../node_modules/react-archer/lib/react-archer.js");
/* harmony import */ var react_archer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_archer__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "../../../node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/styles */ "../../../node_modules/@material-ui/core/esm/styles/index.js");




var useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__["makeStyles"])(theme => {
  return Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["createStyles"])({
    digitBox: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: '12px',
      minHeight: '20px',
      padding: '1px 6px'
    },
    rootDigitsRow: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingBottom: theme.spacing(2)
    },
    digitsRow: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center'
    },
    mappingsBox: {
      display: 'flex',
      justifyContent: 'center',
      padding: '5px'
    },
    mappingsBoxBorder: {
      display: 'flex',
      justifyContent: 'center',
      padding: '5px',
      borderLeft: ' 1px solid #d9d9d9'
    }
  });
});
var DigitMappingBox = (_ref) => {
  var {
    mapping
  } = _ref;
  var ref = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  var classes = useStyles();
  var targetDigitsSource = mapping.input.length < mapping.output.length ? mapping.output : mapping.input;
  var rootDigitsSource = mapping.input.length < mapping.output.length ? mapping.input : mapping.output;
  var rootDigits = rootDigitsSource.map((digit, index) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Button"], {
      key: index,
      className: "digit-box"
    }, digit.valueInBase);
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (ref.current) {
      ref.current.forceUpdate();
    }
  }, [mapping]);
  var targetDigits = targetDigitsSource.map((digit, index) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_archer__WEBPACK_IMPORTED_MODULE_1__["ArcherElement"], {
      key: "$output-".concat(index),
      id: "$output-".concat(index),
      relations: [{
        targetId: 'root',
        targetAnchor: 'middle',
        sourceAnchor: 'top',
        style: {
          strokeColor: '#d9d9d9',
          strokeWidth: 2,
          strokeDasharray: '3,3',
          arrowLength: 0,
          arrowThickness: 0
        }
      }]
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Button"], {
      key: index,
      className: "digit-box"
    }, digit.valueInBase));
  });
  var boxClassName = mapping.output[0].position === -1 ? classes.mappingsBoxBorder : classes.mappingsBox;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: boxClassName
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_archer__WEBPACK_IMPORTED_MODULE_1__["ArcherContainer"], {
    noCurves: true,
    ref: ref
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: mapping.input.length < mapping.output.length ? 'column' : 'column-reverse'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_archer__WEBPACK_IMPORTED_MODULE_1__["ArcherElement"], {
    id: "root"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.digitsRow
  }, rootDigits)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.rootDigitsRow
  }, targetDigits))));
};

/***/ }),

/***/ "./app/components/float-converter-view/float-converter-view.tsx":
/*!**********************************************************************!*\
  !*** ./app/components/float-converter-view/float-converter-view.tsx ***!
  \**********************************************************************/
/*! exports provided: FloatConverterView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FloatConverterView", function() { return FloatConverterView; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _float_converter_float_converter_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../float-converter/float-converter-component */ "./app/components/float-converter/float-converter-component.tsx");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core */ "../../../node_modules/@material-ui/core/esm/index.js");




var FloatConverterView = () => {
  var {
    t
  } = Object(react_i18next__WEBPACK_IMPORTED_MODULE_1__["useTranslation"])();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Typography"], {
    variant: 'h3'
  }, t('floatConverter.title')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_float_converter_float_converter_component__WEBPACK_IMPORTED_MODULE_2__["FloatConverterComponent"], null));
};

/***/ }),

/***/ "./app/components/float-converter/binary-button/binary-button.tsx":
/*!************************************************************************!*\
  !*** ./app/components/float-converter/binary-button/binary-button.tsx ***!
  \************************************************************************/
/*! exports provided: BinaryButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BinaryButton", function() { return BinaryButton; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "../../../node_modules/@material-ui/core/esm/index.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var BinaryButton = (_ref) => {
  var {
    onChange,
    value,
    index
  } = _ref;
  var colorStyle = value === '0' ? {
    color: 'rgba(0, 0, 0, 0.65)',
    backgroundColor: '#fff'
  } : {
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.65)'
  };

  var style = _objectSpread({
    padding: '1px 6px',
    margin: '2px',
    border: '1px solid inherit',
    height: '20px',
    minWidth: '10px',
    fontSize: '12px'
  }, colorStyle);

  var handleClick = () => {
    var newValue = value === '1' ? '0' : '1';
    if (onChange) onChange(newValue, index);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    onClick: handleClick,
    style: style
  }, value));
};

/***/ }),

/***/ "./app/components/float-converter/button-row/button-row.tsx":
/*!******************************************************************!*\
  !*** ./app/components/float-converter/button-row/button-row.tsx ***!
  \******************************************************************/
/*! exports provided: ButtonRowComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonRowComponent", function() { return ButtonRowComponent; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _binary_button_binary_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../binary-button/binary-button */ "./app/components/float-converter/binary-button/binary-button.tsx");


var ButtonRowComponent = (_ref) => {
  var {
    onChange,
    values
  } = _ref;

  var handleButtonChange = (value, index) => {
    var newValues = [...values];
    newValues[index] = value;
    if (onChange) onChange(newValues);
  };

  var buttons = values.map((value, index) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_binary_button_binary_button__WEBPACK_IMPORTED_MODULE_1__["BinaryButton"], {
      index: index,
      key: index,
      value: value,
      onChange: handleButtonChange
    });
  });
  var style = {
    display: 'flex',
    flexDirection: 'row'
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: style
  }, buttons);
};

/***/ }),

/***/ "./app/components/float-converter/float-converter-component.tsx":
/*!**********************************************************************!*\
  !*** ./app/components/float-converter/float-converter-component.tsx ***!
  \**********************************************************************/
/*! exports provided: FloatConverterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FloatConverterComponent", function() { return FloatConverterComponent; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _calc_calc_arithmetic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @calc/calc-arithmetic */ "../../../libs/calc-arithmetic/src/index.ts");
/* harmony import */ var _representation_part_representation_part__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./representation-part/representation-part */ "./app/components/float-converter/representation-part/representation-part.tsx");
/* harmony import */ var _calc_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @calc/ui */ "../../../libs/ui/src/index.ts");




var FloatConverterComponent = () => {
  var initialNum = _calc_calc_arithmetic__WEBPACK_IMPORTED_MODULE_1__["FloatConverter"].ToSingle(0.0);
  var [floatingNumber, setFloatingNumber] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(initialNum);
  var [sign, setSign] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(initialNum.sign);
  var [exponent, setExponent] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(initialNum.exponent);
  var [mantissa, setMantissa] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(initialNum.mantissa);
  var [rawValue, setRawValue] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0.0);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    var representationStr = sign + exponent + mantissa;
    setFloatingNumber(_calc_calc_arithmetic__WEBPACK_IMPORTED_MODULE_1__["FloatConverter"].ToSingle(representationStr));
  }, [exponent, mantissa, sign]);

  var handleChange = value => {
    setRawValue(value);

    if (value && Object(_calc_calc_arithmetic__WEBPACK_IMPORTED_MODULE_1__["isValidString"])(value, 10)) {
      try {
        var num = _calc_calc_arithmetic__WEBPACK_IMPORTED_MODULE_1__["FloatConverter"].ToSingle(value);
        setFloatingNumber(num);
      } catch (err) {
        console.log(err);
      }
    }
  };

  var style = {
    'display': 'flex',
    'flexDirection': 'row'
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: style
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_representation_part_representation_part__WEBPACK_IMPORTED_MODULE_2__["RepresentationPart"], {
    partType: _representation_part_representation_part__WEBPACK_IMPORTED_MODULE_2__["PartType"].Sign,
    part: [floatingNumber.sign],
    partEncoding: floatingNumber.signEncoding,
    partValue: floatingNumber.signValue,
    onChange: setSign
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_representation_part_representation_part__WEBPACK_IMPORTED_MODULE_2__["RepresentationPart"], {
    partType: _representation_part_representation_part__WEBPACK_IMPORTED_MODULE_2__["PartType"].Exponent,
    part: floatingNumber.exponent.split(''),
    partEncoding: floatingNumber.exponentEncoding.toString(),
    partValue: floatingNumber.exponentValue.toString(),
    onChange: setExponent
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_representation_part_representation_part__WEBPACK_IMPORTED_MODULE_2__["RepresentationPart"], {
    partType: _representation_part_representation_part__WEBPACK_IMPORTED_MODULE_2__["PartType"].Mantissa,
    part: floatingNumber.mantissa.split(''),
    partEncoding: floatingNumber.mantissaEncoding.toString(),
    partValue: floatingNumber.mantissaValue.toString(),
    onChange: setMantissa
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: {
      width: '600px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_calc_ui__WEBPACK_IMPORTED_MODULE_3__["InputWithCopy"], {
    value: rawValue,
    onChange: handleChange,
    size: 'small',
    inputType: _calc_ui__WEBPACK_IMPORTED_MODULE_3__["InputType"].Number
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_calc_ui__WEBPACK_IMPORTED_MODULE_3__["InputWithCopy"], {
    readOnly: true,
    value: floatingNumber.value.toString(),
    size: 'small',
    inputType: _calc_ui__WEBPACK_IMPORTED_MODULE_3__["InputType"].Text
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_calc_ui__WEBPACK_IMPORTED_MODULE_3__["InputWithCopy"], {
    readOnly: true,
    value: floatingNumber.binary,
    size: 'small',
    inputType: _calc_ui__WEBPACK_IMPORTED_MODULE_3__["InputType"].Text
  })));
};

/***/ }),

/***/ "./app/components/float-converter/representation-part/representation-part.tsx":
/*!************************************************************************************!*\
  !*** ./app/components/float-converter/representation-part/representation-part.tsx ***!
  \************************************************************************************/
/*! exports provided: PartType, RepresentationPart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PartType", function() { return PartType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RepresentationPart", function() { return RepresentationPart; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _button_row_button_row__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../button-row/button-row */ "./app/components/float-converter/button-row/button-row.tsx");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");



var PartType;

(function (PartType) {
  PartType["Sign"] = "Sign";
  PartType["Exponent"] = "Exponent";
  PartType["Mantissa"] = "Mantissa";
})(PartType || (PartType = {}));

var RepresentationPart = (_ref) => {
  var {
    part,
    partEncoding,
    partValue,
    partType,
    onChange
  } = _ref;
  var {
    t
  } = Object(react_i18next__WEBPACK_IMPORTED_MODULE_2__["useTranslation"])();
  var title = {
    [PartType.Sign]: t('floatConverter.sign'),
    [PartType.Exponent]: t('floatConverter.exponent'),
    [PartType.Mantissa]: t('floatConverter.mantissa')
  }[partType];

  var handleChange = values => {
    if (onChange) onChange(values.join(''));
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: {
      padding: '10px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: {
      fontWeight: 'bold'
    }
  }, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, partType === PartType.Exponent ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "2 ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("sup", null, partValue)) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, partValue)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, " ", partEncoding)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_button_row_button_row__WEBPACK_IMPORTED_MODULE_1__["ButtonRowComponent"], {
    values: part,
    onChange: handleChange
  }));
};

/***/ }),

/***/ "./app/components/home-view/home-view.tsx":
/*!************************************************!*\
  !*** ./app/components/home-view/home-view.tsx ***!
  \************************************************/
/*! exports provided: HomeView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeView", function() { return HomeView; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");


var HomeView = () => {
  var {
    t
  } = Object(react_i18next__WEBPACK_IMPORTED_MODULE_1__["useTranslation"])();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, t('home.header'));
};

/***/ }),

/***/ "./app/components/language-menu/language-menu.tsx":
/*!********************************************************!*\
  !*** ./app/components/language-menu/language-menu.tsx ***!
  \********************************************************/
/*! exports provided: LanguageMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LanguageMenu", function() { return LanguageMenu; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _assets_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../assets/i18n/i18n */ "./assets/i18n/i18n.ts");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core */ "../../../node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _material_ui_icons_Translate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/icons/Translate */ "../../../node_modules/@material-ui/icons/Translate.js");
/* harmony import */ var _material_ui_icons_Translate__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Translate__WEBPACK_IMPORTED_MODULE_4__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }






var LanguageMenu = () => {
  var {
    i18n,
    t
  } = Object(react_i18next__WEBPACK_IMPORTED_MODULE_1__["useTranslation"])();
  var [anchorEl, setAnchorEl] = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(null);

  var handlePopoverClick = event => {
    setAnchorEl(event.currentTarget);
  };

  var handleClose = () => {
    setAnchorEl(null);
  };

  var open = Boolean(anchorEl);
  var id = open ? 'simple-popover' : undefined;

  var handleClick = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(function* (language) {
      if (language && i18n.language !== language) {
        yield i18n.changeLanguage(language);
      }

      handleClose();
    });

    return function handleClick(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var options = _assets_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["availableThemes"].map((languageKey, index) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: index
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Button"], {
      "data-language": languageKey,
      onClick: /*#__PURE__*/_asyncToGenerator(function* () {
        yield handleClick(languageKey);
      })
    }, Object(_assets_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["getNativeName"])(languageKey)));
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Popover"], {
    style: {
      padding: '0px'
    },
    id: id,
    open: open,
    anchorEl: anchorEl,
    onClose: handleClose,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'center'
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'center'
    },
    title: t('languageMenu.choose')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, options)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Button"], {
    startIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Translate__WEBPACK_IMPORTED_MODULE_4___default.a, null),
    "aria-describedby": id,
    variant: "text",
    color: "default",
    onClick: handlePopoverClick
  }, Object(_assets_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["getNativeName"])(i18n.language)));
};

/***/ }),

/***/ "./app/components/positional-calculator/add-at-position-hover-content.tsx":
/*!********************************************************************************!*\
  !*** ./app/components/positional-calculator/add-at-position-hover-content.tsx ***!
  \********************************************************************************/
/*! exports provided: AddAtPositionHoverContent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddAtPositionHoverContent", function() { return AddAtPositionHoverContent; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _calc_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @calc/ui */ "../../../libs/ui/src/index.ts");


var AddAtPositionHoverContent = (_ref) => {
  var {
    positionResult
  } = _ref;
  var operands = positionResult.operands.map((operand, index) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      key: index,
      style: {
        fontWeight: operand.isCarry ? 'bold' : 'initial'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_calc_ui__WEBPACK_IMPORTED_MODULE_1__["NumberSubscript"], {
      value: operand.valueInBase,
      subscript: '',
      noBraces: true
    }), index !== positionResult.operands.length - 1 && '+');
  });
  var carries = positionResult.carry.map((carry, index) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      key: index
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_calc_ui__WEBPACK_IMPORTED_MODULE_1__["NumberSubscript"], {
      value: carry.valueInBase,
      subscript: "C".concat(carry.position)
    }), index !== positionResult.carry.length - 1 && '+');
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, operands.length > 1 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_calc_ui__WEBPACK_IMPORTED_MODULE_1__["NumberSubscript"], {
    value: 'S',
    subscript: positionResult.valueAtPosition.position,
    noBraces: true
  }), "=", operands), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_calc_ui__WEBPACK_IMPORTED_MODULE_1__["NumberSubscript"], {
    value: 'S',
    subscript: positionResult.valueAtPosition.position,
    noBraces: true
  }), "=", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_calc_ui__WEBPACK_IMPORTED_MODULE_1__["NumberSubscript"], {
    value: positionResult.valueAtPosition.valueInBase,
    subscript: positionResult.valueAtPosition.base
  }), carries.length > 0 && '+', carries.length > 0 && carries));
};

/***/ }),

/***/ "./app/components/positional-calculator/positional-calculator-view.tsx":
/*!*****************************************************************************!*\
  !*** ./app/components/positional-calculator/positional-calculator-view.tsx ***!
  \*****************************************************************************/
/*! exports provided: PositionalCalculatorView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PositionalCalculatorView", function() { return PositionalCalculatorView; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _calc_calc_arithmetic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @calc/calc-arithmetic */ "../../../libs/calc-arithmetic/src/index.ts");
/* harmony import */ var _add_at_position_hover_content__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./add-at-position-hover-content */ "./app/components/positional-calculator/add-at-position-hover-content.tsx");
/* harmony import */ var _calc_grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @calc/grid */ "../../../libs/grid/src/index.ts");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core */ "../../../node_modules/@material-ui/core/esm/index.js");






var PositionalCalculatorView = () => {
  var {
    t
  } = Object(react_i18next__WEBPACK_IMPORTED_MODULE_1__["useTranslation"])();
  var a = Object(_calc_calc_arithmetic__WEBPACK_IMPORTED_MODULE_2__["fromString"])('1234.123', 16, 16).result;
  var b = Object(_calc_calc_arithmetic__WEBPACK_IMPORTED_MODULE_2__["fromString"])('266756.323', 16, 16).result;
  var c = Object(_calc_calc_arithmetic__WEBPACK_IMPORTED_MODULE_2__["fromString"])('AAAAAA.BBBB', 16, 16).result;
  var d = Object(_calc_calc_arithmetic__WEBPACK_IMPORTED_MODULE_2__["fromString"])('CCCFFFFFFE', 16, 16).result;
  var res = Object(_calc_calc_arithmetic__WEBPACK_IMPORTED_MODULE_2__["addPositionalNumbers"])([a, b, c, d]);
  var grid = Object(_calc_grid__WEBPACK_IMPORTED_MODULE_4__["buildAdditionGrid"])(res);
  console.log(res);

  var groupBuilder = positionResult => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_add_at_position_hover_content__WEBPACK_IMPORTED_MODULE_3__["AddAtPositionHoverContent"], {
      positionResult: positionResult
    });
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["Typography"], {
    variant: 'h3'
  }, t('positionalCalculator.title')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_calc_grid__WEBPACK_IMPORTED_MODULE_4__["HoverGrid"], Object.assign({}, grid, {
    title: 'Addition details',
    groupBuilder: groupBuilder
  })));
};

/***/ }),

/***/ "./app/components/repo-link/repo-link.tsx":
/*!************************************************!*\
  !*** ./app/components/repo-link/repo-link.tsx ***!
  \************************************************/
/*! exports provided: RepoLink */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RepoLink", function() { return RepoLink; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "../../../node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _assets_env_meta__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../assets/env/meta */ "./assets/env/meta.ts");
/* harmony import */ var _calc_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @calc/ui */ "../../../libs/ui/src/index.ts");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");





var RepoLink = () => {
  var {
    t
  } = Object(react_i18next__WEBPACK_IMPORTED_MODULE_4__["useTranslation"])();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Tooltip"], {
    title: t('appBar.repo')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["IconButton"], {
    href: _assets_env_meta__WEBPACK_IMPORTED_MODULE_2__["repoUrl"]
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_calc_ui__WEBPACK_IMPORTED_MODULE_3__["GitlabIcon"], null)));
};

/***/ }),

/***/ "./app/components/sider-menu/sider-menu.tsx":
/*!**************************************************!*\
  !*** ./app/components/sider-menu/sider-menu.tsx ***!
  \**************************************************/
/*! exports provided: SiderMenu, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SiderMenu", function() { return SiderMenu; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "../../../node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core */ "../../../node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _material_ui_icons_Mail__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/icons/Mail */ "../../../node_modules/@material-ui/icons/Mail.js");
/* harmony import */ var _material_ui_icons_Mail__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Mail__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/icons/ExpandMore */ "../../../node_modules/@material-ui/icons/ExpandMore.js");
/* harmony import */ var _material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/styles */ "../../../node_modules/@material-ui/core/esm/styles/index.js");







var useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__["makeStyles"])(theme => Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["createStyles"])({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));
var SiderMenu = () => {
  var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useHistory"])();
  var {
    t
  } = Object(react_i18next__WEBPACK_IMPORTED_MODULE_2__["useTranslation"])();
  var classes = useStyles();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Accordion"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["AccordionSummary"], {
    expandIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_5___default.a, null),
    "aria-controls": "panel1a-content",
    id: "panel1a-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Typography"], {
    className: classes.heading
  }, t('home.positional'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["List"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["ListItem"], {
    button: true,
    key: 'base-converter',
    onClick: () => history.push('/base-converter')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["ListItemText"], {
    primary: t('baseConverter.title')
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["ListItem"], {
    button: true,
    key: 'associated-base-converter',
    onClick: () => history.push('/associated-base-converter')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["ListItemText"], {
    primary: t('associatedBaseConverter.title')
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["ListItem"], {
    button: true,
    key: 'complement-converter',
    onClick: () => history.push('/complement-converter')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["ListItemText"], {
    primary: t('complementConverter.title')
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["ListItem"], {
    button: true,
    key: 'positional-converter',
    onClick: () => history.push('/positional-calculator')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["ListItemText"], {
    primary: t('positionalCalculator.title')
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Accordion"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["AccordionSummary"], {
    expandIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_5___default.a, null),
    "aria-controls": "panel1a-content",
    id: "panel1a-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Typography"], {
    className: classes.heading
  }, t('home.floating'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["List"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["ListItem"], {
    button: true,
    key: 'float-converter',
    onClick: () => history.push('/float-converter')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["ListItemIcon"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Mail__WEBPACK_IMPORTED_MODULE_4___default.a, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["ListItemText"], {
    primary: t('floatConverter.title')
  })))));
};
/* harmony default export */ __webpack_exports__["default"] = (SiderMenu);

/***/ }),

/***/ "./app/components/theme-menu/theme-menu.tsx":
/*!**************************************************!*\
  !*** ./app/components/theme-menu/theme-menu.tsx ***!
  \**************************************************/
/*! exports provided: ThemeMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeMenu", function() { return ThemeMenu; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "../../../node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "../../../node_modules/react-redux/es/index.js");
/* harmony import */ var _store_selectors_options_selectors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store/selectors/options.selectors */ "./app/store/selectors/options.selectors.ts");
/* harmony import */ var _calc_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @calc/ui */ "../../../libs/ui/src/index.ts");
/* harmony import */ var _store_actions_options_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../store/actions/options.actions */ "./app/store/actions/options.actions.ts");
/* harmony import */ var _material_ui_icons_Brightness7__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/icons/Brightness7 */ "../../../node_modules/@material-ui/icons/Brightness7.js");
/* harmony import */ var _material_ui_icons_Brightness7__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Brightness7__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_icons_Brightness4__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/icons/Brightness4 */ "../../../node_modules/@material-ui/icons/Brightness4.js");
/* harmony import */ var _material_ui_icons_Brightness4__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Brightness4__WEBPACK_IMPORTED_MODULE_8__);









var ThemeMenu = () => {
  var {
    t
  } = Object(react_i18next__WEBPACK_IMPORTED_MODULE_1__["useTranslation"])();
  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["useDispatch"])();
  var currentTheme = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["useSelector"])(_store_selectors_options_selectors__WEBPACK_IMPORTED_MODULE_4__["selectAppTheme"]);

  var toggleTheme = () => {
    var theme = currentTheme === _calc_ui__WEBPACK_IMPORTED_MODULE_5__["AppTheme"].Light ? _calc_ui__WEBPACK_IMPORTED_MODULE_5__["AppTheme"].Dark : _calc_ui__WEBPACK_IMPORTED_MODULE_5__["AppTheme"].Light;
    dispatch(Object(_store_actions_options_actions__WEBPACK_IMPORTED_MODULE_6__["setTheme"])(theme));
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Tooltip"], {
    title: currentTheme === _calc_ui__WEBPACK_IMPORTED_MODULE_5__["AppTheme"].Light ? t('appBar.toggleDark') : t('appBar.toggleLight')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["IconButton"], {
    color: "default",
    onClick: toggleTheme
  }, currentTheme === _calc_ui__WEBPACK_IMPORTED_MODULE_5__["AppTheme"].Light ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Brightness4__WEBPACK_IMPORTED_MODULE_8___default.a, null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Brightness7__WEBPACK_IMPORTED_MODULE_7___default.a, null)));
};

/***/ }),

/***/ "./app/core/styles/converter-styles.ts":
/*!*********************************************!*\
  !*** ./app/core/styles/converter-styles.ts ***!
  \*********************************************/
/*! exports provided: useConverterStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useConverterStyles", function() { return useConverterStyles; });
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/styles */ "../../../node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "../../../node_modules/@material-ui/core/esm/index.js");


var useConverterStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__["makeStyles"])(theme => {
  return Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["createStyles"])({
    card: {
      padding: theme.spacing(3)
    },
    input: {
      paddingBottom: theme.spacing(2)
    },
    mappings: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      },
      [theme.breakpoints.up('md')]: {
        width: '70%'
      }
    },
    inputBase: {
      width: '20%'
    },
    outputBase: {
      width: '20%'
    },
    precision: {
      width: '10%'
    },
    horizontalSpacer: {
      [theme.breakpoints.down('md')]: {
        width: theme.spacing(1)
      },
      [theme.breakpoints.up('lg')]: {
        width: theme.spacing(2)
      }
    },
    verticalSpacer: {
      [theme.breakpoints.down('md')]: {
        width: theme.spacing(1)
      },
      [theme.breakpoints.up('lg')]: {
        width: theme.spacing(2)
      }
    },
    title: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2)
    },
    equation: {
      paddingBottom: theme.spacing(2)
    }
  });
});

/***/ }),

/***/ "./app/store/actions/options.actions.ts":
/*!**********************************************!*\
  !*** ./app/store/actions/options.actions.ts ***!
  \**********************************************/
/*! exports provided: OptionsActionsType, setShowComplement, setShowDecimalValue, setTheme */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OptionsActionsType", function() { return OptionsActionsType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setShowComplement", function() { return setShowComplement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setShowDecimalValue", function() { return setShowDecimalValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setTheme", function() { return setTheme; });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "../../../node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");

var OptionsActionsType;

(function (OptionsActionsType) {
  OptionsActionsType["SetShowComplement"] = "[Options] Set show complement";
  OptionsActionsType["SetShowDecimalValue"] = "[Options] Set show decimal value";
  OptionsActionsType["SetTheme"] = "[Options] Set theme";
})(OptionsActionsType || (OptionsActionsType = {}));

var setShowComplement = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createAction"])(OptionsActionsType.SetShowComplement, showComplement => ({
  payload: {
    showComplement
  }
}));
var setShowDecimalValue = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createAction"])(OptionsActionsType.SetShowDecimalValue, showDecimalValue => ({
  payload: {
    showDecimalValue
  }
}));
var setTheme = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createAction"])(OptionsActionsType.SetTheme, theme => ({
  payload: {
    theme
  }
}));

/***/ }),

/***/ "./app/store/configure-store.ts":
/*!**************************************!*\
  !*** ./app/store/configure-store.ts ***!
  \**************************************/
/*! exports provided: store */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "store", function() { return store; });
/* harmony import */ var _reducers_root_reducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reducers/root.reducer */ "./app/store/reducers/root.reducer.ts");
/* harmony import */ var _reducers_options_reducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reducers/options.reducer */ "./app/store/reducers/options.reducer.ts");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "../../../node_modules/redux/es/redux.js");



var initialState = {
  options: _reducers_options_reducer__WEBPACK_IMPORTED_MODULE_1__["optionsInitialState"]
};
var store = Object(redux__WEBPACK_IMPORTED_MODULE_2__["createStore"])(_reducers_root_reducer__WEBPACK_IMPORTED_MODULE_0__["rootReducer"], initialState);

/***/ }),

/***/ "./app/store/reducers/options.reducer.ts":
/*!***********************************************!*\
  !*** ./app/store/reducers/options.reducer.ts ***!
  \***********************************************/
/*! exports provided: optionsInitialState, optionsReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "optionsInitialState", function() { return optionsInitialState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "optionsReducer", function() { return optionsReducer; });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "../../../node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
/* harmony import */ var _actions_options_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/options.actions */ "./app/store/actions/options.actions.ts");
/* harmony import */ var _calc_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @calc/ui */ "../../../libs/ui/src/index.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var optionsInitialState = {
  showComplement: true,
  showDecimalValue: true,
  theme: _calc_ui__WEBPACK_IMPORTED_MODULE_2__["AppTheme"].Dark
};
var optionsReducer = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createReducer"])(optionsInitialState, {
  [_actions_options_actions__WEBPACK_IMPORTED_MODULE_1__["setShowComplement"].type]: (state, _ref) => {
    var {
      payload
    } = _ref;
    return _objectSpread(_objectSpread({}, state), {}, {
      showComplement: payload.showComplement
    });
  },
  [_actions_options_actions__WEBPACK_IMPORTED_MODULE_1__["setShowDecimalValue"].type]: (state, _ref2) => {
    var {
      payload
    } = _ref2;
    return _objectSpread(_objectSpread({}, state), {}, {
      showDecimalValue: payload.showDecimalValue
    });
  },
  [_actions_options_actions__WEBPACK_IMPORTED_MODULE_1__["setTheme"].type]: (state, _ref3) => {
    var {
      payload
    } = _ref3;
    return _objectSpread(_objectSpread({}, state), {}, {
      theme: payload.theme
    });
  }
});

/***/ }),

/***/ "./app/store/reducers/root.reducer.ts":
/*!********************************************!*\
  !*** ./app/store/reducers/root.reducer.ts ***!
  \********************************************/
/*! exports provided: rootReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rootReducer", function() { return rootReducer; });
/* harmony import */ var _options_reducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./options.reducer */ "./app/store/reducers/options.reducer.ts");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux */ "../../../node_modules/redux/es/redux.js");


var rootReducer = Object(redux__WEBPACK_IMPORTED_MODULE_1__["combineReducers"])({
  options: _options_reducer__WEBPACK_IMPORTED_MODULE_0__["optionsReducer"]
});

/***/ }),

/***/ "./app/store/selectors/options.selectors.ts":
/*!**************************************************!*\
  !*** ./app/store/selectors/options.selectors.ts ***!
  \**************************************************/
/*! exports provided: optionsState, selectShowDecimalValue, selectShowComplement, selectAppTheme */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "optionsState", function() { return optionsState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectShowDecimalValue", function() { return selectShowDecimalValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectShowComplement", function() { return selectShowComplement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectAppTheme", function() { return selectAppTheme; });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "../../../node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");

var optionsState = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(state => state, state => state.options);
var selectShowDecimalValue = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(optionsState, state => state.showDecimalValue);
var selectShowComplement = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(optionsState, state => state.showComplement);
var selectAppTheme = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(optionsState, state => state.theme);

/***/ }),

/***/ "./assets/env/meta.ts":
/*!****************************!*\
  !*** ./assets/env/meta.ts ***!
  \****************************/
/*! exports provided: repoUrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "repoUrl", function() { return repoUrl; });
var repoUrl = 'https://gitlab.com/gitgudorgetgot/calc';

/***/ }),

/***/ "./assets/i18n/en.json":
/*!*****************************!*\
  !*** ./assets/i18n/en.json ***!
  \*****************************/
/*! exports provided: appBar, home, languageMenu, baseConverter, associatedBaseConverter, floatConverter, complementConverter, common, positionalCalculator, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"appBar\":{\"repo\":\"GitLab repository\",\"toggleDark\":\"Toggle dark theme\",\"toggleLight\":\"Toggle light theme\"},\"home\":{\"appName\":\"CALC\",\"header\":\"Calc\",\"positional\":\"Positional\",\"floating\":\"Floating\"},\"languageMenu\":{\"choose\":\"Choose language\"},\"baseConverter\":{\"title\":\"Base Converter\",\"result\":\"Conversion result\",\"wrongBase\":\"Base must be between {{minBase}} and {{maxBase}}\",\"wrongRepresentationStr\":\"Representation strings contains invalid digits for base {{base}}\",\"inputNumber\":\"Input number\",\"inputDecimalValue\":\"Input decimal value\",\"inputComplement\":\"Input complement\",\"inputBase\":\"Input base\",\"outputBase\":\"Output base\",\"outputNumber\":\"Output number\",\"conversionToBase\":\"Conversion to base {{base}}\",\"conversionToDecimal\":\"Conversion to decimal\",\"integralConversion\":\"Integral conversion\",\"floatingConversion\":\"Floating conversion\",\"swapBases\":\"Swap bases\",\"precision\":\"Precision\",\"convert\":\"Convert\",\"showDecimalValue\":\"Show decimal value\",\"showComplement\":\"Show complement\"},\"associatedBaseConverter\":{\"title\":\"Associated Base Converter\",\"result\":\"Conversion result\",\"mappings\":\"Mappings\",\"noOutputBase\":\"No output bases possible\"},\"floatConverter\":{\"title\":\"IEEE 754\",\"sign\":\"Sign\",\"exponent\":\"Exponent\",\"mantissa\":\"Mantissa\",\"entered\":\"Entered value\",\"stored\":\"Stored value\",\"binary\":\"Float binary\"},\"complementConverter\":{\"title\":\"Complement Converter\"},\"common\":{\"copy\":\"Copied to clipboard!\"},\"positionalCalculator\":{\"title\":\"Positional Calculator\"}}");

/***/ }),

/***/ "./assets/i18n/i18n.ts":
/*!*****************************!*\
  !*** ./assets/i18n/i18n.ts ***!
  \*****************************/
/*! exports provided: getNativeName, availableThemes, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNativeName", function() { return getNativeName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "availableThemes", function() { return availableThemes; });
/* harmony import */ var i18next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! i18next */ "../../../node_modules/i18next/dist/esm/i18next.js");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _en_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./en.json */ "./assets/i18n/en.json");
var _en_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./en.json */ "./assets/i18n/en.json", 1);
/* harmony import */ var _pl_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pl.json */ "./assets/i18n/pl.json");
var _pl_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./pl.json */ "./assets/i18n/pl.json", 1);




var resources = {
  en: {
    translation: _en_json__WEBPACK_IMPORTED_MODULE_2__
  },
  pl: {
    translation: _pl_json__WEBPACK_IMPORTED_MODULE_3__
  }
};
function getNativeName(languageKey) {
  return {
    'en': 'English',
    'pl': 'Polski'
  }[languageKey];
}
var availableThemes = Object.keys(resources);
i18next__WEBPACK_IMPORTED_MODULE_0__["default"].use(react_i18next__WEBPACK_IMPORTED_MODULE_1__["initReactI18next"]) // passes i18n down to react-i18next
.init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});
/* harmony default export */ __webpack_exports__["default"] = (i18next__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./assets/i18n/pl.json":
/*!*****************************!*\
  !*** ./assets/i18n/pl.json ***!
  \*****************************/
/*! exports provided: appBar, home, languageMenu, baseConverter, associatedBaseConverter, floatConverter, complementConverter, common, positionalCalculator, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"appBar\":{\"repo\":\"Repozytorium na GitLab\",\"toggleDark\":\"Przełącz na ciemny motyw\",\"toggleLight\":\"Przełącz na jasny motyw\"},\"home\":{\"header\":\"Calc\",\"positional\":\"Pozycyjne\",\"floating\":\"Zmiennoprzecinkowe\"},\"languageMenu\":{\"choose\":\"Wybierz język\"},\"baseConverter\":{\"title\":\"Konwersja podstaw\",\"result\":\"Wynik konwersji\",\"wrongBase\":\"Podstawa musi być pomiędzy {{minBase}} i {{maxBase}}\",\"wrongRepresentationStr\":\"Reprezentacja zawiera niepoprawne cyfry dla bazy {{base}}\",\"inputNumber\":\"Liczba wejściowa\",\"inputDecimalValue\":\"Wartość dziesiętna wejścia\",\"inputComplement\":\"Uzupełnienie wejścia\",\"inputBase\":\"Podstawa wejścia\",\"outputBase\":\"Podstawa wyniku\",\"outputNumber\":\"Liczba wyjściowa\",\"conversionToBase\":\"Kowersja do podstawy {{base}}\",\"conversionToDecimal\":\"Konwersja to dziesiętnej\",\"integralConversion\":\"Konwersja części całkowitej\",\"floatingConversion\":\"Konwersja części ułamkowej\",\"swapBases\":\"Zamień podstawy\",\"precision\":\"Precyzja\",\"convert\":\"Przekonwertuj\",\"showDecimalValue\":\"Pokaż wartość dziesiętną\",\"showComplement\":\"Pokaż uzupełnienie\"},\"associatedBaseConverter\":{\"title\":\"Konwersja przez bazy skojarzone\",\"result\":\"Wynik konwersji\",\"mappings\":\"Odwzorowania\",\"noOutputBase\":\"Brak opcji dla podstawy wyniku\"},\"floatConverter\":{\"title\":\"IEEE 754\",\"sign\":\"Znak\",\"exponent\":\"Wykładnik\",\"mantissa\":\"Mantysa\",\"entered\":\"Wprowadzona wartość\",\"stored\":\"Wartość przechowywana w reprezentacji\",\"binary\":\"Wartość binarna\"},\"complementConverter\":{\"title\":\"Uzupełnienie liczb\"},\"common\":{\"copy\":\"Skopiowano do schowka\"},\"positionalCalculator\":{\"title\":\"Kalkulator liczb pozycyjnych\"}}");

/***/ }),

/***/ "./main.tsx":
/*!******************!*\
  !*** ./main.tsx ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "../../../node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _app_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app */ "./app/app.tsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "../../../node_modules/react-redux/es/index.js");
/* harmony import */ var _app_store_configure_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app/store/configure-store */ "./app/store/configure-store.ts");





react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_3__["Provider"], {
  store: _app_store_configure_store__WEBPACK_IMPORTED_MODULE_4__["store"]
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_app_app__WEBPACK_IMPORTED_MODULE_2__["default"], null)), document.getElementById('root'));

/***/ }),

/***/ 0:
/*!************************!*\
  !*** multi ./main.tsx ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Jakub\WebstormProjects\calc\apps\calc-web\src\main.tsx */"./main.tsx");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map