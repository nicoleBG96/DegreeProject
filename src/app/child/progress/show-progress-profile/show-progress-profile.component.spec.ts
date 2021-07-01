import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProgressProfileComponent } from './show-progress-profile.component';

describe('ShowProgressProfileComponent', () => {
  let component: ShowProgressProfileComponent;
  let fixture: ComponentFixture<ShowProgressProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowProgressProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProgressProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
