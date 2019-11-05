let redis = require('redis');

let client = redis.createClient('6379','172.16.62.192');

client.auth('123456');


client.set("name","liang",function (err,data) {
    console.log(data)
});

client.get('name',function (err,data) {
    console.log(data)
})
