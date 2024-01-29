import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Blog, BlogPostRoot, BlogRoot, createtedBlog } from '../../interfaces/blog';
import { DOCUMENT } from '@angular/common';
import { Response } from '../../interfaces/response';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) { }

  getAllBlogs(): Observable<BlogRoot> {
    return this.http.get<BlogRoot>(
      environment.BASE_API + environment.Blogs.GET_ALL_BLOGS
    );
  }

  getUserBlogs(): Observable<BlogRoot> {
    let token = this.document.defaultView?.localStorage?.getItem('auth-token');
    let headers = new HttpHeaders().set('auth-token', `${token}`);
    return this.http.get<BlogRoot>(environment.BASE_API + environment.Blogs.GET_USER_BLOGS, { headers });
  }

  createBlog(blog: createtedBlog): Observable<Response> {
    let token = this.document.defaultView?.localStorage?.getItem('auth-token');
    let headers = new HttpHeaders().set('auth-token', `${token}`);
    return this.http.post<Response>(environment.BASE_API + environment.Blogs.CREATE_BLOG, blog, { headers });
  }

  updateBlog(id: string, blog: Blog): Observable<Response> {
    let token = this.document.defaultView?.localStorage?.getItem('auth-token');
    let headers = new HttpHeaders().set('auth-token', `${token}`);
    return this.http.put<Response>(environment.BASE_API + environment.Blogs.UPDATE_BLOG + id, blog, { headers });
  }

  deleteBlog(id: string): Observable<Response> {
    let token = this.document.defaultView?.localStorage?.getItem('auth-token');
    let headers = new HttpHeaders().set('auth-token', `${token}`);
    return this.http.delete<Response>(environment.BASE_API + environment.Blogs.DELETE_BLOG + id, { headers });
  }

  getBlog(id: string): Observable<BlogPostRoot> {
    return this.http.get<BlogPostRoot>(
      environment.BASE_API + environment.Blogs.GET_BLOG + id
    );
  }

  getLatestBlogs(): Observable<BlogRoot> {
    return this.http.get<BlogRoot>(
      environment.BASE_API + environment.Blogs.GET_LATEST_BLOGS
    );
  }
}
