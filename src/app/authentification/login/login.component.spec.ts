import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthentificationService } from '../authentification.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  let authService: AuthentificationService;
  let loginForm: FormGroup;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        LoginComponent,
        AuthentificationService,
        {provide: FormBuilder, useValue: formBuilder},
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = fixture.debugElement.injector.get(AuthentificationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when form is empty', () => {
    component.loginForm.controls.email.markAsDirty();
    component.loginForm.controls.password.markAsDirty();

    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should be login when form is valid', () => {
    spyOn(authService, 'loginWhitEmail').and.returnValue(Promise.resolve());
    loginForm = formBuilder.group({
      email: 'ejemplo@ejemplo.com',
      password: '1234567'
    });

    component.login(loginForm);

    expect(authService.loginWhitEmail).toHaveBeenCalledTimes(1);
    expect(authService.loginWhitEmail).toHaveBeenCalledWith(loginForm);
  });
});
