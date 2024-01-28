import { Component, OnInit } from '@angular/core';
import { UserBlogsComponent } from '../../components/user-blogs/user-blogs.component';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User, UserResponse } from '../../interfaces/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [UserBlogsComponent,CommonModule],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent implements OnInit {
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
