import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadReviews, updateReview } from '../../store/reviews/reviews.actions';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../navbar/navbar.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { selectReviewById } from '../../store/reviews/review.selectors';
import { ReviewDTO } from '../../dto/review.dto';
import { UpdateReviewDTO } from '../../dto/update-review.dto';
import { take } from 'rxjs';

@Component({
  selector: 'app-review-update',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NavbarComponent,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './review-update.component.html',
  styleUrl: './review-update.component.scss'
})
export class ReviewUpdateComponent {
  reviewForm: FormGroup;
  reviewId: number;
  gameId: number;

  constructor(private fb: FormBuilder, private store: Store, private route: ActivatedRoute, private router: Router) {
    this.reviewForm = this.fb.group({
      rating: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      comment: ['', Validators.required]
    });

    this.reviewId = +this.route.snapshot.paramMap.get('reviewId')!;
    this.gameId = +this.route.snapshot.queryParamMap.get('gameId')!;
    this.loadReviewDetails();
  }

  loadReviewDetails() {
    this.store.select(selectReviewById(this.reviewId))
      .pipe(take(1))  // Take only the first emission and unsubscribe
      .subscribe(review => {
        if (review) {
          this.reviewForm.patchValue({
            rating: review.rating,
            comment: review.comment
          });
        } else {
          console.error('Review not found');
        }
      });
  }

  onSubmit() {
    if (this.reviewForm.valid && this.gameId !== undefined) {
      const updatedReview: UpdateReviewDTO = {
        id: this.reviewId, // Ensure reviewId is defined
        ...this.reviewForm.value,
      };
      
      if (this.reviewId) {  // Ensure reviewId is not undefined or null
        this.store.dispatch(updateReview({ review: updatedReview }));
        this.router.navigate(['/game-detail', this.gameId]).then(() => {
          this.store.dispatch(loadReviews({ gameId: this.gameId }));
        });
      } else {
        console.error('Review ID is undefined');
      }
    } else {
      console.error('Form is invalid or gameId is undefined');
    }
  }
}
