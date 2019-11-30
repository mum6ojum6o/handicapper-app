import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SinglegolfcourseService } from '../services/singlegolfcourse.service';
import { combineLatest, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AppError } from '../common/apperror';
import { AddHoleComponent } from '../add-hole/add-hole.component';
import { environment } from '../../environments/environment';
import { ModalContentComponent } from '../modal-content/modal-content.component';
import { AddTeeComponent } from '../add-tee/add-tee.component';
import { ModalType } from '../modal-content/modal-type/modal-type';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'singlegolfcourse',
  templateUrl: './singlegolfcourse.component.html',
  styleUrls: ['./singlegolfcourse.component.css'],
})
@Injectable()
export class SinglegolfcourseComponent implements OnInit {
golfCourse: any;
holes: any[];
tees: any[];
id: number;
addHole: boolean;
addTee: boolean;
  constructor(
    private route: ActivatedRoute,
    private service: SinglegolfcourseService,
    private modalService: NgbModal
  ) {
    this.addHole = false;
   }

  ngOnInit() {
    combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ])
      .pipe(
        switchMap( combined => {
            this.id = +combined[0].getAll('id')[0];
            // console.log('id from URL: ' + this.id);
            this.service.setUrl(environment.url + '/golfCourses/' + this.id);
            return this.service.getAll();
        }),
        catchError( (error: Response) => {
          return throwError(new AppError(error));
        }
      )).subscribe( golfCourse => {
        this.golfCourse = golfCourse;
        this.holes = this.golfCourse.holes;
        this.tees = this.golfCourse.tees;
      });
  }
  public toggleHoleCreationFlag() {
    this.addHole = !this.addHole;
  }
  public toggleTeeCreationFlag() {
    this.addTee = !this.addTee;
  }

  public updateResults($result) {
    console.log("In Update Results");
    this.toggleHoleCreationFlag();
    // console.log(this.holes.push($result));
  }


  public newHoleToBeAdded() {
    return this.addHole;
  }
  public updateTees($result) {
    this.toggleTeeCreationFlag();
    this.tees.push($result);
  }
  public openModal() {
    // console.log('GolfCourseId:'+this.golfCourse);
    const modalRef = this.modalService.open(ModalContentComponent);
    modalRef.componentInstance.modalType = new ModalType(AddTeeComponent,
      { golfCourseId : this.golfCourse.id });
    modalRef.componentInstance.loadModal();
  }

}
