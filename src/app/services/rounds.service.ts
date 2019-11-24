import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RoundsService extends DataService {
  rounds: any;
  constructor(httpClient: HttpClient) {
    super(httpClient, environment.url + '/rounds');
   }
  public setRounds(rounds) {
    this.rounds = rounds;
  }
  public getRounds(): any {
    return this.rounds;
  }

}
