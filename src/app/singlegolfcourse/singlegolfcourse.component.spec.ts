import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglegolfcourseComponent } from './singlegolfcourse.component';

describe('SinglegolfcourseComponent', () => {
  let component: SinglegolfcourseComponent;
  let fixture: ComponentFixture<SinglegolfcourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglegolfcourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglegolfcourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
