let Koa = require("koa");

let app = new Koa();

let router = require('./router01');


//中间件，匹配任何路由
app.use(async (ctx,next)=>{

    console.log(new Date());

    //继续向下匹配
    await next();

    if(ctx.status == 404){
        ctx.status = 404;
        ctx.body = "404";
    }else {
        console.log("aaaa "+ctx.url)
    }

});

app
    .use(router.routes())
    .use(router.allowedMethods());


app.listen(3003);

console.log("listening at 3003");