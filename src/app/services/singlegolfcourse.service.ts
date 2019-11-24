import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SinglegolfcourseService extends DataService {
  private aUrl  = environment.url + '/golfCourses/';
  private workUrl = environment.url + '/golfCourses/';
  constructor(httpClient: HttpClient) {
    super(httpClient, environment.url + '/golfCourses/');
    console.log(this.aUrl);
  }
   getGolfCourse( additionalParams: string) {
     this.workUrl = this.aUrl + additionalParams;
     this.setUrl(this.workUrl);
     this.getAll();
  }

  //public
}
