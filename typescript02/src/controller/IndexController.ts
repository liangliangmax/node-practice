import {Controller, Get, JsonController, Render} from "routing-controllers";

@Controller("/index")
export class IndexController {

    @Get("/page")
    @Render('index')
    public async index(){
        
    }
}