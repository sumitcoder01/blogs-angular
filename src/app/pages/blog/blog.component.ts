import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogItemComponent } from '../../components/blog-item/blog-item.component';
import { Blog, BlogPostRoot } from '../../interfaces/blog';
import { BlogsService } from '../../services/blogs/blogs.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [BlogItemComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {
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
  };
  id: string = "";
  constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router, private blogService: BlogsService) { }
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.id = id ? id : "";
      this.loadBlog(this.id);
    });
  }
  loadBlog(id: string) {
    this.blogService.getBlog(id).subscribe({
      next: (res: BlogPostRoot) => {
        this.blog = res.blog as Blog;
      },
      error: (error: any) => {
        console.log('Error fetching blog', error);
        this.toastr.error('Error fetching blog', 'error');
        this.router.navigateByUrl('/');
      },
    });
  }
}
