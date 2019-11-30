import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { GolfcourseComponent } from './golfcourse/golfcourse.component';
import { RouterModule } from '@angular/router';
import { AppErroHandler } from './common/app-error-handler';
import { SinglegolfcourseComponent } from './singlegolfcourse/singlegolfcourse.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PlayerComponent } from './player/player.component';
import { HolesComponent } from './holes/holes.component';
import { PlayerlistComponent } from './playerlist/playerlist.component';
import { RoundsComponent } from './rounds/rounds.component';
import { RounddetailsComponent } from './rounddetails/rounddetails.component';
import { AddPlayerComponent } from './add-player/add-player.component';
import { AddHoleComponent } from './add-hole/add-hole.component';
import { TeeComponent } from './tee/tee.component';
import { AddRoundsComponent } from './add-rounds/add-rounds.component';
import { AddRoundDetailsComponent } from './add-round-details/add-round-details.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalHandicapperComponent } from './modal-handicapper/modal-handicapper.component';
import { ModalContentComponent } from './modal-content/modal-content.component';
import { ModalDirective } from './modal-content/modal-directive/modal-directive';
import { AddTeeComponent } from './add-tee/add-tee.component';
import { EditPlayerComponent } from './edit-player/edit-player.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GolfcourseComponent,
    SinglegolfcourseComponent,
    HomeComponent,
    NotFoundComponent,
    PlayerComponent,
    HolesComponent,
    PlayerlistComponent,
    RoundsComponent,
    RounddetailsComponent,
    AddPlayerComponent,
    AddHoleComponent,
    TeeComponent,
    AddRoundsComponent,
    AddRoundDetailsComponent,
    ModalHandicapperComponent,
    ModalContentComponent,
    ModalDirective,
    AddTeeComponent,
    EditPlayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent},
      { path: 'golfCourses/:id/holes', component: HolesComponent},
      { path: 'golfCourses/:id/players', component: PlayerlistComponent},
      { path: 'golfCourses/:id/players/addplayer', component: AddPlayerComponent},
      { path: 'golfCourses/:id', component: SinglegolfcourseComponent},
      { path: 'golfCourse', component: GolfcourseComponent},
      { path: 'golfCourse/:id/players/:playerId', component: PlayerComponent},
      { path: 'golfCourse/:id/players/:playerId?refresh=1', component: PlayerComponent},
      { path: 'golfCourse/:id/players/:playerId/add-rounds', component: AddRoundsComponent},
    /* {path: 'archive/:year/:month', component: ArchiveViewComponent},
      {path: 'archive', component: ArchiveComponent},*/
      {path: '**', component: NotFoundComponent}
    ])
  ],
  entryComponents: [
    ModalContentComponent,
    AddRoundDetailsComponent,
    AddTeeComponent,
    EditPlayerComponent
  ],
  providers: [
    {provide: ErrorHandler, useClass: AppErroHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
