import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GolfcourseService } from '../golfcourse.service';
import { Observable, combineLatest, throwError, } from 'rxjs';
import { map, switchMap, catchError} from 'rxjs/operators';
import { AppError } from '../common/apperror';
@Component({
  selector: 'golfcourse',
  templateUrl: './golfcourse.component.html',
  styleUrls: ['./golfcourse.component.css']
})
@Injectable()
export class GolfcourseComponent implements OnInit {
  golfCourses: any[];
  constructor(
    private route: ActivatedRoute,
    private service: GolfcourseService
  ) {
  }

  ngOnInit() {
    // console.log('in gcomponent ngInit');
    combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ]).pipe(
      switchMap( () => {
        return this.service.getAll();
      }),
      catchError( (error: Response) => {
        return throwError(new AppError(error));
      })
    ).subscribe( (gcs) => {
      this.golfCourses = gcs;
      // console.log('golfCourse:' + this.golfCourses);
     } );
  }

}
