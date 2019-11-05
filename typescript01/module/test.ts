import Dog from "./index";

import Person from "./Person";

class Dig extends Dog{

    public static hha:string = "aaa";

}

let dog = new Dog("zhangsan",21);

console.log(dog.getName())

let dig = new Dig("lisi",30);

dig.setName("9292929");

console.log(dig.getName())

console.log(Dig.hha);

console.log("==================================")
abstract class Asia implements Person{
    abstract eat(): void;

    say():void{
        console.log("say")
    }
}

class Li extends Asia {
    eat(): void {
        console.log("eat")
    }
    
}

let li = new Li();
li.eat();
li.say();