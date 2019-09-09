import { Component, OnInit, Input, Output } from '@angular/core';
import {  switchMap, catchError } from 'rxjs/operators';
import { combineLatest, throwError } from 'rxjs';
import { AppError } from '../common/apperror';
import { TeesService } from '../services/tees.service';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-tee',
  templateUrl: './tee.component.html',
  styleUrls: ['./tee.component.css']
})
export class TeeComponent  {
  @Input() tees: any[];
  @Input() addTee: boolean;
  @Input() golfCourseId: any;
  @Output() teeAdded = new EventEmitter();
  teeName: number;
  courseRating: number;
  slopeRating: number;
  golfCourse: any;
  constructor(private service: TeesService) { this.addTee = false; }

  private add() {
    //console.log(this.id);
    this.service.add({
      'teeName': this.teeName,
      'courseRating': this.courseRating,
      'slopeRating': this.slopeRating,
     'golfCourse': {'id': this.golfCourseId}

    }).subscribe((response) => {
      console.log(response);
      this.teeAddedConfirmed(response);
    }, error => {
      alert('An unexpected error occured.');
    });
  }
  teeAddedConfirmed(tee: any){
      this.teeAdded.emit(tee);
  }

}
