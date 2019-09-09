import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoundDetailsService } from '../services/round-details.service';

@Component({
  selector: 'rounddetails',
  templateUrl: './rounddetails.component.html',
  styleUrls: ['./rounddetails.component.css']
})
export class RounddetailsComponent {
  @Input() roundDetails: any[];
  constructor(private service: RoundDetailsService) { }

  updateRequest: boolean;
  updateRowIndex: number;

  public updatedRequested(index: number) {
    if (index < 0 || index >= this.roundDetails.length) {return;}
    this.updateRequest = true;
    this.updateRowIndex = index;
  }
  public updateCancelled() {
    this.updateRequest = false;
    this.updateRowIndex = -1;
  }
  public update() {
    this.service.setUrl('http://localhost:8080/roundDetails/'+ this.roundDetails[this.updateRowIndex].id);
    //console.log('http://localhost:8080/roundDetails/' + this.roundDetails[this.updateRowIndex].id);
    //console.log(this.roundDetails[this.updateRowIndex].id);
    console.log(this.roundDetails[this.updateRowIndex]);
    this.service.update({

      'hole':{'id': this.roundDetails[this.updateRowIndex].hole.id},
      'shotsTaken': this.roundDetails[this.updateRowIndex].shotsTaken,
      'timestamp': this.roundDetails[this.updateRowIndex].shotsTaken
    }).subscribe( response => {
      if (response != null) {
        this.updateRequest = false;
        this.updateRowIndex = -1;
      }
    }, error => {
      alert('An unexpected error occured.');
    });
  }

}
