import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HolesService extends DataService {

  constructor(httpClient: HttpClient) {
    super(httpClient, environment.url + '/holes');
   }
}
