import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {createtedBlog } from '../../interfaces/blog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BlogsService } from '../../services/blogs/blogs.service';
import { Response } from '../../interfaces/response';

@Component({
  selector: 'app-add-blog',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.css'
})
export class AddBlogComponent {
  blog: createtedBlog = {
    title: '',
    description: '',
    category: '',
  }

  constructor(private toastr: ToastrService, private router: Router, private blogService: BlogsService) { }
  handleOnSubmit() {
    if (this.blog.title.length < 3 || this.blog.description.length < 3 || this.blog.category.length < 3) {
      this.toastr.error('invalid blog details', 'error');
      return;
    }
    this.onSubmit(this.blog);
  }
  onSubmit(blog: createtedBlog) {
    this.blogService.createBlog(blog).subscribe({
      next: (res: Response) => {
        this.toastr.success(res.message, 'success');
        this.router.navigateByUrl('/myaccount');
      },
      error: (error: any) => {
        console.log('Error on login', error);
        this.toastr.error('Invalid user details', 'error');
      },
    });
  }
}
