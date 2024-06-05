import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserCreateComponent } from './user-create.component';

describe('UserCreateComponent', () => {
    let component: UserCreateComponent;
    let fixture: ComponentFixture<UserCreateComponent>;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [UserCreateComponent]
      })
      .compileComponents();
      
      fixture = TestBed.createComponent(UserCreateComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });  
});