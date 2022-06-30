import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {

  nombre="";
  apellido="";
  edad=0;
  usuario="";
  email="";
  clave="";




  constructor(private generalService: GeneralService, private router: Router) { }

  ngOnInit(): void {
  }

  async enviarRegistro(){
    let persona = {
      nombre: this.nombre,
      apellido: this.apellido,
      edad: this.edad,
      email: this.email,
      usuario: this.usuario,
      clave: this.clave
    }

    let resultado = await this.generalService.registrarse(persona);

    if(resultado = {}){
      this.router.navigate(['login']);
    }
    else{
      console.log("error no entro");
      return;
    }
    
  }
}
