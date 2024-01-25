import { Component} from '@angular/core';
import { Blog } from '../../interfaces/blog';

@Component({
  selector: 'app-blog-item',
  standalone: true,
  imports: [],
  templateUrl: './blog-item.component.html',
  styleUrl: './blog-item.component.css',
  inputs:['BlogItem']
})
export class BlogItemComponent {
  
}