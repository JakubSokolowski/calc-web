(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["components-base-converter-view-base-converter-view"],{

/***/ "../../../libs/calc-rs/pkg/index.js":
/*!**********************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/calc-rs/pkg/index.js ***!
  \**********************************************************************/
/*! exports provided: lmao, __wbg_log_0a1aa0920fe2d052 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index_bg.wasm */ "../../../libs/calc-rs/pkg/index_bg.wasm");
/* harmony import */ var _index_bg_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index_bg.js */ "../../../libs/calc-rs/pkg/index_bg.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "lmao", function() { return _index_bg_js__WEBPACK_IMPORTED_MODULE_1__["lmao"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "__wbg_log_0a1aa0920fe2d052", function() { return _index_bg_js__WEBPACK_IMPORTED_MODULE_1__["__wbg_log_0a1aa0920fe2d052"]; });




/***/ }),

/***/ "../../../libs/calc-rs/pkg/index_bg.js":
/*!*************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/calc-rs/pkg/index_bg.js ***!
  \*************************************************************************/
/*! exports provided: lmao, __wbg_log_0a1aa0920fe2d052 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lmao", function() { return lmao; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbg_log_0a1aa0920fe2d052", function() { return __wbg_log_0a1aa0920fe2d052; });
/* harmony import */ var _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index_bg.wasm */ "../../../libs/calc-rs/pkg/index_bg.wasm");

var lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;
var cachedTextDecoder = new lTextDecoder('utf-8', {
  ignoreBOM: true,
  fatal: true
});
cachedTextDecoder.decode();
var cachegetUint8Memory0 = null;

function getUint8Memory0() {
  if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["memory"].buffer) {
    cachegetUint8Memory0 = new Uint8Array(_index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["memory"].buffer);
  }

  return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}
/**
*/


function lmao() {
  _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["lmao"]();
}
var __wbg_log_0a1aa0920fe2d052 = function __wbg_log_0a1aa0920fe2d052(arg0, arg1) {
  console.log(getStringFromWasm0(arg0, arg1));
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "../../../node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "../../../libs/calc-rs/pkg/index_bg.wasm":
/*!***************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/calc-rs/pkg/index_bg.wasm ***!
  \***************************************************************************/
/*! exports provided: memory, lmao */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Instantiate WebAssembly module
var wasmExports = __webpack_require__.w[module.i];
__webpack_require__.r(exports);
// export exports from WebAssembly module
for(var name in wasmExports) if(name != "__webpack_init__") exports[name] = wasmExports[name];
// exec imports from WebAssembly module (for esm order)
/* harmony import */ var m0 = __webpack_require__(/*! ./index_bg.js */ "../../../libs/calc-rs/pkg/index_bg.js");


// exec wasm module
wasmExports["__webpack_init__"]()

/***/ }),

/***/ "./app/components/base-converter-view/base-converter-view.tsx":
/*!********************************************************************!*\
  !*** ./app/components/base-converter-view/base-converter-view.tsx ***!
  \********************************************************************/
/*! exports provided: BaseConverterView, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseConverterView", function() { return BaseConverterView; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _base_converter_base_converter_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../base-converter/base-converter-component */ "./app/components/base-converter/base-converter-component.tsx");
/* harmony import */ var _conversion_details_conversion_details__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../conversion-details/conversion-details */ "./app/components/conversion-details/conversion-details.tsx");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core */ "../../../node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _calc_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @calc/ui */ "../../../libs/ui/src/index.ts");
/* harmony import */ var _calc_docs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @calc/docs */ "../../../libs/docs/src/index.ts");
/* harmony import */ var _core_styles_converter_styles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/styles/converter-styles */ "./app/core/styles/converter-styles.ts");
/* harmony import */ var _calc_calc_rs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @calc/calc-rs */ "../../../libs/calc-rs/pkg/index.js");









