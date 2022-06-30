import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-posteo',
  templateUrl: './posteo.component.html',
  styleUrls: ['./posteo.component.css']
})
export class PosteoComponent implements OnInit {

  @Input() lista = [];
  @Output() borre = new EventEmitter();

  usuarioLocal = localStorage.getItem("usuario");


  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
  }
  async borrar(personaId){

    var resultado = await this.generalService.borrar(personaId);
    this.borre.emit();
  }
}
