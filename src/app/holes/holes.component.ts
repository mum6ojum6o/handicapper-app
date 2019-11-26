import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-holes',
  templateUrl: './holes.component.html',
  styleUrls: ['./holes.component.css']
})
export class HolesComponent implements OnInit, OnChanges {

@Input() holes: any[];
  constructor() { }
  ngOnInit(): void {
    this.rearrangeHoles();
  }

  public rearrangeHoles() {

    this.holes = this.holes.sort(
      (h1, h2) => {
        if ( h1.holeNumber <= h2.holeNumber ) { return -1; }
        else {
          return 1;
        }
      }
    );
   }

   ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (changes['holes']) {
      this.rearrangeHoles();
    }
  }
}
