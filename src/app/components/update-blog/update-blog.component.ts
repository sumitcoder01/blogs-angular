import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Blog } from '../../interfaces/blog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-blog',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-blog.component.html',
  styleUrl: './update-blog.component.css'
})
export class UpdateBlogComponent {
  @Output() save: EventEmitter<Blog> = new EventEmitter();
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  @Input() blog: Blog = {
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
  onSaveChanges() {
    this.save.emit(this.blog);
  }
  closeModal() {
    this.close.emit(false);
  }
}
