import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  Review } from '../store/reviews/reviews.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = 'http://localhost:3000/review';
  constructor(private http: HttpClient) {}

  getReviewByGameId(gameId: number): Observable<Review> {
    return this.http.get<Review>(`${this.apiUrl}/game/${gameId}`);
  }

  getReview(reviewId: number): Observable<Review> {
    return this.http.get<Review>(`${this.apiUrl}/findReview/${reviewId}`);
  }

  addReview(review: Partial<Review>): Observable<Review> {
    // console.log('addReview called with:', review); // Debugging

    const reviewDto = {
      gameId: review.gameId,
      rating: review.rating,
      comment: review.comment
    };
    return this.http.post<Review>(`${this.apiUrl}/createReview`, reviewDto);
  }

  updateReview(review: Partial<Review>) {
    const reviewDto = {
      id: review.id,
      rating: review.rating,
      comment: review.comment
    };
    return this.http.patch<Review>(`${this.apiUrl}/updateReview/${review.id}`, reviewDto);
  }

  deleteReview(id: number) {
    return this.http.delete(`${this.apiUrl}/deleteReview/${id}`);
  }
}
