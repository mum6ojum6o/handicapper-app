import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GolfcourseComponent } from './golfcourse.component';

describe('GolfcourseComponent', () => {
  let component: GolfcourseComponent;
  let fixture: ComponentFixture<GolfcourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GolfcourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GolfcourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
