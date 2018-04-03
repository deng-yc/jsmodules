"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var decorate_1 = require("./decorate");
var Modal = /** @class */ (function () {
    function Modal() {
        this.name = "";
    }
    tslib_1.__decorate([
        decorate_1.isRequired()
    ], Modal.prototype, "name", void 0);
    Modal = tslib_1.__decorate([
        decorate_1.validator
    ], Modal);
    return Modal;
}());
var model = new Modal();
exports.debugCode = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var model, output;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                model = new Modal();
                return [4 /*yield*/, model.vaildate()];
            case 1:
                output = _a.sent();
                console.log(output, model);
                return [2 /*return*/];
        }
    });
}); };
