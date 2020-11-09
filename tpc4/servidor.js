var http = require('http')
var fs = require('fs')

var port = 7777

var server = http.createServer(function(req,res){
    console.log(req.method + " " + req.url)
    
    if(req.url.match(/\/arqs\/[1-9][0-9]*$/)){
        var num = req.url.split("/")[2]
        var fileUrl = "site/arq" + num + ".html"
        fs.readFile(fileUrl,function(err,data){
            res.writeHead(200,{'Content-Type': 'text/html'})
            res.write(data)
            res.end()        
        })
    }    
    else if(req.url.match(/\/arqs\//))
    {
        //index
        fs.readFile('site/index.html',function(err,data){
            res.writeHead(200,{'Content-Type': 'text/html'})
            res.write(data)
            res.end()
        })
    }

    else 
    {
        res.writeHead(200,{'Content-Type': 'text/html'})
        res.write("<p>URL nao corresponde ao esperado</p>")
        res.end()
    }


})

server.listen(port)