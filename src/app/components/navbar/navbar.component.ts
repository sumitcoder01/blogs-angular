import { Component} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent{

  constructor(private toastr: ToastrService, public authService: AuthService) { }

  logout() {
    this.authService.logout();
    this.toastr.success('Logout successfully', 'success');
  }
}
