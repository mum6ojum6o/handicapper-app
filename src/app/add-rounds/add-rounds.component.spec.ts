import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoundsComponent } from './add-rounds.component';

describe('AddRoundsComponent', () => {
  let component: AddRoundsComponent;
  let fixture: ComponentFixture<AddRoundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRoundsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
