import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeeComponent } from './add-tee.component';

describe('AddTeeComponent', () => {
  let component: AddTeeComponent;
  let fixture: ComponentFixture<AddTeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
