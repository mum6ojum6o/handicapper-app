import { Component, OnInit, Injectable, Input, Output } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { environment } from 'src/environments/environment';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})
@Injectable()
export class EditPlayerComponent implements OnInit {
  @Input() data: any;
  @Output() playerUpdated =  new EventEmitter();
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  playerId: number;
  memberOf: number;
  modalRef:any;
  constructor( private service: PlayerService) { }

  ngOnInit() {

    if (this.data != null) {
      this.firstName = this.data.firstName;
      this.lastName = this.data.lastName;
      this.phoneNumber = this.data.phoneNumber;
      this.email = this.data.email;
      this.playerId = this.data.playerId;
      this.memberOf = this.data.memberOf;
      this.modalRef = this.data.modal;
    }

  }

  public updatePlayer() {
    this.service.setUrl(environment.url + '/players/' + this.playerId);
    // console.log('playerId:' + this.playerId) ;
    this.service.update(
      {
        'id':this.playerId,
        'firstName': this.firstName,
        'lastName': this.lastName,
        'phoneNumber': this.phoneNumber,
        'email': this.email,
        'memberOf': [{'id': this.memberOf}]
      }
    ).subscribe((response) => {
      // console.log(response);
      this.playedUpdateConfirmed(response);
      this.modalRef.close(response);
  });
  }
  public playedUpdateConfirmed(updatedPlayer: any) {
    this.playerUpdated.emit(updatedPlayer);
  }
}
