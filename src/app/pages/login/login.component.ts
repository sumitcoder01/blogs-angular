import { Component ,Inject } from '@angular/core';
import { LoginUser } from '../../interfaces/user';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginResponse } from '../../interfaces/user';
import { AuthService } from '../../services/auth/auth.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: LoginUser = {
    email: '',
    password: ''
  }
  constructor(private toastr: ToastrService, private router: Router, private authService: AuthService, @Inject(DOCUMENT) private document: Document) { 
    if(this.authService.isLoggedIn){
      this.router.navigateByUrl('/');
    }
  }
  handleOnSubmit() {
    if (this.user.email.length < 3 || this.user.password.length < 3) {
      this.toastr.error('invalid user details', 'error');
      return;
    }
    this.onSubmit(this.user);
  }
  onSubmit(user: LoginUser) {
    this.authService.loginUser(user).subscribe({
      next: (res: LoginResponse) => {
        this.toastr.success(res.message, 'success');
        this.document.defaultView?.localStorage?.setItem('auth-token', res.authToken);
        this.authService.updateAuth();
        this.router.navigateByUrl('/');
      },
      error: (error: any) => {
        console.log('Error on login', error);
        this.toastr.error('Invalid user details', 'error');
      },
    });
  }
}
