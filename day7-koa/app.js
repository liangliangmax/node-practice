let koa = require("koa");

let app = new koa();

//中间件
app.use(async (ctx) => {
    ctx.body = "aaaa";
});



app.listen(3003);

