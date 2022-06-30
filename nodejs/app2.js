var express = require('express');
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var cors = require('cors');
var session = require('express-session');



var app = express();

app.use(express.json());
app.use(session({ secret : 'abracadabra', coockie: {maxAge: 6000}}));
app.use(cors({origin: "http://localhost:4200", credentials: true}));

const uri = "mongodb+srv://argenTwit:franco123@cluster0.t9jiz.mongodb.net/?retryWrites=true&w=majority";

//funcion conectarse bd mongo
async function conectar() {
    try{
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("conectando con la base de datos metodo: mongodb async-await");
    }
    catch(e){
        console.log(e);
    }
}

conectar();
//esquema datos usuario mongo
const usuarioSchema = mongoose.Schema({
    nombre: String,
    apellido: String,
    edad: Number,
    email: String,
    usuario: String,
    clave: String
});

const usuarioModel = mongoose.model("usuario", usuarioSchema);

const listadoSchema = mongoose.Schema({
    mensaje: String,
    estado: String,
    usuarioEstado: String
});

const listadoModel = mongoose.model("listado", listadoSchema);

const listaEstadosSchema = mongoose.Schema({
    listaEstado: String
});

const listaEstadosModel = mongoose.model("listaEstados", listaEstadosSchema);



//-----------------------------------------------------------------LOGIN------------------------------------------------------------------------

//apartado login
app.post("/login", async function(req,res){
    try{

        //checkeo usuario y clave
        if(!req.body.usuario || !req.body.clave){
            throw new Error ("no enviaste un usuario y/o clave");
        }
        //busco si usuario existe
        var usuario = await usuarioModel.findOne({usuario: req.body.usuario});

        //si no existe usuario
        if(!usuario){
            throw new Error("no existe el usuario");
        }
        //comparo clave enviada con clave encriptada almacenada
        if(!bcrypt.compareSync(req.body.clave, usuario.clave)){
            throw new Error("fallo el login");
        }

        //si llega aqui le inicio sesion
        req.session.usuario = usuario.usuario;
        
        //datos que devuelvo

        var paquete = {
            id: usuario._id,
            nombre: usuario.nombre,
            usuario: usuario.usuario
        }
        
        
        res.status(200).send(paquete);
    }
    catch(e){
        console.log(e);
        res.status(407).send("Error: ",e)
    }
});

//-------------------------------------------------------REGISTRO--------------------------------------------------------------------------

app.post("/registrarse", async function(req,res){
    try{
        //corroborar todos los datos
        if(!req.body.nombre || !req.body.apellido ||  !req.body.edad || !req.body.email || !req.body.usuario || !req.body.clave){
            throw new Error("faltan datos");
        }

        //corroborar email no repetido
        var xEmail = await usuarioModel.findOne({email: req.body.email});
        if(xEmail){
            throw new Error("ese mail ya existe");
        }

        //corroborar usuario no repetido
        var xUsuario = await usuarioModel.findOne({usuario: req.body.usuario});
        if(xUsuario){
            throw new Error("ese usuario ya existe");
        }

        //encriptar clave
        var claveEncriptada = await bcrypt.hash(req.body.clave, 10);

        //estructura datos respuesta
        var usuario = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            edad: req.body.edad,
            email: req.body.email,
            usuario: req.body.usuario,
            clave: claveEncriptada
        }

        //respuesta y creacion nuevo usuario
        var respuesta = await usuarioModel.create(usuario);

        res.status(200).send("ok");
    }
    catch(e){
        console.log(e);
        res.status(407).send("Error: ",e)
    }
    
});

//----------------------------------------------------------------------POSTEO-------------------------------------------------------------

//listar todos los posteos
app.get("/listado", async function(req, res){
    try{
        
        let listado = await listadoModel.find();

        res.send(listado).status(200);
    }
    catch(e){
        console.log(e);
        res.status(407).send("Error: ",e)
    }
});
//listar posteo por usuario
app.get("/listado/:usuario", async function(req,res){
    try{
        
        //mostrar listado de usuario 
        let listado = await listadoModel.findOne({usuarioEstado: req.params.usuario});
        console.log(listado);
        if(!listado){
            throw new Error("no tenes posteos");
        }
        res.send(listado).status(200);

    }
    catch(e){
        console.log(e);
        res.status(407).send("Error: ",e)
    }
});
//agregar un estado nuevo
app.post("/listado", async function(req,res){
    try{
       
        //envien mensaje y estado para postear
        if(!req.body.mensaje || !req.body.estado){
            throw new Error("faltan datos para publicar el posteo");
        }
        let texto = req.body.mensaje;
        //checkeo mensaje no extenso
        if(texto.length > 240){
            throw new Error("mensaje muy extenso. menor a 240");
        }
        let pasaje = await listaEstadosModel.findById(req.body.estado);
        let nombreEstado = pasaje.listaEstado;
        
        //estructura de devolucion
        let postearListado = {
            mensaje: texto,
            estado: nombreEstado,
            usuarioEstado: req.body.usuario//req.session.usuario
        }

        //crear nuevo listado
        let respuesta = await listadoModel.create(postearListado);

        res.status(200).send("ok");

    }
    catch(e){
        console.log(e);
        res.status(407).send("Error: ",e)
    }
});

app.delete("/listado/:id", async function(req,res){
    try{
        let borrar = await listadoModel.findByIdAndDelete(req.params.id);
        res.status(200).send(borrar);
    }
    catch(e){
        console.log(e);
        res.status(407).send("Error: ",e)
    }
    
});
//---------------------------------------------------LISTADO ESTADOS UNICAMENTE--------------------------------------------------------------------------

app.get("/estados", async function(req,res){
    try{
        let listaEstados = await listaEstadosModel.find();

        res.send(listaEstados).status(200);
    }
    catch(e){
        console.log(e);
        res.status(407).send("Error: ",e)
    }
});

app.post("/estados", async function(req,res){
    try{    
        let listaEstados ={
            listaEstado: req.body.estado
        }

        let respuesta = await listaEstadosModel.create(listaEstados);

        res.status(200).send("Ok");
    }
    catch(e){
        console.log(e);
        res.status(407).send("Error: ",e)
    }
});

app.delete("/estados/:id", async function(req,res){
    try{
        let borrar = await listaEstadosModel.findByIdAndDelete(req.params.id);  
        res.status(200);
    }
    catch(e){
        console.log(e);
        res.status(407).send("Error: ",e)
    }
});

//---------------------------------------------------------------PERFIL-----------------------------------------------------------------


app.get("/perfil", async function(req,res){
    try{
        let datos = await usuarioModel.find();

        res.status(200).send(datos);
    }
    catch(e){
        console.log(e);
        res.status(407).send("Error: ",e)
    }
});

app.get("/perfil/:usuario" , async function(req,res){
    try{
        let datos = await usuarioModel.findOne({usuario: req.params.usuario});


        let box ={
            nombre : datos.nombre,
            apellido : datos.apellido,
            edad : datos.edad,
            email : datos.email,
            usuario : datos.usuario
        }


        res.status(200).send(box);
    }
    catch(e){
        console.log(e);
        res.status(407).send("Error: ",e)
    }
});

app.put("/perfil/:id", async function(req,res){
    try{
        if(!req.body.nombre || !req.body.apellido || req.body.edad ){
            throw new Error("faltan datos");
        }

        
    }
    catch(e){
        console.log(e);
        res.status(407).send("Error: ",e)
    }
});







app.listen(3000, ()=>{
    console.log("servidor escuchando en el puerto 3000");
});
