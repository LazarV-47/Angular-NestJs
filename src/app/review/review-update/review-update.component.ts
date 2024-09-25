import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { updateReview } from '../../store/reviews/reviews.actions';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../navbar/navbar.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { selectReviewById } from '../../store/reviews/review.selectors';
import { ReviewDTO } from '../../dto/review.dto';
import { UpdateReviewDTO } from '../../dto/update-review.dto';

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
  gameId: number | undefined = undefined;

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
    this.store.select(selectReviewById(this.reviewId)).subscribe(review => {
      console.log('Review:', review);
      if (review) {
        console.log(review, this.gameId)
        this.reviewForm.patchValue({
          rating: review.rating,
          comment: review.comment
        });
      }
    });
  }

  onSubmit() {
    if (this.reviewForm.valid && this.gameId !== undefined) {
      const updatedReview: UpdateReviewDTO = {
        id: this.reviewId,
        ...this.reviewForm.value,
      };
      this.store.dispatch(updateReview({ review: updatedReview }));
      this.router.navigate(['/game-detail', this.gameId]);
    }else{
      console.error('Form is invalid or gameId is undefined');
    }
  }
}
