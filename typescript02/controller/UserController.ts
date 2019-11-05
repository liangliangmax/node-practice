import {Controller, Get, JsonController} from "routing-controllers";

@JsonController("/user")
export class UserController {

    @Get("/getAll")
    public getAll():Array<string> {
        let arr = new Array<string>();
        arr.push("123");

        arr.push("456")

        return arr;
    }
}