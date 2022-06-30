import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general.service';


@Component({
  selector: 'app-padre-general',
  templateUrl: './padre-general.component.html',
  styleUrls: ['./padre-general.component.css']
})
export class PadreGeneralComponent implements OnInit {

  listadoPosteos : any;

  estados : any;

  constructor(private generalService: GeneralService) { }

  async ngOnInit(){
    this.listadoPosteos = await this.generalService.listarTodos();
    this.estados = await this.generalService.estados();
    
  }

  async actualizarPosteos(){
    this.listadoPosteos = await this.generalService.listarTodos();
  }
}
