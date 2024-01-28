import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBlogsComponent } from './user-blogs.component';

describe('UserBlogsComponent', () => {
  let component: UserBlogsComponent;
  let fixture: ComponentFixture<UserBlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserBlogsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
