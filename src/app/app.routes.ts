import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { LayoutComponent } from './pages/layout/layout.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        title: 'Coding Blogs Home Page',
      },
      {
        path: 'about',
        component: AboutComponent,
        title: 'Coding Blogs About Page',
      },
      {
        path: 'login',
        component: LoginComponent,
        title: 'Coding Blogs Login Page',
      },
      {
        path: 'signup',
        component: SignupComponent,
        title: 'Coding Blogs Signup Page',
      },
      {
        path: 'myaccount',
        component: MyAccountComponent,
        title: 'Coding Blogs MyAccount Page',
      },
      {
        path: 'blogs',
        component: BlogsComponent,
        title: 'Coding Blogs All Blogs Page',
      },
      {
        path: 'blogs/blog/:id',
        component: BlogComponent,
        title: 'Coding Blogs Blog Page',
      },
    ],
  },
  { path: '**', component: PageNotFoundComponent, title: 'Not Found Page' },
];
