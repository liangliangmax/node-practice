async function print() {

    return "this is a big test";
}

//回调的形式接受参数
print()
    .then((data)=>{
        console.log(data)
    });


//异步的形式接受参数
async function test() {

    let data = await print();

    console.log(data)

}

test()

async function print2() {

    return new Promise((resolve,reject)=>{

        setTimeout(()=>{
            resolve("ahahahah");
        },1000);
    });

}

async function test2() {
    let result = await print2();

    console.log(result)
}

test2()