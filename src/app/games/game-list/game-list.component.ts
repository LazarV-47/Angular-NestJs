import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadGames } from '../../store/games/games.actions';
import { selectAllGames, selectGamesError, selectGamesLoading } from '../../store/games/games.selectors';
import { SingleGameComponent } from '../single-game/single-game.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatError } from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { Game } from '../../store/games/games.model';
import { NavbarComponent } from "../../navbar/navbar.component";
import { environment } from '../../../environments/environments';
import { Review } from '../../store/reviews/reviews.model';
import { selectAllReviews } from '../../store/reviews/review.selectors';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [
    CommonModule,
    SingleGameComponent,
    MatCardModule,
    MatListModule,
    MatProgressSpinner,
    MatError,
    RouterModule,
    NavbarComponent
],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.scss'
})
export class GameListComponent {
  games$: Observable<Game[]>;
  review$: Observable<Review[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  backendUrl = environment.backendUrl;

  constructor(private store: Store) {
    this.games$ = this.store.select(selectAllGames);
    this.review$ = this.store.select(selectAllReviews);
    this.loading$ = this.store.select(selectGamesLoading);
    this.error$ = this.store.select(selectGamesError);
    
    this.store.dispatch(loadGames());

  }
}
