import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildRegisterComponent } from './child-register.component';

describe('ChildRegisterComponent', () => {
  let component: ChildRegisterComponent;
  let fixture: ComponentFixture<ChildRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
