import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMensualityChildComponent } from './show-mensuality-child.component';

describe('ShowMensualityChildComponent', () => {
  let component: ShowMensualityChildComponent;
  let fixture: ComponentFixture<ShowMensualityChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowMensualityChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMensualityChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
