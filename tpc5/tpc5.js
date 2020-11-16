var http = require('http')
var axios = require('axios')


http.createServer(function(req,res){
    console.log(req.method + ' ' + req.url)

    if(req.method == 'GET'){
        //pagina principal
        if(req.url == '/'){
            res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'})
            res.write('<h2>Escola de música</h2>')
            res.write('<ul>')
            res.write('<li><a href="/alunos">Lista de alunos</a></li>')
            res.write('<li><a href="/cursos">Lista de cursos</a></li>')
            res.write('<li><a href="/instrumentos">Lista de instrumentos</a></li>')
            res.write('</ul>')
            res.end()
        }
        else if(req.url.match(/\/alunos\/[A-Za-z][A-Za-z0-9]*/)){
            var alunoID = req.url.split('/')[2]
            axios.get('http://localhost:3000/alunos/'+ alunoID)
            //resp- pacote inteiro
            .then(function (resp) {
                aluno = resp.data;
                res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'})
                res.write('<title>Escola de música</title>')
                
                res.write('<h2>' + aluno.nome + '</h2>')
                for(var desc of Object.keys(aluno)){
                    if(desc!='nome'){
                        res.write('<div style="margin-bottom:0.5vh;"><b>' + desc + '</b>: ' + aluno[desc] + '</div>')
                    }
                }
                
                res.write('<address style="margin-top:5vh;">[<a href="/">Voltar</a>]</address>')
                res.end()

                
            })
            .catch(function (error) {
                console.log('Erro na obtenção do aluno ' + alunoID + ': ' + error )
            })
        }
        else if(req.url.match(/\/cursos\/[A-Za-z][A-Za-z0-9]*/)){
            var cursoID = req.url.split('/')[2]
            axios.get('http://localhost:3000/cursos/'+ cursoID)
            //resp- pacote inteiro
            .then(function (resp) {
                curso = resp.data;
                res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'})
                res.write('<title>Escola de música</title>')
                
                res.write('<h2>' + curso.designacao + '</h2>')
                for(var desc of Object.keys(curso)){
                    if(desc=='instrumento'){
                        res.write('<div style="margin-bottom:0.5vh;"><b> id do instrumento</b>: ' + curso[desc].id + '</div>')
                        res.write('<div style="margin-bottom:0.5vh;"><b>#text do instrumento</b>: ' + (curso[desc])['#text'] + '</div>')
                    }
                    else if(desc!='designacao'){
                        res.write('<div style="margin-bottom:0.5vh;"><b>' + desc + '</b>: ' + curso[desc] + '</div>')
                    }
                }
                
                res.write('<address style="margin-top:5vh;">[<a href="/">Voltar</a>]</address>')
                res.end()

                
            })
            .catch(function (error) {
                console.log('Erro na obtenção do curso ' + cursoID + ': ' + error )
            })
        }
        else if(req.url.match(/\/instrumentos\/[A-Za-z][A-Za-z0-9]*/)){
            var instrumentoID = req.url.split('/')[2]
            axios.get('http://localhost:3000/instrumentos/'+ instrumentoID)
            //resp- pacote inteiro
            .then(function (resp) {
                instrumento = resp.data;
                res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'})
                res.write('<title>Escola de música</title>')
                
                res.write('<h2>' + instrumento['#text'] + '</h2>')
                for(var desc of Object.keys(instrumento)){
                    if(desc!='#text'){
                        res.write('<div style="margin-bottom:0.5vh;"><b>' + desc + '</b>: ' + instrumento[desc] + '</div>')
                    }
                }
                
                res.write('<address style="margin-top:5vh;">[<a href="/">Voltar</a>]</address>')
                res.end()

                
            })
            .catch(function (error) {
                console.log('Erro na obtenção do instrumento ' + instrumentoID + ': ' + error )
            })
        }
        else if(req.url == '/alunos'){
            axios.get('http://localhost:3000/alunos')
            //resp- pacote inteiro
            .then(function (resp) {
                alunos = resp.data;
                res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'})
                res.write('<title>Escola de música</title>')
                res.write('<h2>Lista de alunos</h2>')
                res.write('<ul>')
                
                alunos.forEach(a => {
                    var getUrl = 'http://localhost:4000/alunos/' + a.id
                    res.write('<a href=' + getUrl + '><li>' + a.id + ' - ' + a.nome + '</li></a>')
                })

                res.write('</ul>')
                res.write('<address>[<a href="/">Voltar</a>]</address>')
                res.end()

                
            })
            .catch(function (error) {
                console.log('Erro na obtenção da lista de alunos: ' + error )
            })
        }
        else if(req.url == '/cursos'){
            axios.get('http://localhost:3000/cursos')
            .then(function (resp) {
                cursos = resp.data;
                res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'})
                res.write('<title>Escola de música</title>')
                res.write('<h2>Lista de cursos</h2>')
                res.write('<ul>')
                
                cursos.forEach(c => {
                    var getUrl = 'http://localhost:4000/cursos/' + c.id
                    res.write('<a href=' + getUrl + '><li>' + c.id + ' - ' + c.designacao + '</li></a>')
                })

                res.write('</ul>')
                res.write('<address>[<a href="/">Voltar</a>]</address>')
                res.end()

                
            })
            .catch(function (error) {
                console.log('Erro na obtenção da lista de cursos: ' + error )
            })
        }
        else if(req.url == '/instrumentos'){
            axios.get('http://localhost:3000/instrumentos')
            .then(function (resp) {
                instrumentos = resp.data;
                res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'})
                res.write('<title>Escola de música</title>')
                res.write('<h2>Lista de instrumentos</h2>')
                res.write('<ul>')
                
                instrumentos.forEach(i => {
                    var getUrl = 'http://localhost:4000/instrumentos/' + i.id
                    res.write('<a href=' + getUrl + '><li>' + i.id + ' - ' + i["#text"] +'</li></a>')
                })

                res.write('</ul>')
                res.write('<address>[<a href="/">Voltar</a>]</address>')
                res.end()

                
            })
            .catch(function (error) {
                console.log('Erro na obtenção da lista de instrumentos: ' + error )
            })
        }
        else{
            res.writeHead(200,{'Content-Type': 'text/html'})
            res.write("<p>Pedido não suportado: " + req.method + " " + req.url + "</p>")
            res.end()
        }

    }
    else{
        res.writeHead(200,{'Content-Type': 'text/html'})
        res.write("<p>Pedido não suportado: " + req.method + " " + req.url + "</p>")
        res.end()

    }


}).listen(4000)

console.log('Servidor à escuta na porta 4000....')