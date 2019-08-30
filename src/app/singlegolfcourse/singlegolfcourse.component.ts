import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SinglegolfcourseService } from '../services/singlegolfcourse.service';
import { combineLatest, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AppError } from '../common/apperror';
import { AddHoleComponent } from '../add-hole/add-hole.component';

@Component({
  selector: 'singlegolfcourse',
  templateUrl: './singlegolfcourse.component.html',
  styleUrls: ['./singlegolfcourse.component.css'],
})
@Injectable()
export class SinglegolfcourseComponent implements OnInit {
golfCourse: any;
holes: any[];
id: number;
addHole: boolean;
  constructor(
    private route: ActivatedRoute,
    private service: SinglegolfcourseService
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
            console.log('id from URL: ' + this.id);
            this.service.setUrl('http://localhost:8080/golfCourses/' + this.id);
            return this.service.getAll();
        }),
        catchError( (error: Response) => {
          return throwError(new AppError(error));
        }
      )).subscribe( golfCourse => {
        this.golfCourse = golfCourse;
        this.holes = this.golfCourse.holes;
      });
  }
  private toggleHoleCreationFlag() {
    this.addHole = !this.addHole;
  }

  private updateResults($result) {
    console.log("In Update Results");
    this.toggleHoleCreationFlag();
    console.log(this.holes.push($result));
  }
}
