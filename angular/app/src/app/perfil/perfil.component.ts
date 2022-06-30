import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  listaDatosPersonales : any;
  listaPosteoPersonales: any;

  constructor(private generalService: GeneralService) { }

  async ngOnInit(){
    var resultado = await this.generalService.datosPersonales();
    if(resultado){
      this.listaDatosPersonales = Object.values(resultado);


      this.listaPosteoPersonales = await this.generalService.listarUno();
    }
  }
  /*
  async datosPersonales(){
    try{
      let resultado = await this.generalService.datosPersonales();

      this.listaDatosPersonales = resultado;
      console.log(this.listaDatosPersonales);
      //LLEGA NULL console.log(resultado);
    }
    catch(e){
      console.log(e);
    }
  }*/
}
