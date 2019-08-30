import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rounddetails',
  templateUrl: './rounddetails.component.html',
  styleUrls: ['./rounddetails.component.css']
})
export class RounddetailsComponent implements OnInit {
  @Input() roundDetails: any[];
  constructor() { }

  ngOnInit() {
  }

}
