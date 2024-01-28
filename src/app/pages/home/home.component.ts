import { Component } from '@angular/core';
import { BlogsService } from '../../services/blogs/blogs.service';
import { Blog, BlogRoot } from '../../interfaces/blog';
import { BlogListComponent } from '../../components/blog-list/blog-list.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BlogListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  blogs: Blog[] = [];

  constructor(private blogService: BlogsService,private toastr: ToastrService,private router: Router) {}
  ngOnInit(): void {
    this.loadBlogs();
  }
  loadBlogs() {
    this.blogService.getLatestBlogs().subscribe({
      next: (res: BlogRoot) => {
        this.blogs = res.blogs as Blog[];
      },
      error: (error: any) => {
        console.log('Error fetching blogs', error);
        this.toastr.error('Error fetching blogs', 'error');
        this.router.navigateByUrl('/');
      },
    });
  }
}
