import { Component, OnInit, Injectable } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppError } from '../common/apperror';
import { map, switchMap, catchError} from 'rxjs/operators';
import { Observable, combineLatest, throwError, } from 'rxjs';

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
  parameter: number;
  constructor(
    private service: PlayerService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ]).pipe(
      switchMap( combined => {
        let param = combined[0].getAll('id')[0];
        return param;
      })).subscribe( id => {
        this.parameter = +id;
        console.log(this.parameter);
      });
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
      this.router.navigate(['/golfCourses/'+this.parameter+'/players']);
      //alert(response.firstName +' player added');

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
