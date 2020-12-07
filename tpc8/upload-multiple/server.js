var express = require('express')
var bodyParser = require('body-parser') 
var templates = require('./html-templates')
var jsonfile = require('jsonfile')
var logger = require('morgan')
var fs = require('fs')

var multer = require('multer')
var upload = multer({dest: 'uploads/'})

var app = express()

//set logger
app.use(logger('dev'))

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

app.use(express.static('public'))

app.get('/', function (req, res){
    var d = new Date().toISOString().substr(0,16)
    var files = jsonfile.readFileSync('./dbFiles.json')
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
    res.write(templates.fileList(files,d))
    res.end()
})

app.get('/files/upload', function(req,res){
    var d = new Date().toISOString().substr(0,16)
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
    res.write(templates.fileForm(d))
    res.end()
})

app.get('/files/download/:fname', (req,res) =>{
    res.download(__dirname + '/public/fileStore/' + req.params.fname)
})

// app.post('/files', upload.single('myFile'), function(req,res){
//     let oldPath = __dirname + '/' + req.file.path
//     let newPath = __dirname + '/public/fileStore/' + req.file.originalname

//     fs.rename(oldPath,newPath,function (err){
//         if(err) throw err;
//     })

//     var d = new Date().toISOString().substr(0,16)
//     var files = jsonfile.readFileSync('./dbFiles.json')
//     files.push({
//         date: d,
//         name: req.file.originalname,
//         size: req.file.size,
//         mimetype: req.file.mimetype,
//         desc: req.body.desc
//     })
//     jsonfile.writeFileSync('./dbFiles.json',files)

//     res.redirect('/')
// })

app.post('/files', upload.array('myFile'), function(req,res){
    var files = jsonfile.readFileSync('./dbFiles.json')
    for(var i=0;i<req.files.length;i++){
        let curFile = req.files[i]
        let oldPath = __dirname + '/' + curFile.path
        let newPath = __dirname + '/public/fileStore/' + curFile.originalname
    
        fs.rename(oldPath,newPath,function (err){
            if(err) throw err;
        })
    
        var d = new Date().toISOString().substr(0,16)
        files.push({
            date: d,
            name: curFile.originalname,
            size: curFile.size,
            mimetype: curFile.mimetype,
            desc: req.body.desc[i]
        })
    }
    jsonfile.writeFileSync('./dbFiles.json',files)

    res.redirect('/')
})

app.delete('/files/:fname', (req,res) =>{
    var files = jsonfile.readFileSync('./dbFiles.json')
    var flag=1;
    var index=-1
    for(var i=0; i<files.length && flag;i++){
        if(files[i].name==req.params.fname) {
            index=i;
            flag=0;
        }
    }
    if (index > -1) {
        files.splice(index, 1)
        jsonfile.writeFileSync('./dbFiles.json',files)
        res.sendStatus(200)      
    }
    else{
        res.sendStatus(500)
    }

})


app.listen(7702, () => console .log('Servidor à escuta na porta 7702...'))