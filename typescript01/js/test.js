"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
class Dig extends index_1.default {
}
Dig.hha = "aaa";
let dog = new index_1.default("zhangsan", 21);
console.log(dog.getName());
let dig = new Dig("lisi", 30);
dig.setName("9292929");
console.log(dig.getName());
console.log(Dig.hha);
console.log("==================================");
class Asia {
    say() {
        console.log("say");
    }
}
class Li extends Asia {
    eat() {
        console.log("eat");
    }
}
let li = new Li();
li.eat();
li.say();
