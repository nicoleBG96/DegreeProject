import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMensualityComponent } from './show-mensuality.component';

describe('ShowMensualityComponent', () => {
  let component: ShowMensualityComponent;
  let fixture: ComponentFixture<ShowMensualityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowMensualityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMensualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
