import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProgressComponent } from './edit-progress.component';

describe('EditProgressComponent', () => {
  let component: EditProgressComponent;
  let fixture: ComponentFixture<EditProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
