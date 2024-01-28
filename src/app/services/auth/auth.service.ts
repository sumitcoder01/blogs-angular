import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { CreateUser, LoginResponse, LoginUser, User, UserResponse } from '../../interfaces/user';
import { Response } from '../../interfaces/response';
import { DOCUMENT } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) {
    this.updateAuth();
  }

  updateAuth() {
    if (this.document.defaultView?.localStorage?.getItem('auth-token'))
      this.isLoggedIn = true;
    else this.isLoggedIn = false;
  }
  
  logout() {
    this.document.defaultView?.localStorage?.removeItem('auth-token');
    this.isLoggedIn=false;
  }

  getUser(): Observable<UserResponse> {
    let token = this.document.defaultView?.localStorage?.getItem('auth-token');
    let headers = new HttpHeaders().set('auth-token', `${token}`);
    return this.http.get<UserResponse>(environment.BASE_API + environment.AUTH.GET_USER, { headers });
  }

  updateUser(user: User): Observable<Response> {
    let token = this.document.defaultView?.localStorage?.getItem('auth-token');
    let headers = new HttpHeaders().set('auth-token', `${token}`);
    return this.http.put<Response>(environment.BASE_API + environment.AUTH.UPDATE_USER, user, { headers });
  }

  createUser(user: CreateUser): Observable<Response> {
    return this.http.post<Response>(environment.BASE_API + environment.AUTH.CREATE_USER, user);
  }

  loginUser(user: LoginUser): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(environment.BASE_API + environment.AUTH.LOGIN_USER, user);
  }
}