var BaseConverterView = () => {
  var {
    t
  } = Object(react_i18next__WEBPACK_IMPORTED_MODULE_3__["useTranslation"])();
  var [conversion, setConversion] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  var [precision, setPrecision] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(5);
  var classes = Object(_core_styles_converter_styles__WEBPACK_IMPORTED_MODULE_7__["useConverterStyles"])();

  var onChange = (newConversion, precision) => {
    if (newConversion) {
      setConversion(newConversion);
      setPrecision(precision);
    }
  };

  Object(_calc_calc_rs__WEBPACK_IMPORTED_MODULE_8__["lmao"])();
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
  }, t('baseConverter.title')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_base_converter_base_converter_component__WEBPACK_IMPORTED_MODULE_1__["BaseConverterComponent"], {
    onConversionChange: onChange
  }), conversion && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_conversion_details_conversion_details__WEBPACK_IMPORTED_MODULE_2__["ConversionDetails"], {
    conversion: conversion,
    precision: precision
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
    path: 'positional/base-conversion'
  }))));
};
/* harmony default export */ __webpack_exports__["default"] = (BaseConverterView);

/***/ }),

/***/ "./app/components/base-converter/base-converter-component.tsx":
/*!********************************************************************!*\
  !*** ./app/components/base-converter/base-converter-component.tsx ***!
  \********************************************************************/
/*! exports provided: BaseConverterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseConverterComponent", function() { return BaseConverterComponent; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _calc_calc_arithmetic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @calc/calc-arithmetic */ "../../../libs/calc-arithmetic/src/index.ts");
/* harmony import */ var _ant_design_icons_lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ant-design/icons/lib */ "../../../node_modules/@ant-design/icons/lib/index.js");
/* harmony import */ var _ant_design_icons_lib__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons_lib__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _calc_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @calc/ui */ "../../../libs/ui/src/index.ts");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "../../../node_modules/react-redux/es/index.js");
/* harmony import */ var _store_selectors_options_selectors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store/selectors/options.selectors */ "./app/store/selectors/options.selectors.ts");
/* harmony import */ var _conversion_options_conversion_options__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../conversion-options/conversion-options */ "./app/components/conversion-options/conversion-options.tsx");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core */ "../../../node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _calc_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @calc/utils */ "../../../libs/utils/src/index.ts");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! formik */ "../../../node_modules/formik/dist/formik.esm.js");
/* harmony import */ var _core_styles_converter_styles__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../core/styles/converter-styles */ "./app/core/styles/converter-styles.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }













