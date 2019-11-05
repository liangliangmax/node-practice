async function print() {


    setTimeout(()=>{
        console.log(4);
    },1000)

    console.log(3);
    return "this is a test";
}

async function test() {
    console.log(1);
    let result = print();

    console.log(result);

    console.log(2)

}

test()