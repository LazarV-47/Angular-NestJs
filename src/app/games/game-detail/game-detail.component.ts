import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { EMPTY, filter, Observable, switchMap, take } from 'rxjs';
import { selectGameById } from '../../store/games/games.selectors';
import { selectAllLikedGames, selectIsGameLiked, selectLikedGamesLoading, selectLikedGameStatus } from '../../store/liked-game/liked-game.selectors';
import { loadReviews, addReview, updateReview, deleteReview } from '../../store/reviews/reviews.actions';
import { Review } from '../../store/reviews/reviews.model'; 
import { Game } from '../../store/games/games.model'; 
import { LikedGame } from '../../store/liked-game/liked-game.model'; 
import { User } from '../../auth/user.model';
import { selectAllReviews, selectReviewsByGameId, selectUserReviewByGameId } from '../../store/reviews/review.selectors';
import { addLikedGame, unlikeGame } from '../../store/liked-game/liked-game.actions';
import { CommonModule } from '@angular/common';
import { MatCardActions, MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatError } from '@angular/material/form-field';
import { NavbarComponent } from '../../navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { selectAuthToken, selectUserById } from '../../auth/auth.selectors';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environments';
import { ReviewSingleListComponent } from "../../review/review-single-list/review-single-list.component";
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatCardActions,
    MatListModule,
    MatProgressSpinner,
    MatError,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    NavbarComponent,
    MatIconModule,
    ReviewSingleListComponent
],
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent implements OnInit {
  game$: Observable<Game> = EMPTY;
  reviews$: Observable<Review[]> = EMPTY;
  isLiked: boolean = false;
  isLoading$: Observable<boolean> = EMPTY;
  likedGameStatus$: Observable<string> = EMPTY;
  loggedInUser!: User;
  gameId: number;
  averageRating: number | null = null;
  userReview: Review | null = null;
  selectedStatus: string = 'Want to Play';
  backendUrl = environment.backendUrl;

  constructor(
    private route: ActivatedRoute, 
    private store: Store, 
    private router: Router, 
    private cdr: ChangeDetectorRef
  ) {
    // Initializing the gameId from the route parameters
    this.gameId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    // Load game details
    this.loadGameDetails();

    // Load reviews for the game
    this.store.dispatch(loadReviews({ gameId: this.gameId }));
    this.reviews$ = this.store.select(selectReviewsByGameId(this.gameId));

    // Load user-related data
    this.loadUserDetails();

    // Calculate average rating whenever reviews change
    this.reviews$.subscribe(reviews => {
      const gameReviews = reviews.filter(review => review.game.id === this.gameId);
      this.calculateAverageRating(gameReviews);
    });
  }

  loadGameDetails(): void {
    this.game$ = this.store.select(selectGameById(this.gameId)).pipe(
      filter((game): game is Game => !!game)
    );
    this.likedGameStatus$ = this.store.select(selectLikedGameStatus(this.gameId));
  }

  loadUserDetails(): void {
    this.store.select(selectAuthToken).pipe(
      filter(token => !!token),
      switchMap(token => {
        const decodedToken: any = jwtDecode(token!);
        return this.store.select(selectUserById(decodedToken.sub));
      }),
      filter(user => !!user),
      switchMap(user => {
        this.loggedInUser = user;
        return this.store.select(selectUserReviewByGameId(this.gameId, user.id));
      })
    ).subscribe(review => {
      this.userReview = review;
      this.checkIfGameIsLiked();
    });
  }

  checkIfGameIsLiked(): void {
    if (this.gameId && this.loggedInUser) {
      this.store.select(selectAllLikedGames)
        .pipe(take(1))
        .subscribe((likedGames: LikedGame[]) => {
          this.isLiked = likedGames.some(likedGame => likedGame.game.id === this.gameId);
        });
    }
  }

  calculateAverageRating(reviews: Review[]): void {
    if (reviews && reviews.length > 0) {
      const total = reviews.reduce((sum, review) => sum + review.rating, 0);
      this.averageRating = total / reviews.length;
    } else {
      this.averageRating = null;
    }
  }

  toggleLikeGame(): void {
    if (!this.loggedInUser || !this.gameId) {
      console.error('Logged-in user or game is undefined');
      return;
    }

    if (this.isLiked) {
      this.store.dispatch(unlikeGame({ gameId: this.gameId }));
    } else {
      this.store.dispatch(addLikedGame({ gameId: this.gameId, status: this.selectedStatus }));
    }

    this.isLiked = !this.isLiked;
  }

  navigateToAddReview(gameId: number): void {
    this.router.navigate([`/add-review/${gameId}`]);
  }

  navigateToEditReview(reviewId: number): void {
    this.router.navigate([`/edit-review/${reviewId}`], { queryParams: { gameId: this.gameId } });
  }

  deleteReview(reviewId: number): void {
    this.store.dispatch(deleteReview({ reviewId }));
  }
}