const express = require('express');
const redis = require('redis');
const process = require('process');

const app = express();

const client = redis.createClient({
    host:'redis-server', //the host name is the name of the service that we created, which is specified in the docker compose file
    port:6379
});

client.set('visits', 0);

app.get('/', (req, res)=>{
    process.exit(1); //exit status code
    client.get('visits', (err, visits)=>{

        res.send('Number of visits is '+ visits);
        client.set('visits', parseInt(visits) + 1)
    })
})

app.listen(8081, ()=>{
    console.log("Listening on port 8081");
})