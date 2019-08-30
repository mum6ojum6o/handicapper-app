import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RounddetailsComponent } from './rounddetails.component';

describe('RounddetailsComponent', () => {
  let component: RounddetailsComponent;
  let fixture: ComponentFixture<RounddetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RounddetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RounddetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
