const
    Router = require('koa-router'),
    cheerio = require('cheerio'),

    request = require('superagent'),
    superagent = require('superagent-charset')(request),
    url = require("url"),
    fs = require("fs"),
    router = new Router();

router.prefix("/pic")

router.get('/',async (ctx)=>{

    ctx.body = "aaa";
});

router.get('/pic',async (ctx)=>{

    superagent
        .get("https://i5.meizitu.net/2019/06/16c39.jpg")
        .end(function(err, sres) {
            if (err) {
                console.log(err);
                return;
            }
            fs.writeFile("/Volumes/ESD-USB/pic/aaa.jpg", sres.body, "binary", function(err) {
                if (err) throw err;
            });
        });



    ctx.body = 111;
})


let run = true;

router.get("/stop",async (ctx)=>{

    run = false;

});


router.get('/getPic',async (ctx)=>{

    let urlStr = 'https://www.mzitu.com/110053/53';
    //从文件里面读取
    urlStr = readFile('d://pic//path.txt');

    let img = null;
    let i = 0;

    let pathHeader = "";

    while (run){
        if(i == 0){
            pathHeader = url.parse(urlStr).pathname;
            img = await getData(urlStr,pathHeader);

        }else {
            pathHeader = url.parse(img.nextUrl).pathname;
            img = await getData(img.nextUrl,pathHeader,img.cookie);
        }

        i++;

        if(img){
            saveImg(img);
        }

        let random = Math.random()*4*1000;
        while(random < 1500){
            random = Math.random()*4*1000;
        }
        console.log("本次休息"+random+" ms")
        await timeout(random);
    }


    ctx.body = "ok";

});

function getData(url,pathHeader,cookie){
    return new Promise(function (resolve, reject) {

        superagent.get(url)
            .charset('utf-8') //当前页面编码格式
            .buffer(true)
            .set({
                "authority":"www.mzitu.com",
                "method":"GET",
                "path":pathHeader,
                "scheme":"https",
                "sec-fetch-mode":"navigate",
                "sec-fetch-site":"none",
                "sec-fetch-user":"?1",
                "cookie":cookie || "Hm_lvt_dbc355aef238b6c32b43eacbbf161c3c=1573222215; Hm_lpvt_dbc355aef238b6c32b43eacbbf161c3c=1573222224",
                "upgrade-insecure-requests":"1",
                "accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
                "user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36"
            })

            .end((err, data) => { //页面获取到的数据
                if(err !=null){
                    console.log(err)
                    return
                }

                let cookie = data.request.header.cookie;

                let html = data.text,
                    $ = cheerio.load(html, {
                        decodeEntities: false,
                        ignoreWhitespace: false,
                        xmlMode: false,
                        lowerCaseTags: false
                    }); //用cheerio解析页面数据

                //下面类似于jquery的操作，前端的小伙伴们肯定很熟悉啦

                let title = $(".main .content .main-image p a img").attr("alt")
                //console.log(title);

                let nexturl = $(".main .content .main-image p a").attr("href")
                //console.log(nextpath)

                let imagePath = $(".main .content .main-image p a img").attr("src")
                //console.log(path)

                let img = new Img(title,url,imagePath,nexturl,cookie);

                console.log(img)

                resolve(img);

            });
    })
    

}

function saveImg(img){

    let rootPath = "d://pic//pic";

    let folder = rootPath + "/"+img.title.replace(':',' ').replace("?",'');

    if(!fs.existsSync(folder)){
        //文件夹不存在，就创建文件夹
        fs.mkdirSync(folder)
    }

    let fullPath = folder+"/"+img.imagePath.substring(img.imagePath.lastIndexOf("/")+1,img.imagePath.length);
    console.log(fullPath);

    if(!fs.existsSync(fullPath)){
        superagent
            .get(img.imagePath)
            .buffer(true)
            .set({
                "authority":"i5.meizitu.net",
                "method":"GET",
                "path":url.parse(img.imagePath).pathname ,
                "scheme":"https",
                "sec-fetch-mode":"no-cors",
                "referer":img.url,
                "sec-fetch-site":"cross-site",
                "accept":"image/webp,image/apng,image/*,*/*;q=0.8",
                "user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36"
            })
            .end(function(err, sres) {
                if (err) {
                    console.log(err);
                    return;
                }

                fs.writeFileSync(fullPath, sres.body, "binary");

                //将图片保存完成之后把新的路劲存起来
                writeFile("d://pic//path.txt",img.nextUrl);

            });

    }else {
        console.log("文件已存在")
    }




}


function readFile(path){
    let urlpath = fs.readFileSync(path,'utf-8');
    return urlpath;

}


function writeFile(path,content){
    fs.writeFileSync(path,content);
}



class Img{

    constructor(title,url,imagePath,nextUrl,cookie){
        this.title = title;
        this.url = url;
        this.imagePath = imagePath;
        this.nextUrl = nextUrl
        this.cookie = cookie
    }

}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


module.exports = router;
