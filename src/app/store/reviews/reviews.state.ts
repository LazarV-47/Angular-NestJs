import { EntityState } from "@ngrx/entity";
import { Review } from "./reviews.model";

export interface ReviewsState extends EntityState<Review> {
  loading: boolean;
  error: string | null;
}