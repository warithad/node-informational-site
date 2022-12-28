const fs = require('fs');
const http = require('http');
const url = require('url');

const PORT = 3000;

const page404 = fs.readFileSync('404.html','utf-8', (error, content)=>{
    if(error) throw error;
    return content;
});

const server = 
    http.createServer((req, res) =>{
        const q = url.parse(req.url, true);
        let filename = "";
        if (q.pathname === "/") {
          filename = "." + "/index.html";
        } else {
          filename = "." + q.pathname;
        }
    
        fs.readFile(filename, (err, data) =>{
          if (err) {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.write(page404);
            return res.end();
          } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            return res.end();
          }
        });
    })


server.listen(PORT, ()=>{
    console.log(`server running on port: ${PORT}`);
})