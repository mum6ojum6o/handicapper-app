import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TeesService } from '../services/tees.service';
import { ModalData } from '../modal-content/modal-data-interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-tee',
  templateUrl: './add-tee.component.html',
  styleUrls: ['./add-tee.component.css']
})
export class AddTeeComponent implements OnInit, ModalData {
  @Input() data: any;
  teeName: number;
  courseRating: number;
  slopeRating: number;
  golfCourse: any;
  @Input() golfCourseId: any;
  @Output() teeAdded = new EventEmitter();
  constructor(private service: TeesService) { }

  ngOnInit() {
    if (this.data != null) {
      this.golfCourseId = this.data.golfCourseId;
    }
  }
  public add() {
    // console.log(this.id);
    // console.log('GolfCourseId:'+ this.golfCourseId);
    this.service.setUrl(environment.url + '/tees');
    this.service.add({
    teeName: this.teeName,
    courseRating: this.courseRating,
    slopeRating: this.slopeRating,
    golfCourse: {id: this.golfCourseId}

    }).subscribe((response) => {
      // console.log(response);
      this.teeAddedConfirmed(response);
      this.teeName = null;
      this.slopeRating = 0;
      this.courseRating = 0.0;
    }, error => {
      alert('An unexpected error occured.');
    });
  }
  public teeAddedConfirmed(tee: any) {
    this.teeAdded.emit(tee);
}
}
