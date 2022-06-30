import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GeneralService } from '../general.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  usuario="";
  clave="";

  constructor(private generalService: GeneralService, private router: Router) { }

  ngOnInit(): void {
  }

  async enviarLogin(){
    let parDatos = {
      usuario: this.usuario,
      clave: this.clave
    }
    let resultado = await this.generalService.iniciarse(parDatos);

    if(resultado = true){
      this.router.navigate(['padre']);
    }
    else{
      console.log("error");
      return;
    }
  }
  

}
