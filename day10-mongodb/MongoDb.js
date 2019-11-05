let config = require("./config");

let MongoClient = require("mongodb").MongoClient;

let assert = require("assert");


class Db {

    static getInstance(){
        if(!Db.instance){
            Db.instance = new Db();
        }

        return Db.instance;

    }

    constructor(){
        this.dbClient=null;

        this.connect();
    }

    connect(){
        return new Promise( (resolve, reject) => {

            if(this.dbClient){
                return this.dbClient;
            }

            MongoClient.connect(config.dbUrl,{useUnifiedTopology: true},(err,client)=>{
                assert.equal(null,err);

                let db = client.db(config.dbName);

                this.dbClient = db;

                resolve(this.dbClient);

            });

        });


    }

    find(collectionName,json){
        
        return new Promise( (resolve, reject) => {
            this.connect().then(function (db) {
                let result = db.collection(collectionName).find(json);

                result.toArray(function (err,docs) {
                    assert.equal(null,err);

                    resolve(docs)
                });
            });
        });
    }

    update(collectionName,json1,json2){
        return new Promise(((resolve, reject) => {

            this.connect().then((db)=>{
                db.collection(collectionName).updateOne(json1,{
                    $set:json2
                },(err,result)=>{
                    assert(null,err);

                    resolve(result);
                });
            });
        }));
    }

    insert(collectionName,json){
        return new Promise(((resolve, reject) => {

            this.connect().then((db)=>{
                db.collection(collectionName).insertOne(json,(err,result)=>{
                    assert.equal(null,err);

                    resolve(result);
                });
            });

        }));
    }

    remove(collectionName,json){
        return new Promise(((resolve, reject) => {

            this.connect().then((db)=>{
                db.collection(collectionName).removeOne(json,(err,result)=>{
                    assert.equal(null,err);

                    resolve(result);
                });
            });

        }));
    }



}

module.exports = Db.getInstance();



// console.time("start")
// db.find("goods",{})
//     .then(function (data) {
//         console.log(data);
//         console.timeEnd("start")
//     })
