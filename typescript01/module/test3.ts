function Controller(params:any) {
    return function (target:any) {

        console.log(params)
        console.log(typeof target)
    }
}


@Controller("http://api.com")
class HttpClient {

    constructor() {
        console.log("constructor")
    }

    public getData():void{

        console.log(111)
    }


}

let client = new HttpClient();