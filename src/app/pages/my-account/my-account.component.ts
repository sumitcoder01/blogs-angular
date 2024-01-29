import { Component, OnInit } from '@angular/core';
import { UserBlogsComponent } from '../../components/user-blogs/user-blogs.component';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User, UserResponse } from '../../interfaces/user';
import { CommonModule } from '@angular/common';
import { UpdateUserComponent } from '../../components/update-user/update-user.component';
import { Response } from '../../interfaces/response';
import { AddBlogComponent } from '../../components/add-blog/add-blog.component';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [UserBlogsComponent,CommonModule,UpdateUserComponent,AddBlogComponent],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent implements OnInit {
  show: boolean = false;
  user: User = {
    _id: '',
    name: '',
    email: '',
    userType: '',
    blogs: [],
    createdAt: '',
    updatedAt: '',
    __v: 0
  };
  constructor(private authService: AuthService,private toastr: ToastrService,private router: Router) {}
  ngOnInit(): void {
    if(!this.authService.isLoggedIn){
      this.router.navigateByUrl('/');
    }
    this.loadUser();
  }

  handleOnUpdate() {
    this.show=true;
  }

  updateUser(user:User){
    this.show = false;
    this.authService.updateUser(user).subscribe({
      next: (res: Response) => {
        this.toastr.success(res.message,'success');
        this.user = user;
      },
      error: (error: any) =>{
        console.log('User details not updated successfully', error);
        this.toastr.error('User details not updated successfully', 'error');
      },
    });
  }
  loadUser() {
    this.authService.getUser().subscribe({
      next: (res: UserResponse) => {
        this.user = res.user as User;
      },
      error: (error: any) =>{
        console.log('Error fetching blogs', error);
        this.toastr.error('Error fetching user', 'error');
        this.router.navigateByUrl('/');
      },
    });
  }
}
