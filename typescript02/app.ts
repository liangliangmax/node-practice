import "reflect-metadata"

import {createKoaServer, useKoaServer} from "routing-controllers";

import {UserController} from "./controller/UserController";

import {port} from "./config/port";

let Koa = require("koa");

let app = new Koa();

app.use(async (ctx, next) => {
    const start:Date = new Date()
    await next()
    const ms:number = (new Date() - start)
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});

useKoaServer(app,{
    controllers: [UserController] // we specify controllers we want to use
});


// run express application on port 3000
app.listen(port);