import { Review } from './reviews.model';  // Add the missing import

export interface ReviewsState {
  loading: boolean;
  error: string | null;
}
