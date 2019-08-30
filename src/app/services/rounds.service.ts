import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoundsService {
  rounds: any;
  constructor() { }
  public setRounds(rounds) {
    this.rounds = rounds;
  }
  public getRounds(): any {
    return this.rounds;
  }
}
