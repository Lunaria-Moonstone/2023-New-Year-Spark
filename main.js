var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
  if(req.method == 'GET' && req.url == '/newyear/') {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    fs.createReadStream("./main.html").pipe(res);
    console.log("new page 'main.html'");
  } else if(req.method == "GET" && ( req.url == '/js/sport.js' || req.url == '/js/spark.js')) {
    try {
      res.writeHead(200);
      fs.createReadStream('.' + req.url).pipe(res);
      console.log('get ' + req.url);
    } catch(err) {
      res.writeHead(404, {
        "Content-Type": "text/plain",
      });
      res.write("Error 404: Resource not found.");
      res.end();
    }
  } else {
    res.writeHead(404, {
      "Content-Type": "text/plain",
    });
    res.write("Error 404: Resource not found.");
    res.end();
  }
}).listen(80);

console.log('now server runing!\n');
