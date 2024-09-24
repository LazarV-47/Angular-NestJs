import { Review } from "../reviews/reviews.model";

export interface Game {
    id: number;
    title: string;
    genre: string;
    description: string;
    picture?: File;
    reviews: Review[];
  }
  