var BaseConverterComponent = (_ref) => {
  var {
    onConversionChange
  } = _ref;
  var showComplement = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["useSelector"])(_store_selectors_options_selectors__WEBPACK_IMPORTED_MODULE_5__["selectShowComplement"]);
  var showDecimalValue = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["useSelector"])(_store_selectors_options_selectors__WEBPACK_IMPORTED_MODULE_5__["selectShowDecimalValue"]);
  var {
    t
  } = Object(react_i18next__WEBPACK_IMPORTED_MODULE_7__["useTranslation"])();
  var classes = Object(_core_styles_converter_styles__WEBPACK_IMPORTED_MODULE_11__["useConverterStyles"])();
  var initialValues = {
    inputStr: '123.45',
    inputBase: 10,
    outputBase: 2,
    precision: 10
  };

  var onSubmit = values => {
    var {
      inputStr,
      inputBase,
      outputBase,
      precision
    } = values;
    var conversion = Object(_calc_calc_arithmetic__WEBPACK_IMPORTED_MODULE_1__["fromString"])(inputStr, inputBase, outputBase);
    onConversionChange(conversion, precision);
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

  var form = Object(formik__WEBPACK_IMPORTED_MODULE_10__["useFormik"])({
    initialValues,
    onSubmit,
    validate
  });
  var [inputValue] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(initialValues.inputStr);
  var [inputBase] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(initialValues.inputBase);

  var swap = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(function* () {
      var {
        inputBase,
        outputBase
      } = form.values;
      form.setFieldValue('inputBase', outputBase);
      form.setFieldValue('outputBase', inputBase);
      yield form.validateForm();
    });

    return function swap() {
      return _ref2.apply(this, arguments);
    };
  }();

  var getDecimal = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(() => {
    try {
      if (inputBase === 10) return inputValue;
      return Object(_calc_calc_arithmetic__WEBPACK_IMPORTED_MODULE_1__["fromString"])(inputValue, inputBase, 10).result.decimalValue.toString();
    } catch (e) {
      console.log(e);
      return '0.0';
    }
  }, [inputBase, inputValue]);
  var getComplement = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(() => {
    try {
      return _calc_calc_arithmetic__WEBPACK_IMPORTED_MODULE_1__["ComplementConverter"].getComplement(inputValue, inputBase).toString();
    } catch (e) {
      console.log(e);
      return '0.0';
    }
  }, [inputBase, inputValue]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_8__["Card"], {
    className: classes.card
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_conversion_options_conversion_options__WEBPACK_IMPORTED_MODULE_6__["ConversionOptions"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
    onSubmit: form.handleSubmit
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_calc_ui__WEBPACK_IMPORTED_MODULE_3__["InputWithCopy"], {
    className: classes.input,
    name: 'inputStr',
    id: 'inputStr',
    label: t('baseConverter.inputNumber'),
    error: !!form.errors.inputStr,
    helperText: form.errors.inputStr,
    onChange: form.handleChange,
    value: form.values.inputStr
  }), showDecimalValue && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_calc_ui__WEBPACK_IMPORTED_MODULE_3__["InputWithCopy"], {
    className: classes.input,
    label: t('baseConverter.inputDecimalValue'),
    readOnly: true,
    value: getDecimal()
  }), showComplement && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_calc_ui__WEBPACK_IMPORTED_MODULE_3__["InputWithCopy"], {
    className: classes.input,
    label: t('baseConverter.inputComplement'),
    readOnly: true,
    value: getComplement()
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.row
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_8__["TextField"], {
    className: classes.inputBase,
    variant: 'outlined',
    name: 'inputBase',
    id: 'inputBase',
    label: t('baseConverter.inputBase'),
    error: !!form.errors.inputBase,
    helperText: form.errors.inputBase,
    onChange: form.handleChange,
    value: form.values.inputBase
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_8__["Tooltip"], {
    title: t('baseConverter.swapBases')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_8__["IconButton"], {
    onClick: swap
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ant_design_icons_lib__WEBPACK_IMPORTED_MODULE_2__["SwapOutlined"], null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_8__["TextField"], {
    className: classes.outputBase,
    variant: 'outlined',
    name: 'outputBase',
    id: 'outputBase',
    label: t('baseConverter.outputBase'),
    error: !!form.errors.outputBase,
    helperText: form.errors.outputBase,
    onChange: form.handleChange,
    value: form.values.outputBase
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.horizontalSpacer
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_8__["TextField"], {
    className: classes.precision,
    variant: 'outlined',
    name: 'precision',
    id: 'precision',
    label: t('baseConverter.precision'),
    error: !!form.errors.precision,
    helperText: form.errors.precision,
    onChange: form.handleChange,
    value: form.values.precision
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.horizontalSpacer
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_8__["Button"], {
    color: 'secondary',
    variant: 'contained',
    type: 'submit'
  }, t('baseConverter.convert')))));
};

/***/ }),

/***/ "./app/components/conversion-details/conversion-details.tsx":
/*!******************************************************************!*\
  !*** ./app/components/conversion-details/conversion-details.tsx ***!
  \******************************************************************/
