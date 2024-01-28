import { Component, Input } from '@angular/core';
import { Blog } from '../../interfaces/blog';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-item',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './blog-item.component.html',
  styleUrl: './blog-item.component.css',
})
export class BlogItemComponent {
  @Input() blog: Blog = {
    _id: '',
    title: '',
    description: '',
    author: '',
    authorId: '',
    category: '',
    createdAt: '',
    updatedAt: '',
    __v: 0,
  };
}
