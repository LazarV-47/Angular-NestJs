import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { Game } from '../../store/games/games.model';
import { Store } from '@ngrx/store';
import { loadLikedGames, unlikeGame } from '../../store/liked-game/liked-game.actions';
import { environment } from '../../../environments/environments';
import { selectAuthToken } from '../../auth/auth.selectors';
import { jwtDecode } from 'jwt-decode';
import { deleteGame as deleteGameAction } from '../../store/games/games.actions';
import { selectReviewsByGameId } from '../../store/reviews/review.selectors';
import { map, Observable } from 'rxjs';
import { Review } from '../../store/reviews/reviews.model';
import { loadAllReviews } from '../../store/reviews/reviews.actions';

@Component({
  selector: 'app-single-liked-game',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    RouterLink
  ],
  templateUrl: './single-liked-game.component.html',
  styleUrl: './single-liked-game.component.scss'
})
export class SingleLikedGameComponent implements OnInit, OnChanges{
  @Input() game!: Game;
  isLiked: boolean = true;
  averageRating: number | null = null;
  backendUrl = environment.backendUrl;
  role: string | null = '';

  reviews$: Observable<Review[]> | null = null; 

  constructor(private store: Store) {
    this.store.select(selectAuthToken).subscribe(token => {
      if (token) {
        const decodedToken: any = jwtDecode(token);
        this.role = decodedToken.role;
      }
    });

    this.store.dispatch(loadAllReviews());

  }

  unlikeGame(event: MouseEvent): void {
    event.stopPropagation();
    this.store.dispatch(unlikeGame({ gameId: this.game.id }));
  }

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    this.reviews$ = this.store.select(selectReviewsByGameId(this.game.id));
    this.reviews$.subscribe(reviews => {
      if (reviews && reviews.length > 0) {
        const total = reviews.reduce((sum, review) => sum + review.rating, 0);
        this.averageRating = total / reviews.length;
      } else {
        this.averageRating = null;
      }
    });
  }


  ngOnChanges(changes: SimpleChanges) {
    this.loadReviews();
  }

  isAdmin(): boolean {
    return this.role === 'ADMIN';
  }

  editGame(event: MouseEvent): void {
    event.stopPropagation();
    if (this.isAdmin()) {
      console.log(`Navigate to edit game with ID: ${this.game.id}`);
    }
  }

  deleteGame(event: MouseEvent): void {
    event.stopPropagation();
    if(this.isAdmin()) {
      this.store.dispatch(deleteGameAction({ gameId: this.game.id }));
      //this.store.dispatch(loadLikedGames());
    }
  }
}
