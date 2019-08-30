import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-holes',
  templateUrl: './holes.component.html',
  styleUrls: ['./holes.component.css']
})
export class HolesComponent /*implements OnInit*/ {
@Input() holes: any[];
  constructor() { }



}
