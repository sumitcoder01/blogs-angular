import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../interfaces/user';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent {
  @Output() save: EventEmitter<User> = new EventEmitter();
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  @Input() user:User={
    _id: '',
    name: '',
    email: '',
    userType: '',
    blogs: [],
    createdAt: '',
    updatedAt: '',
    __v: 0
  }
  onSaveChanges() {
    this.save.emit(this.user);
  }
  closeModal() {
    this.close.emit(false);
  }
}
