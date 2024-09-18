import { Review } from "../reviews/reviews.model";

export interface Game {
    id: number;
    title: string;
    genre: string;
    description: string;
    picture?: File;
    status: 'played' | 'playing' | 'want to play';
    review?: Review;
  }
  