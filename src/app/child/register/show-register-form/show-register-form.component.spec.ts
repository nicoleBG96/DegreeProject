import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRegisterFormComponent } from './show-register-form.component';

describe('ShowRegisterFormComponent', () => {
  let component: ShowRegisterFormComponent;
  let fixture: ComponentFixture<ShowRegisterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowRegisterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
