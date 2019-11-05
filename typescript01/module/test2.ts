interface IEncrypt {

    (key:string,value:string):string;
}

let md5:IEncrypt = function (key:string,value:string):string {

    return key+value;
}

console.log(md5("11","bb"))

