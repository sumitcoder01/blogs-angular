import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-blog',
  standalone: true,
  imports: [],
  templateUrl: './delete-blog.component.html',
  styleUrl: './delete-blog.component.css'
})
export class DeleteBlogComponent {
  @Output() promtevent: EventEmitter<boolean> = new EventEmitter();
  onDelete(isDelete: boolean) {
    this.promtevent.emit(isDelete);
  }
}
