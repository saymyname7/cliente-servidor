var express=require('express');
var path = require('path');
var http = require('http');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();
app.set("views",path.resolve(__dirname,"views"));
app.set("view engine","ejs");

var entries =[];
app.locals.entries = entries;

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:false}));

app.get('/index',(request, response)=> response.render('index'));
app.get('/nuevasVictimas',(request, response)=> response.render('nuevasVictimas'));

app.post('/nuevasVictimas',(request,response)=>{
    if(!request.body.Nombre || !request.body.Direccion || !request.body.Telefono || !request.body.Instagram){
        response.status(400).send('las entradas deben de tener un titulo y mensaje')
        return;
    }
    entries.push({
        Nombre:request.body.Nombre,
		Direccion:request.body.Direccion,
		Telefono:request.body.Telefono,
		Instagram:request.body.Instagram,
        created: new Date()
    });
    response.redirect('/index');
});

var IP_MALVADA = "0.0.0.0";
app.use((request,response,next)=> {
    if(request.ip === IP_MALVADA){
        response.status(401).send("Intento de acceso no autorizado");       
    } else{
        next();
    }
});

var publicPath = path.join(__dirname,'public');
app.use(express.static(publicPath));

app.get('/',(request,response)=> {
    response.render("zombies");
});

//Pagina "acerca de"
app.get('/zombies',(request,response) => {
    response.render("zombies")
});

app.get('/clases',(request,response) => {
    response.render("clases")
});

app.get('/armas',(request,response) => {
    response.render("armas")
});

app.get('/index',(request,response)=> {
    response.render("index");
});

app.get('/nuevasVictimas',(request,response) => {
    response.render("nuevasVictimas")
});

app.get((request,response) => {
    response.writeHead(404,{"Content-Type":"text/html"});
    response.end("<h2>404 Not Found!</h2>");
});
//http siempre va al final de codigo
http.createServer(app).listen(3000,()=> 
console.log('La aplicacion Zombies esta corriendo en el puerto 3000'));

