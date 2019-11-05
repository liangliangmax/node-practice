"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const UserController_1 = require("./controller/UserController");
const port_1 = require("./config/port");
let Koa = require("koa");
let app = new Koa();
app.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const start = new Date();
    yield next();
    const ms = (new Date() - start);
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
}));
routing_controllers_1.useKoaServer(app, {
    controllers: [UserController_1.UserController] // we specify controllers we want to use
});
// run express application on port 3000
app.listen(port_1.port);
