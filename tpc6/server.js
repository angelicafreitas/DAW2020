var http = require('http')
var axios = require('axios')
var fs = require('fs')

var static = require('./static')

var {parse} = require('querystring')
const { url } = require('inspector')


// Retrieves student info from request body --------------------------------
function recuperaInfo(request, callback){
    if(request.headers['content-type'] == 'application/x-www-form-urlencoded'){
        let body = ''
        request.on('data', function(bloco) {
            body += bloco.toString()
        })
        request.on('end', function(){
            console.log(body)
            callback(parse(body))
        })


    }
}

// POST Confirmation HTML Page Template -------------------------------------
function geraPostConfirm( task, d){
    return `
    <html>
    <head>
        <title>POST receipt: ${task.what}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Task: ${task.what} por ${task.who} inserido</h1>
            </header>

            <footer class="w3-container w3-teal">
                <address>[<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
}


function geraTaskTable( tasks, d, state, title){
    let pagHTML = `
        <div class="w3-container w3-teal" style="margin-top:5vh">
            <center><h2>${title}</h2></center>
        </div>
        <table class="w3-table w3-bordered">
            <tr>
                <th>Task</th>
                <th>Date dued</th>
                <th>Creator</th>
                <th>Type</th>
                <th>Date created</th>
            </tr>
        `
    tasks.forEach(t => {
        if(t.state == state){
        pagHTML +=`
            <tr>
                <td>${t.what}</a></td> 
                <td>${t.dateDued}</td> 
                <td>${t.who}</td> 
                <td>${t.type}</td> 
                <td>${t.dateCreated}</td> 
            </tr>
            `
        }
    });   
    
    pagHTML += `</table>`
    return pagHTML
}

// Template para a página com a lista de alunos ------------------
function geraPagTasks( tasks, d){

  let pagHTML = `
    <html>
        <head>
            <title>Tasks App</title>
            <meta charset="utf-8"/>
            <link rel="stylesheet" href="w3.css"/>
        </head>
        <body>
            <center><h1 style="margin-top:10px">Tasks App</h1></center>

            <div style="margin-left:150px;margin-right:150px">
                <div class="w3-container w3-teal" >
                    <center><h2>Add Task</h2></center>
                </div>
                <form class="w3-container" action="http://localhost:4000/tasks" method="POST">
                    <label class="w3-text-teal"><b>Date created</b></label>
                    <input class="w3-input w3-border w3-light-grey" type="text" name="dateCreated">
                
                    <label class="w3-text-teal"><b>Date dued</b></label>
                    <input class="w3-input w3-border w3-light-grey" type="text" name="dateDued">

                    <label class="w3-text-teal"><b>Creator</b></label>
                    <input class="w3-input w3-border w3-light-grey" type="text" name="who">

                    <label class="w3-text-teal"><b>Task description</b></label>
                    <input class="w3-input w3-border w3-light-grey" type="text" name="what">
                
                    <label class="w3-text-teal"><b>Type</b></label>
                    <input class="w3-input w3-border w3-light-grey" type="text" name="type">
                    
                    <center style="margin-top:2vh">
                        <input class="w3-btn w3-blue-grey" type="submit" value="Registar">
                        <input class="w3-btn w3-blue-grey" type="reset" value="Limpar valores"> 
                    </center>
                </form>
            </div>
            
            ${geraTaskTable(tasks,d,"toDo","To-do tasks")}
            ${geraTaskTable(tasks,d,"resolved","Resolved tasks")}
        </body>
    </html>
  `
  return pagHTML
}

// Criação do servidor

var taskServer = http.createServer(function (req, res) {
    // Logger: que pedido chegou e quando
    var d = new Date().toISOString().substr(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Tratamento do pedido
    if(static.recursoEstatico(req)){
        static.sirvoRecursoEstatico(req,res)
    }
    else{
    switch(req.method){
        case "GET": 
            // GET /tasks --------------------------------------------------------------------
            if((req.url == "/") || (req.url == "/tasks")){
                axios.get("http://localhost:3000/tasks?_sort=dateDued")
                    .then(response => {
                        var tasks = response.data
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(geraPagTasks(tasks,d))
                        res.end()
                        
                    })
                    .catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>Não foi possível obter a lista de tasks...")
                        res.end()
                    })
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " " + req.url + " não suportado neste serviço.</p>")
                res.end()
            }
            break
        case "POST":
            if(req.url=='/tasks'){
                recuperaInfo(req, resultado => {
                    resultado.state ="toDo"
                    console.log('POST de task:' + JSON.stringify(resultado))
                    axios.post('http://localhost:3000/tasks', resultado)
                        .then(resp => {
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(geraPostConfirm( resp.data, d))
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write('<p>Erro no POST: ' + erro + '</p>')
                            res.write('<p><a href="/">Voltar</a></p>')
                            res.end()
                        })
                })
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " " + req.url + " não suportado neste serviço.</p>")
                res.end()
            }
            break

        default: 
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write("<p>" + req.method + " não suportado neste serviço.</p>")
            res.end()
    }
    }
})

taskServer.listen(4000)
console.log('Servidor à escuta na porta 4000...')