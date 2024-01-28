import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Blog, BlogRoot } from '../../interfaces/blog';
import { BlogsService } from '../../services/blogs/blogs.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-blogs',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './user-blogs.component.html',
  styleUrl: './user-blogs.component.css'
})
export class UserBlogsComponent implements OnInit {
  blogs: Blog[] = [];

  constructor(private blogService: BlogsService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.loadBlogs();
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
}
