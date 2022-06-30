import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {

  @Input() listaDatosPersonales = [];
  //@Output() mostrame = new EventEmitter;

  

  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
  }
/*
  mostrar(){
    
    this.mostrame.emit();
  }
  */
}
