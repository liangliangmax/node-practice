let Koa = require("koa");

let router = require("koa-router")();

let Db = require("./MongoDb")


let app = new Koa();


router.get('/',async (ctx)=>{

    console.log(111)

    let result =await Db.find("goods",{});

    console.log(result);
    ctx.body = 111;
});

app.use(router.routes());
app.use(router.allowedMethods());


app.listen(3000);