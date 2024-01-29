import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Blog, BlogRoot } from '../../interfaces/blog';
import { BlogsService } from '../../services/blogs/blogs.service';
import { ToastrService } from 'ngx-toastr';
import { UpdateBlogComponent } from '../update-blog/update-blog.component';
import { Response } from '../../interfaces/response';
import { DeleteBlogComponent } from '../delete-blog/delete-blog.component';
@Component({
  selector: 'app-user-blogs',
  standalone: true,
  imports: [RouterLink, CommonModule, UpdateBlogComponent, DeleteBlogComponent],
  templateUrl: './user-blogs.component.html',
  styleUrl: './user-blogs.component.css'
})
export class UserBlogsComponent implements OnInit {
  blogs: Blog[] = [];
  showDelete: boolean = false;
  showUpdate: boolean = false;
  index: number = -1;
  blog: Blog = {
    _id: '',
    title: '',
    description: '',
    author: '',
    authorId: '',
    category: '',
    createdAt: '',
    updatedAt: '',
    __v: 0
  }
  constructor(private blogService: BlogsService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.loadBlogs();
  }
  handleOnUpdate(index: number) {
    this.index = index;
    this.blog = this.blogs[index];
    this.showUpdate = true;
  }
  handleOnDelete(index: number) {
    this.showDelete = true;
    this.index = index;
  }

  loadBlogs() {
    this.blogService.getUserBlogs().subscribe({
      next: (res: BlogRoot) => {
        this.blogs = res.blogs as Blog[];
      },
      error: (error: any) => {
        console.log('Error fetching blogs', error);
        this.toastr.error('Error fetching blogs', 'error');
      },
    });
  }
  updateBlog(blog: Blog) {
    this.showUpdate = false;
    this.blogService.updateBlog(blog._id, blog).subscribe({
      next: (res: Response) => {
        this.toastr.success(res.message, 'success');
        this.blogs[this.index] = blog;
      },
      error: (error: any) => {
        console.log('Blog not updated successfully', error);
        this.toastr.error('Blog not updated successfully', 'error');
      },
    });
  }
  deleteBlog(promt: boolean) {
    this.showDelete = false;
    if (!promt) {
      this.index = -1
      return;
    }

    let id = this.blogs[this.index]._id;
    this.blogs.splice(this.index, 1);
    this.index = -1;
    this.blogService.deleteBlog(id).subscribe({
      next: (res: Response) => {
        this.toastr.success(res.message, 'success');
      },
      error: (error: any) => {
        console.log('Blog not deleted successfully', error);
        this.toastr.error('Blog not deleted successfully', 'error');
      },
    });
  }
}
