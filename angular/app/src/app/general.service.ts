import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),   
    withCredentials: true, 
    observe: 'response' as 'response'
  }; 


  url = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  async registrarse(persona){
    try{

      let paquete = {
        nombre: persona.nombre,
        apellido: persona.apellido,
        edad: persona.edad,
        email: persona.email,
        usuario: persona.usuario,
        clave: persona.clave
      }

      var resultado = await this.http.post(this.url+"/registrarse", paquete).toPromise();

      return resultado;
    }
    catch(e){
      console.log(e);
    }
  }

  async iniciarse(parDatos){
    try{
      let paquete = {
        usuario: parDatos.usuario,
        clave: parDatos.clave
      }

      var resultado = await this.http.post(this.url+"/login", paquete, this.httpOptions).toPromise();

      if(resultado){
        var obj = resultado.body;
        
        var listaObjeto = Object.values(obj);

        //localStorage.setItem('usuario_id', resultado.body+"");

        localStorage.setItem('usuario_id', listaObjeto[0]);
        localStorage.setItem('nombre', listaObjeto[1]);
        localStorage.setItem('usuario', listaObjeto[2]);
      }

    
      return true;

      
    }
    catch(e){
      console.log(e);
    }
  }

  async listarTodos(){
    try{  
      var lista = await this.http.get(this.url+"/listado").toPromise();

      return lista;
    }
    catch(e){
      console.log(e);
    }
  }


  async estados(){
    try{
      let resultado = await this.http.get(this.url+"/estados").toPromise();
      return resultado;
    }
    catch(e){
      console.log(e);
    }
  }

  async publicar(posteo){
    try{
      let paquete = {
        mensaje : posteo.mensaje,
        estado : posteo.estado,
        usuario: localStorage.getItem('usuario')
      }
  
      let resultado = await this.http.post(this.url+"/listado", paquete).toPromise();
      return resultado;
    
    }
    catch(e){
      console.log(e);
    }
    
  }

  async borrar(personaId){
    try{

      var resultado = await this.http.delete(this.url+"/listado/"+personaId).toPromise();

      return resultado;
    }
    catch(e){
      console.log(e);
    }
  }

  async datosPersonales(){
    try{
      var resultado = await this.http.get(this.url+"/perfil/"+localStorage.getItem("usuario")).toPromise();
      return resultado; 
    }
    catch(e){
      console.log(e);
    }
  }
  async listarUno(){
    try{  
      var lista = await this.http.get(this.url+"/listado"+localStorage.getItem("usuario")).toPromise();
  
      return lista;
    }
    catch(e){
      console.log(e);
    }
  }
  
}
