const http = require('http');

const server = http.createServer((req,res)=>{
res.write("Hello from Docker App");
res.end();
});

server.listen(3000);
