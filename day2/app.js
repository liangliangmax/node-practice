let express = require('express');

let app = express();

let userRouter = express.Router();


app.use('/user',userRouter);

userRouter.get('/:id/:name',function (req,res) {
    res.send("hello id="+req.params.id+" name = "+req.params.name)
});

userRouter.param('id',function (req,res,next,id) {

    console.log(id)

    next();
});

userRouter.param('name',function (req,res,next,name) {

    console.log(name)

    next();
});




app.listen(3000);