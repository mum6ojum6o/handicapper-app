import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class SinglegolfcourseService extends DataService {
  private aUrl  = 'http://localhost:8080/golfCourses/';
  private workUrl = 'http://localhost:8080/golfCourses/';
  constructor(httpClient: HttpClient) {
    super(httpClient, 'http://localhost:8080/golfCourses/');
  }
   getGolfCourse( additionalParams: string) {
     this.workUrl = this.aUrl + additionalParams;
     this.setUrl(this.workUrl);
     this.getAll();
  }

  //public
}
