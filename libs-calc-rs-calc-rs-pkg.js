(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["libs-calc-rs-calc-rs-pkg"],{

/***/ "../../../libs/calc-rs/calc-rs/pkg/calc_rs.js":
/*!********************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/calc-rs/calc-rs/pkg/calc_rs.js ***!
  \********************************************************************************/
/*! exports provided: greet, __wbg_alert_b58c044de101540b */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _calc_rs_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calc_rs_bg.wasm */ "../../../libs/calc-rs/calc-rs/pkg/calc_rs_bg.wasm");
/* harmony import */ var _calc_rs_bg_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calc_rs_bg.js */ "../../../libs/calc-rs/calc-rs/pkg/calc_rs_bg.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "greet", function() { return _calc_rs_bg_js__WEBPACK_IMPORTED_MODULE_1__["greet"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "__wbg_alert_b58c044de101540b", function() { return _calc_rs_bg_js__WEBPACK_IMPORTED_MODULE_1__["__wbg_alert_b58c044de101540b"]; });




/***/ }),

/***/ "../../../libs/calc-rs/calc-rs/pkg/calc_rs_bg.js":
/*!***********************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/calc-rs/calc-rs/pkg/calc_rs_bg.js ***!
  \***********************************************************************************/
/*! exports provided: greet, __wbg_alert_b58c044de101540b */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "greet", function() { return greet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbg_alert_b58c044de101540b", function() { return __wbg_alert_b58c044de101540b; });
/* harmony import */ var _calc_rs_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calc_rs_bg.wasm */ "../../../libs/calc-rs/calc-rs/pkg/calc_rs_bg.wasm");

var lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;
var cachedTextDecoder = new lTextDecoder('utf-8', {
  ignoreBOM: true,
  fatal: true
});
cachedTextDecoder.decode();
var cachegetUint8Memory0 = null;

function getUint8Memory0() {
  if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== _calc_rs_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["memory"].buffer) {
    cachegetUint8Memory0 = new Uint8Array(_calc_rs_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["memory"].buffer);
  }

  return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}
/**
*/


function greet() {
  _calc_rs_bg_wasm__WEBPACK_IMPORTED_MODULE_0__["greet"]();
}
var __wbg_alert_b58c044de101540b = function __wbg_alert_b58c044de101540b(arg0, arg1) {
  alert(getStringFromWasm0(arg0, arg1));
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "../../../node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "../../../libs/calc-rs/calc-rs/pkg/calc_rs_bg.wasm":
/*!*************************************************************************************!*\
  !*** C:/Users/Jakub/WebstormProjects/calc/libs/calc-rs/calc-rs/pkg/calc_rs_bg.wasm ***!
  \*************************************************************************************/
/*! exports provided: memory, greet */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Instantiate WebAssembly module
var wasmExports = __webpack_require__.w[module.i];
__webpack_require__.r(exports);
// export exports from WebAssembly module
for(var name in wasmExports) if(name != "__webpack_init__") exports[name] = wasmExports[name];
// exec imports from WebAssembly module (for esm order)
/* harmony import */ var m0 = __webpack_require__(/*! ./calc_rs_bg.js */ "../../../libs/calc-rs/calc-rs/pkg/calc_rs_bg.js");


// exec wasm module
wasmExports["__webpack_init__"]()

/***/ })

}]);
//# sourceMappingURL=libs-calc-rs-calc-rs-pkg.js.map