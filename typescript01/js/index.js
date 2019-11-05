"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Dog {
    constructor(name, age) {
        this._name = name;
        this._age = age;
    }
    getName() {
        console.log(this.getAge());
        return this._name;
    }
    setName(name) {
        this._name = name;
    }
    getAge() {
        return this._age;
    }
}
exports.default = Dog;
var Color;
(function (Color) {
    Color[Color["RED"] = 0] = "RED";
    Color[Color["GREEN"] = 1] = "GREEN";
    Color[Color["BLACK"] = 2] = "BLACK";
})(Color || (Color = {}));
