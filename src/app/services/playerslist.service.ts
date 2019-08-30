import { Injectable } from '@angular/core';
import { DataService } from '../data.service' ;
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayerslistService extends DataService {

  constructor(httpClient: HttpClient) {
    super(httpClient,
      'http://localhost:8080/golfCourses/0/players');
    }
}
