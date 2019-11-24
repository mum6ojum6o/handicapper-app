import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service' ;
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GolfcourseService extends DataService {

  constructor( httpClient: HttpClient) {
      super(httpClient, environment.url + '/golfCourses');
   }
}
