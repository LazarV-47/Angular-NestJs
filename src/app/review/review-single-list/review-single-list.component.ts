import { Component, Input } from '@angular/core';
import { Review } from '../../store/reviews/reviews.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'review-single-list',
  standalone: true,
  imports: [
    MatCardModule,
    
  ],
  templateUrl: './review-single-list.component.html',
  styleUrl: './review-single-list.component.scss'
})
export class ReviewSingleListComponent {
  @Input() review!: Review;
}
