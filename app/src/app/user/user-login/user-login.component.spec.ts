import { TestBed, ComponentFixture } from '@angular/core/testing';
import { UserLoginComponent } from './user-login.component';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [ UserLoginComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ UserService, Router ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Login ok', () => {
    expect(component).toBeTruthy();
  });
});