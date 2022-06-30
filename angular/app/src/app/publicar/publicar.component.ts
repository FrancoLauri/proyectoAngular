import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralService } from '../general.service';


@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.component.html',
  styleUrls: ['./publicar.component.css']
})
export class PublicarComponent implements OnInit {
  @Output() publique = new EventEmitter;
  @Input() estados = [];

  texto = "";
  estadoElegido: any;
  //usuario="";

  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
  }

  async publicar(){
    try{
      let paquete = {
        mensaje: this.texto,
        estado: this.estadoElegido,
        //usuarioEstado: this.usuario,
      }
      let resultado = await this.generalService.publicar(paquete);
      
      this.publique.emit();
    }
    catch(e){
      console.log(e);
    }
    
  }

}
