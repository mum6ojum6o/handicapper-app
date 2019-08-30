import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service' ;
@Injectable({
  providedIn: 'root'
})
export class GolfcourseService extends DataService {

  constructor( httpClient: HttpClient) {
      super(httpClient, 'http://localhost:8080/golfCourses');
   }
}
