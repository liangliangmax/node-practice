let router = require("koa-router")();


router.get('/',async (ctx)=>{

    await ctx.render('index',{
        title:1235
    });
});

router.post("/login",async (ctx)=>{

    console.log(ctx.request.body.username);
    ctx.body = ctx.request.body;

});

module.exports = router;