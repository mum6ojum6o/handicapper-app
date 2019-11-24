import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RoundDetailsService extends DataService {

  constructor( httpClient: HttpClient) {
    super(httpClient, environment.url + '/addAllRounds');
   }
   /*setUrl(url: string) {
    this.setUrl(url);
   }*/

}
