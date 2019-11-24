import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHandicapperComponent } from './modal-handicapper.component';

describe('ModalHandicapperComponent', () => {
  let component: ModalHandicapperComponent;
  let fixture: ComponentFixture<ModalHandicapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalHandicapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHandicapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
