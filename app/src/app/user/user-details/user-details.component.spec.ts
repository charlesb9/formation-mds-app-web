// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { UserDetailComponent } from './user-details.component';
// import { HttpClientTestingModule } from '@angular/common/http/testing';

// describe('UserDetailComponent', () => {
//     let component: UserDetailComponent;
//     let fixture: ComponentFixture<UserDetailComponent>;
  
//     beforeEach(async () => {
//       await TestBed.configureTestingModule({
//         declarations: [ UserDetailComponent ],
//         imports: [ HttpClientTestingModule],
//       })
//       .compileComponents();
      
//       fixture = TestBed.createComponent(UserDetailComponent);
//       component = fixture.componentInstance;
//       fixture.detectChanges();
//     });
  
//     it('should create', () => {
//       expect(component).toBeTruthy();
//     });  
// });


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailsComponent } from './user-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDetailsComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1',
              },
            },
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('User details Ok', () => {
    expect(component).toBeTruthy();
  });
});