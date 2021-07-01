import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensualityListComponent } from './mensuality-list.component';

describe('MensualityListComponent', () => {
  let component: MensualityListComponent;
  let fixture: ComponentFixture<MensualityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensualityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensualityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
