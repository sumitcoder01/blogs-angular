import { Component , OnInit } from '@angular/core';
import { Blog, BlogRoot } from '../../interfaces/blog';
import { BlogsService } from '../../services/blogs/blogs.service';
import { BlogListComponent } from '../../components/blog-list/blog-list.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [BlogListComponent],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css',
})
export class BlogsComponent implements OnInit {
  blogs: Blog[] = [];

  constructor(private blogService: BlogsService,private toastr: ToastrService,private router: Router) {}
  ngOnInit(): void {
    this.loadBlogs();
  }
  loadBlogs() {
    this.blogService.getAllBlogs().subscribe({
      next: (res: BlogRoot) => {
        this.blogs = res.blogs as Blog[];
      },
      error: (error: any) =>{
        console.log('Error fetching blogs', error);
        this.toastr.error('Error fetching blogs', 'error');
        this.router.navigateByUrl('/');
      },
    });
  }
}
