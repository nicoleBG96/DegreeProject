import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMedicalRecordFormComponent } from './show-medical-record-form.component';

describe('ShowMedicalRecordFormComponent', () => {
  let component: ShowMedicalRecordFormComponent;
  let fixture: ComponentFixture<ShowMedicalRecordFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowMedicalRecordFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMedicalRecordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