/*! exports provided: ConversionDetails */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConversionDetails", function() { return ConversionDetails; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _calc_calc_arithmetic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @calc/calc-arithmetic */ "../../../libs/calc-arithmetic/src/index.ts");
/* harmony import */ var _calc_grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @calc/grid */ "../../../libs/grid/src/index.ts");
/* harmony import */ var _result_equation_result_equation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./result-equation/result-equation */ "./app/components/conversion-details/result-equation/result-equation.tsx");
/* harmony import */ var _integral_conversion_row_integral_conversion_row__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./integral-conversion-row/integral-conversion-row */ "./app/components/conversion-details/integral-conversion-row/integral-conversion-row.tsx");
/* harmony import */ var _conversion_to_decimal_conversion_to_decimal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../conversion-to-decimal/conversion-to-decimal */ "./app/components/conversion-to-decimal/conversion-to-decimal.tsx");
/* harmony import */ var _fractional_conversion_row_fractional_conversion_row__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./fractional-conversion-row/fractional-conversion-row */ "./app/components/conversion-details/fractional-conversion-row/fractional-conversion-row.tsx");
/* harmony import */ var _calc_ui__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @calc/ui */ "../../../libs/ui/src/index.ts");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core */ "../../../node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _core_styles_converter_styles__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../core/styles/converter-styles */ "./app/core/styles/converter-styles.ts");











var ConversionDetails = (_ref) => {
  var {
    conversion,
    precision
  } = _ref;
  var {
    t
  } = Object(react_i18next__WEBPACK_IMPORTED_MODULE_9__["useTranslation"])();
  var classes = Object(_core_styles_converter_styles__WEBPACK_IMPORTED_MODULE_10__["useConverterStyles"])();
  var fractionalHoverGrid = conversion.result.fractionalPart.length > 0 ? Object(_calc_grid__WEBPACK_IMPORTED_MODULE_2__["buildFractionalConversionGrid"])(conversion, precision) : undefined;
  var integralHoverGrid = Object(_calc_grid__WEBPACK_IMPORTED_MODULE_2__["buildIntegralConversionGrid"])(conversion);

  var floatingHoverPopover = hoverProps => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fractional_conversion_row_fractional_conversion_row__WEBPACK_IMPORTED_MODULE_6__["FractionalConversionRow"], hoverProps);
  };

  var integralHoverPopover = hoverProps => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_integral_conversion_row_integral_conversion_row__WEBPACK_IMPORTED_MODULE_4__["IntegralConversionRow"], hoverProps);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_8__["Typography"], {
    variant: 'h4',
    className: classes.title
  }, t('baseConverter.result')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_8__["Card"], {
    className: classes.card
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "integral-conversion-details"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_calc_ui__WEBPACK_IMPORTED_MODULE_7__["InputWithCopy"], {
    readOnly: true,
    className: classes.input,
    label: t('baseConverter.outputNumber'),
    value: conversion.result.toString(precision)
  }), conversion.type === _calc_calc_arithmetic__WEBPACK_IMPORTED_MODULE_1__["ConversionType"].DIRECT ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.equation
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_8__["Typography"], null, "I. ".concat(t('baseConverter.conversionToBase', {
    base: conversion.result.base
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_result_equation_result_equation__WEBPACK_IMPORTED_MODULE_3__["ResultEquation"], {
    conversion: conversion,
    firstStage: 0,
    lastStage: 0
  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.equation
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_8__["Typography"], null, "I. ".concat(t('baseConverter.conversionToDecimal'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_conversion_to_decimal_conversion_to_decimal__WEBPACK_IMPORTED_MODULE_5__["ConversionToDecimalDetails"], {
    conversionStage: conversion.getFirstStage()
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.equation
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_8__["Typography"], null, "II. ".concat(t('baseConverter.conversionToBase', {
    base: conversion.result.base
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_result_equation_result_equation__WEBPACK_IMPORTED_MODULE_3__["ResultEquation"], {
    conversion: conversion,
    firstStage: 1,
    lastStage: 1
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.row
  }, integralHoverGrid && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_calc_grid__WEBPACK_IMPORTED_MODULE_2__["HoverGrid"], Object.assign({}, integralHoverGrid, {
    title: t('baseConverter.integralConversion'),
    groupBuilder: integralHoverPopover
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.horizontalSpacer
  }), fractionalHoverGrid && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_calc_grid__WEBPACK_IMPORTED_MODULE_2__["HoverGrid"], Object.assign({}, fractionalHoverGrid, {
    title: t('baseConverter.floatingConversion'),
    groupBuilder: floatingHoverPopover
  }))))));
};

/***/ }),

/***/ "./app/components/conversion-details/fractional-conversion-row/fractional-conversion-row.tsx":
/*!***************************************************************************************************!*\
  !*** ./app/components/conversion-details/fractional-conversion-row/fractional-conversion-row.tsx ***!
  \***************************************************************************************************/
/*! exports provided: FractionalConversionRow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FractionalConversionRow", function() { return FractionalConversionRow; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var FractionalConversionRow = (_ref) => {
  var {
    result,
    multiplier,
    base
  } = _ref;
  var [digit, rest] = result.split('.');
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "".concat(multiplier, " * ").concat(base, " = "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    style: {
      fontWeight: 'bold'
    }
  }, digit, "."), rest), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "".concat(result, " % 1 = 0.").concat(rest)));
};

/***/ }),

