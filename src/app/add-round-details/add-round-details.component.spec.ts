import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoundDetailsComponent } from './add-round-details.component';

describe('AddRoundDetailsComponent', () => {
  let component: AddRoundDetailsComponent;
  let fixture: ComponentFixture<AddRoundDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRoundDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoundDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
