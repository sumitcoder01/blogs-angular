import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  constructor(private toastr: ToastrService) {
    this.isLoggedIn=false;
  }
  ngOnInit() {
    if (localStorage.getItem('auth-token')) this.isLoggedIn = true;
    else this.
    isLoggedIn = false;
  }
  logout() {
    this.toastr.success('logout successfully', 'success!');
    localStorage.removeItem('auth-token');
    this.isLoggedIn = false;
  }
}
