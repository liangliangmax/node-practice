import "reflect-metadata"

import {useKoaServer} from "routing-controllers";

import {port} from "./config/port";

const UserController = require("./controller/UserController");

const bodyParser = require( "koa-bodyparser");

const logger = require('koa-logger')
const views = require('koa-views')
const path = require('path')


let Koa = require("koa");

let app = new Koa();

app
    .use(bodyParser())
    .use(logger())
    .use(require('koa-static')(__dirname + '../public'))
    .use(views(path.join(__dirname, '../views'), {
        options: {settings: {views: path.join(__dirname, 'views')}},
        map: {'ejs': 'ejs'},
        extension: 'ejs'
    }));


app.use(async (ctx:any, next:any) => {
    const start:any = new Date()
    await next()
    const end:any = new Date()
    const ms:number = ( end - start)
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});

useKoaServer(app,{
    controllers: [__dirname + "/controller/*.js"] // we specify controllers we want to use
});

app.on('error', function(err:any, ctx:any) {
    console.log(err)
    logger.error('server error', err, ctx)
})

// run express application on port 3000
module.exports = app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})