/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/background.js":
/*!******************************!*\
  !*** ./src/js/background.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var background = {
  game: null,
  frame: {
    sx: 0,
    sy: 0,
    sw: 288,
    sh: 511,
    dx: 0,
    dy: 0,
    dw: 288,
    dh: 511
  },
  update: function update() {
    this.game.renderSpriteFrame(this.frame);
  },
  init: function init(game) {
    this.game = game;
    this.frame.dh = game.canvas.height;
    this.frame.dw = game.canvas.width;
    this.frame.sh = game.canvas.height;
    this.frame.sw = game.canvas.width;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (background);

/***/ }),

/***/ "./src/js/birdie.js":
/*!**************************!*\
  !*** ./src/js/birdie.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ground__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ground */ "./src/js/ground.js");

var birdie = {
  game: null,
  frames: [{
    sx: 6,
    sy: 982
  }, {
    sx: 62,
    sy: 982
  }, {
    sx: 118,
    sy: 982
  }],
  maxAnimationStep: 0,
  animationStep: 0,
  counterInterval: 0,
  maxInterval: 5,
  width: 34,
  height: 24,
  x: 0,
  y: 0,
  fallSpeed: 0,
  maxFallSpeed: 7,
  init: function init(game) {
    this.game = game;
    this.x = this.width / 2 + 3;
    this.y = (game.canvas.height - _ground__WEBPACK_IMPORTED_MODULE_0__.default.frame.sh) / 2;
    this.maxAnimationStep = this.frames.length - 1;
  },
  update: function update() {
    if (this.game.hasStarted) {
      if (this.fallSpeed < this.maxFallSpeed) {
        this.fallSpeed += this.game.gravity;
      }

      this.y += this.fallSpeed;
      this.checkCollisionWithGround();
      this.checkCollisionWithTubes();
    }

    this.render();
  },
  render: function render() {
    this.counterInterval++;

    if (!(this.counterInterval % this.maxInterval)) {
      this.counterInterval = 0;
      this.animationStep = this.animationStep < this.maxAnimationStep ? this.animationStep + 1 : 0;
    }

    this.game.context.save();
    this.game.context.translate(this.x, this.y);
    this.game.context.rotate(this.fallSpeed / this.maxFallSpeed);
    this.game.renderSpriteFrame({
      sx: this.frames[this.animationStep].sx,
      sy: this.frames[this.animationStep].sy,
      sw: this.width,
      sh: this.height,
      dx: -this.width / 2,
      dy: -this.height / 2,
      dw: this.width,
      dh: this.height
    });
    this.game.context.restore();
  },
  goUp: function goUp() {
    this.fallSpeed = -this.maxFallSpeed;
  },
  checkCollisionWithGround: function checkCollisionWithGround() {
    if (this.y + this.height / 2 > _ground__WEBPACK_IMPORTED_MODULE_0__.default.frame.dy) {
      this.y = _ground__WEBPACK_IMPORTED_MODULE_0__.default.frame.dy - this.height / 2;
      this.goUp();
    }
  },
  checkCollisionWithTubes: function checkCollisionWithTubes() {
    var _this = this;

    this.game.tubesPairs.forEach(function (tubePair) {
      if (_this.x + _this.width / 2 > tubePair.x && _this.x - _this.width / 2 < tubePair.x + tubePair.width) {
        if (_this.y - _this.height / 2 < tubePair.yTop + tubePair.height || _this.y + _this.height / 2 > tubePair.yBottom) {
          _this.game.cancelAnimation();
        }
      }
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (birdie);

/***/ }),

/***/ "./src/js/gameController.js":
/*!**********************************!*\
  !*** ./src/js/gameController.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _birdie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./birdie */ "./src/js/birdie.js");

var gameController = {
  init: function init(game) {
    window.addEventListener('keydown', function (event) {
      if (event.key === 'j') {
        if (!game.hasStarted) {
          game.hasStarted = true;
        }

        _birdie__WEBPACK_IMPORTED_MODULE_0__.default.goUp();
      }
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameController);

/***/ }),

/***/ "./src/js/ground.js":
/*!**************************!*\
  !*** ./src/js/ground.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var ground = {
  game: null,
  frame: {
    sx: 584,
    sy: 0,
    sw: 336,
    sh: 112,
    dx: 0,
    dy: 0,
    dw: 336,
    dh: 112
  },
  speed: 3,
  maxOffset: 0,
  update: function update() {
    if (this.frame.dx <= -this.maxOffset) {
      this.frame.dx = 0;
    }

    this.frame.dx -= this.speed;
    this.game.renderSpriteFrame(this.frame);
  },
  init: function init(game) {
    this.game = game;
    this.maxOffset = this.frame.sw - game.canvas.width;
    this.frame.dy = game.canvas.height - this.frame.sh;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ground);

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gameController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameController */ "./src/js/gameController.js");
/* harmony import */ var _background__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./background */ "./src/js/background.js");
/* harmony import */ var _tubesPairs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tubesPairs */ "./src/js/tubesPairs.js");
/* harmony import */ var _ground__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ground */ "./src/js/ground.js");
/* harmony import */ var _birdie__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./birdie */ "./src/js/birdie.js");





