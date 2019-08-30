import { Component, OnInit, Injectable } from '@angular/core';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
@Injectable()
export class AddPlayerComponent implements OnInit {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  memberOf: number;
  constructor(private service: PlayerService) { }

  ngOnInit() {
  }

  addPlayer() {
    this.service.add({
      'firstName': this.firstName,
      'lastName': this.lastName,
      'phoneNumber': this.phoneNumber,
      'email': this.email,
      'memberOf': [{'id': 3}]

    }).subscribe((response) => {
      console.log(response);
      alert(response.firstName +' player added');
      //this.players.push(response);
    }, error => {
      alert('An unexpected error occured.');
    });
  }
  reset() {
    this.firstName = null;
    this.lastName = null;
    this.email = null;
    this.phoneNumber = null;
  }

}
