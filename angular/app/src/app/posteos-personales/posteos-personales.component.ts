import { Component, OnInit, Input } from '@angular/core';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-posteos-personales',
  templateUrl: './posteos-personales.component.html',
  styleUrls: ['./posteos-personales.component.css']
})
export class PosteosPersonalesComponent implements OnInit {

  @Input() listaPosteoPersonales = [];

  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
  }

}
