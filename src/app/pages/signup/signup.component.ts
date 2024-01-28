import { Component } from '@angular/core';
import { CreateUser } from '../../interfaces/user';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Response } from '../../interfaces/response';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  user: CreateUser = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  constructor(private toastr: ToastrService, private router: Router, private authService: AuthService) {
    if (this.authService.isLoggedIn) {
      this.router.navigateByUrl('/');
    }
  }

  handleOnSubmit() {
    if (this.user.name.length < 3 || this.user.email.length < 3 || this.user.password.length < 3) {
      this.toastr.error('invalid user details', 'error');
      return;
    }
    this.onSubmit(this.user);
  }
  onSubmit(user: CreateUser) {
    this.authService.createUser(user).subscribe({
      next: (res: Response) => {
        this.toastr.success(res.message, 'success');
        this.router.navigateByUrl('/login');
      },
      error: (error: any) => {
        console.log('Error on signup', error);
        this.toastr.error('Invalid user details', 'error');
      },
    });
  }
}
