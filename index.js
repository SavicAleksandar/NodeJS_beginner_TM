const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
    // if(req.url === "/") {
    //     fs.readFile(path.join(__dirname, "public", "index.html"), (err, content) => {
    //         if(err) throw err;
    //         res.writeHead(200, {"Content-Type": "text/html"})
    //         res.end(content);
    //     }
    //     );
    // }

    // if(req.url === "/api/users") {
    //     const users =[
    //         {name: "Bob Smith", age: 30},
    //         {name: "John Doe", age: 32}
    //     ];   
        
    //     res.writeHead(200, {"Content-Type": "application/json"});
    //     res.end(JSON.stringify(users));
    // }

    // build filepath
    let filePath = path.join(__dirname, "public", req.url === "/" ? "index.html" : req.url);

    // extension for file
    let extname = path.extname(filePath);

    // initial content type
    let contentType = "text/html";

    // check ext and set content type
    switch (extname) {
        case ".js":
            contentType = "text/javascript";
            break;
        case ".html":
            contentType = "text/html";
            break;
        case ".json":
            contentType = "application/json";
            break;
        case ".css":
            contentType = "text/css";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".jpg":
            contentType = "image/jpg";
            break;       
    }

    // read file
    fs.readFile(filePath, (err, content) => {
        if(err) {
            if(err.code == "ENOENT") {
                // page not found (404)
                fs.readFile(path.join(__dirname, "public", "404.html"), (err, content) => {
                    res.writeHead(200, {"Content-Type": "text/html"});
                    res.end(content, "utf-8");
                })
            } else {
                // some server error (500)
                res.writeHead(500);
                res.end("server error: ${err.code");
        }
    }   else {
            // succes
            res.writeHead(200, {"Content-Type": contentType});
            res.end(content, "utf-8");
        }
    });
});


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log("Server running on a port ${PORT}");
});


