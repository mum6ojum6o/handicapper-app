import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoundDetailsService } from '../services/round-details.service';
import { environment } from '../../environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from '../modal-content/modal-content.component';
import { AddRoundDetailsComponent } from '../add-round-details/add-round-details.component';
import { ModalType } from '../modal-content/modal-type/modal-type';
@Component({
  selector: 'rounddetails',
  templateUrl: './rounddetails.component.html',
  styleUrls: ['./rounddetails.component.css']
})
export class RounddetailsComponent implements OnInit {
  @Input() roundDetails: any[];
  @Input() roundHeader: any;
  @Input() holes: any[];
  updateRequest: boolean;
  updateRowIndex: number;
  addRoundDetailFlag: boolean;
  constructor(private service: RoundDetailsService, private modalService: NgbModal) {  }
  ngOnInit() {
    if (this.roundDetails != null) {
      this.roundDetails = this.roundDetails.sort((r1, r2) => {
        if (r1.hole.holeNumber <= r2.hole.holeNumber ) { return -1; }
        else { return 1; }
      });
     }
     console.log('roundHeader '+ this.roundHeader.golfCourseId);
  }


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
    this.service.setUrl(environment.url + '/roundDetails/' + this.roundDetails[this.updateRowIndex].id);
    // console.log('http://localhost:8080/roundDetails/' + this.roundDetails[this.updateRowIndex].id);
    // console.log(this.roundDetails[this.updateRowIndex].id);
    // console.log(this.roundDetails[this.updateRowIndex]);
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
  public getRoundDetailsSize() {
    return this.roundDetails.length;
  }
  public toggleAddRoundDetailFlag() {
    // console.log('this.addRoundDetailFlag ' + this.addRoundDetailFlag);
    this.addRoundDetailFlag = !this.addRoundDetailFlag;
    // console.log('this.addRoundDetailFlag ' + this.addRoundDetailFlag);
    return this.addRoundDetailFlag;
  }

  public openModal() {
    // console.log('in OpenModal' + this.roundHeader);
    const modalRef = this.modalService.open(ModalContentComponent);
    modalRef.componentInstance.modalType = new ModalType(AddRoundDetailsComponent,
      { roundHeader : this.roundHeader, holes: this.holes });
    modalRef.componentInstance.loadModal();
  }
}
