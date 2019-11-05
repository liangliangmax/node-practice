
export default class Dog{
    private  _name:string;
    private  _age:number;

    constructor(name:string,age:number){
        this._name = name;
        this._age = age;
    }

    public getName():string {
        console.log(this.getAge());
        return this._name;
    }

    public setName(name:string):void{
        this._name = name
    }

    private getAge():number {
        return this._age;
    }
}

enum Color{
    RED,
    GREEN,
    BLACK
}