/***/ "./app/components/conversion-details/integral-conversion-row/integral-conversion-row.tsx":
/*!***********************************************************************************************!*\
  !*** ./app/components/conversion-details/integral-conversion-row/integral-conversion-row.tsx ***!
  \***********************************************************************************************/
/*! exports provided: IntegralConversionRow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IntegralConversionRow", function() { return IntegralConversionRow; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var IntegralConversionRow = (_ref) => {
  var {
    result,
    base,
    dividend,
    remainder
  } = _ref;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "".concat(dividend, " / ").concat(base, " = ").concat(result, " r "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    style: {
      fontWeight: 'bold'
    }
  }, remainder));
};

/***/ }),

/***/ "./app/components/conversion-details/result-equation/result-equation.tsx":
/*!*******************************************************************************!*\
  !*** ./app/components/conversion-details/result-equation/result-equation.tsx ***!
  \*******************************************************************************/
/*! exports provided: ResultEquation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResultEquation", function() { return ResultEquation; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _calc_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @calc/ui */ "../../../libs/ui/src/index.ts");


var ResultEquation = (_ref) => {
  var {
    conversion,
    firstStage,
    lastStage
  } = _ref;
  if (!conversion) return null;
  var input = conversion.getStage(firstStage);
  var output = conversion.getStage(lastStage);
  var [num, base] = input.input;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_calc_ui__WEBPACK_IMPORTED_MODULE_1__["NumberSubscript"], {
    value: num,
    subscript: base
  }), "\xA0=\xA0", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_calc_ui__WEBPACK_IMPORTED_MODULE_1__["NumberSubscript"], {
    value: output.result.toString(),
    subscript: output.result.base
  }));
};

/***/ }),

/***/ "./app/components/conversion-to-decimal/conversion-to-decimal.tsx":
/*!************************************************************************!*\
  !*** ./app/components/conversion-to-decimal/conversion-to-decimal.tsx ***!
  \************************************************************************/
/*! exports provided: ConversionToDecimalDetails */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConversionToDecimalDetails", function() { return ConversionToDecimalDetails; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _calc_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @calc/ui */ "../../../libs/ui/src/index.ts");


var ConversionToDecimalDetails = (_ref) => {
  var {
    conversionStage
  } = _ref;
  var [inputStr, inputBase] = conversionStage.input;
  var digits = conversionStage.inputDigitList.map((digit, index, arr) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      key: index
    }, digit.valueInBase, "*", digit.base, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("sup", null, digit.position), index !== arr.length - 1 && ' + ');
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "decimal-conversion-details",
    style: {
      display: 'inline-block'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_calc_ui__WEBPACK_IMPORTED_MODULE_1__["NumberSubscript"], {
    value: inputStr,
    subscript: inputBase
  }), "\xA0=\xA0", digits, "\xA0=\xA0", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_calc_ui__WEBPACK_IMPORTED_MODULE_1__["NumberSubscript"], {
    value: conversionStage.result.valueInBase,
    subscript: conversionStage.result.base
  })));
};

/***/ })

}]);
//# sourceMappingURL=components-base-converter-view-base-converter-view.js.map