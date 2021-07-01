import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRegisterChildComponent } from './edit-register-child.component';

describe('EditRegisterChildComponent', () => {
  let component: EditRegisterChildComponent;
  let fixture: ComponentFixture<EditRegisterChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRegisterChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRegisterChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
