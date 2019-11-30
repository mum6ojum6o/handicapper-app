import { Component, OnInit, Injectable, Input, destroyPlatform, ComponentRef, Output } from '@angular/core';
import { HolesService } from '../services/holes.service';
import { AddPlayerComponent } from '../add-player/add-player.component';
import { SinglegolfcourseComponent } from '../singlegolfcourse/singlegolfcourse.component';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-hole',
  templateUrl: './add-hole.component.html',
  styleUrls: ['./add-hole.component.css']
})
@Injectable()
export class AddHoleComponent implements OnInit {
  holeNumber: number;
  strokeIndex: number;
  par: number;
  @Input() id: number;
  @Output() uploaded = new EventEmitter();
  constructor(private service: HolesService) { }

  ngOnInit() {
  }

  public addHole() {
    console.log(this.id);
    this.service.add({
      'holeNumber': this.holeNumber,
      'strokeIndex': this.strokeIndex,
      'par': this.par,
     'golfCourse': {'id': this.id}

    }).subscribe((response) => {
      console.log(response);
      // alert(response.holeNumber + ' hole added');
      this.holeAdditionConfirmed(response);
    }, error => {
      alert('An unexpected error occured.');
    });
  }

  public holeAdditionConfirmed(hole: any) {
    this.uploaded.emit(hole);
  }
}
