import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  Review } from '../store/reviews/reviews.model';
import { environment } from '../../environments/environments';
import { ReviewDTO } from '../dto/review.dto';
import { UpdateReviewDTO } from '../dto/update-review.dto';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = `${environment.backendUrl}/review`; // Assuming you have an environment file with the API URL

  constructor(private http: HttpClient) {}

  getReviewsByGameId(gameId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/game/${gameId}`);
  }

  addReview(review: ReviewDTO): Observable<Review> {
    return this.http.post<Review>(`${this.apiUrl}/createReview/${review.gameId}`, {
      rating: review.rating,
      comment: review.comment,
    });
  }

  updateReview(review: UpdateReviewDTO): Observable<Review> {
    return this.http.patch<Review>(`${this.apiUrl}/updateReview/${review.id}`, {
      rating: review.rating,
      comment: review.comment,
    });
  }

  deleteReview(reviewId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteReview/${reviewId}`);
  }

  getAllReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}`);
  }
}
