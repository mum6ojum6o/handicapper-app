import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoundsService extends DataService {
  rounds: any;
  constructor(httpClient: HttpClient) {
    super(httpClient, 'http://localhost:8080/rounds');
   }
  public setRounds(rounds) {
    this.rounds = rounds;
  }
  public getRounds(): any {
    return this.rounds;
  }

}
