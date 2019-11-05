const fs = require('fs');

const repos = require('./data');


function add(article){
    repos.push(article)
    store()
}

function update(index,newArticle){
    repos.splice(index,1,newArticle);
    store()
}

function get(index){
    return repos[index]
}

function del(index){
    repos.splice(index,1);
    store()
}

function getList(){
    return repos;
}

function store(){
    fs.writeFileSync(__dirname+'/data.json',JSON.stringify(repos))
}

module.exports={
    'add':add,
    'update':update,
    'get':get,
    'del':del,
    'getList':getList,
    'store':store
};