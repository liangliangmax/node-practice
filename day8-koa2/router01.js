let Router = require("koa-router");

let router = new Router();

router.get('/', async (ctx)=> {

    ctx.body = 'aafsfds';
});


//路由级中间件
router.get('/news',async (ctx,next)=>{

    console.log("news")
    await next();
});

router.get('/news',async (ctx)=>{

    //获取get参数
    console.log(ctx.query); //{ id: '123' }

    console.log(ctx.request.query); //{ id: '123' }

    console.log(ctx.querystring); //id=123

    //console.log(ctx.request);

    ctx.body = 'news';
});


//http://localhost:3003/newcontent/fdafdsaf
router.get('/newcontent/:id',async (ctx)=>{

    console.log(ctx.params);

    ctx.body = ctx.params;
});


module.exports = router