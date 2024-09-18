// review-temp.service.ts
import { Injectable } from '@angular/core';
import { Review } from '../store/reviews/reviews.model';


@Injectable({
  providedIn: 'root'
})
export class ReviewTempService {
  private reviewData: Review | null = null;

  setReviewData(review: Review) {
    this.reviewData = review;
  }

  getReviewData(): Review | null {
    return this.reviewData;
  }

  clearReviewData() {
    this.reviewData = null;
  }
}