var game = {
  canvas: document.getElementById('game'),
  context: null,
  spriteSheetSrc: './resources/sprite.png',
  sprite: new Image(),
  gravity: 0.9,
  hasStarted: false,
  tubesPairs: [],
  frameCounter: 0,
  frameInterval: 80,
  maxTubesPairs: 3,
  requestId: 0,
  init: function init() {
    var _this = this;

    this.context = this.canvas.getContext('2d');
    this.sprite.src = this.spriteSheetSrc;
    this.sprite.addEventListener('load', function () {
      _gameController__WEBPACK_IMPORTED_MODULE_0__.default.init(_this);
      _background__WEBPACK_IMPORTED_MODULE_1__.default.init(_this);
      _ground__WEBPACK_IMPORTED_MODULE_3__.default.init(_this);
      _birdie__WEBPACK_IMPORTED_MODULE_4__.default.init(_this);

      _this.animate();
    });
  },
  animate: function animate() {
    var _this2 = this;

    this.requestId = window.requestAnimationFrame(function () {
      _this2.animate();
    });
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    _background__WEBPACK_IMPORTED_MODULE_1__.default.update();

    if (this.hasStarted) {
      if (this.frameCounter++ > this.frameInterval) {
        if (this.tubesPairs.length >= this.maxTubesPairs) {
          this.tubesPairs.splice(0, 1);
        }

        this.tubesPairs.push(new _tubesPairs__WEBPACK_IMPORTED_MODULE_2__.default(this));
        this.frameCounter = 0;
      }

      this.tubesPairs.forEach(function (tubePair) {
        tubePair.update();
      });
    }

    _ground__WEBPACK_IMPORTED_MODULE_3__.default.update();
    _birdie__WEBPACK_IMPORTED_MODULE_4__.default.update();
  },
  renderSpriteFrame: function renderSpriteFrame(coordinates) {
    this.context.drawImage(this.sprite, coordinates.sx, coordinates.sy, coordinates.sw, coordinates.sh, coordinates.dx, coordinates.dy, coordinates.dw, coordinates.dh);
  },
  cancelAnimation: function cancelAnimation() {
    window.cancelAnimationFrame(this.requestId);
  }
};
game.init();

/***/ }),

/***/ "./src/js/tubesPairs.js":
/*!******************************!*\
  !*** ./src/js/tubesPairs.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TubesPairs)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TubesPairs = /*#__PURE__*/function () {
  function TubesPairs(game) {
    _classCallCheck(this, TubesPairs);

    this.game = game;
    this.spaceBetweenTubes = 80;
    this.x = game.canvas.width;
    this.speed = 3;
    this.width = 52;
    this.height = 317;
    this.yTop = -Math.floor(Math.random() * 280) - 25;
    this.yBottom = this.yTop + this.height + this.spaceBetweenTubes;
    this.tubeTopFrame = {
      sx: 113,
      sy: 647,
      sw: this.width,
      sh: this.height,
      dx: 0,
      dy: 0,
      dw: this.width,
      dh: this.height
    };
    this.tubeBottomFrame = {
      sx: 168,
      sy: 647,
      sw: this.width,
      sh: this.height,
      dx: 0,
      dy: 0,
      dw: this.width,
      dh: this.height
    };
  }

  _createClass(TubesPairs, [{
    key: "update",
    value: function update() {
      this.x -= this.speed;
      this.render();
    }
  }, {
    key: "render",
    value: function render() {
      // Tube du haut
      this.game.context.save();
      this.game.context.translate(this.x, this.yTop);
      this.game.renderSpriteFrame(this.tubeTopFrame);
      this.game.context.restore(); // Tube du bas

      this.game.context.save();
      this.game.context.translate(this.x, this.yBottom);
      this.game.renderSpriteFrame(this.tubeBottomFrame);
      this.game.context.restore();
    }
  }]);

  return TubesPairs;
}();


;

/***/ }),

/***/ "./src/scss/main.scss":
/*!****************************!*\
  !*** ./src/scss/main.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	// It's empty as some runtime module handles the default behavior
/******/ 	__webpack_require__.x = x => {};
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/main": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["./src/js/main.js"],
/******/ 			["./src/scss/main.scss"]
/******/ 		];
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		var checkDeferredModules = x => {};
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime, executeModules] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0, resolves = [];
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					resolves.push(installedChunks[chunkId][0]);
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			while(resolves.length) {
/******/ 				resolves.shift()();
/******/ 			}
/******/ 		
/******/ 			// add entry modules from loaded chunk to deferred list
/******/ 			if(executeModules) deferredModules.push.apply(deferredModules, executeModules);
/******/ 		
/******/ 			// run deferred modules when all chunks ready
/******/ 			return checkDeferredModules();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkflappy_bird"] = self["webpackChunkflappy_bird"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 		
/******/ 		function checkDeferredModulesImpl() {
/******/ 			var result;
/******/ 			for(var i = 0; i < deferredModules.length; i++) {
/******/ 				var deferredModule = deferredModules[i];
/******/ 				var fulfilled = true;
/******/ 				for(var j = 1; j < deferredModule.length; j++) {
/******/ 					var depId = deferredModule[j];
/******/ 					if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferredModules.splice(i--, 1);
/******/ 					result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 				}
/******/ 			}
/******/ 			if(deferredModules.length === 0) {
/******/ 				__webpack_require__.x();
/******/ 				__webpack_require__.x = x => {};
/******/ 			}
/******/ 			return result;
/******/ 		}
/******/ 		var startup = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			// reset startup function so it can be called again when more startup code is added
/******/ 			__webpack_require__.x = startup || (x => {});
/******/ 			return (checkDeferredModules = checkDeferredModulesImpl)();
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	
/******/ })()
;