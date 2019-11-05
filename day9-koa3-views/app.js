let Koa = require("koa");

let router = require("./router");

let app = new Koa();

let views = require("koa-views");

let bodyparser = require("koa-bodyparser");

let static = require("koa-static");

//视图解析器
app.use(views(__dirname+"/views",{
    extension:"ejs"
}));

//静态资源
app.use(static(__dirname+"/static"));

//post参数解析
app.use(bodyparser());
//路由
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3003);
