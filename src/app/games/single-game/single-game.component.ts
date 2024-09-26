import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Game } from '../../store/games/games.model';
import { MatCardModule }  from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../navbar/navbar.component";
import { environment } from '../../../environments/environments';
import { Store } from '@ngrx/store';
import { deleteGame as deleteGameAction } from '../../store/games/games.actions';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { selectAuthToken } from '../../auth/auth.selectors';
import { jwtDecode } from 'jwt-decode';
import { addLikedGame, loadLikedGames, unlikeGame } from '../../store/liked-game/liked-game.actions';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { selectAllLikedGames, selectLikedGamesLoading } from '../../store/liked-game/liked-game.selectors';
import { LikedGame } from '../../store/liked-game/liked-game.model';
  import { filter, take } from 'rxjs';
import { RouterLink } from '@angular/router';


  @Component({
    selector: 'app-single-game',
    standalone: true,
    imports: [
      CommonModule,
      FormsModule,
      MatCardModule,
      NavbarComponent,
      MatButtonModule,
      MatIconModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      RouterLink
  ],
    templateUrl: './single-game.component.html',
    styleUrl: './single-game.component.scss'
  })
  export class SingleGameComponent implements OnInit, OnChanges{
    @Input() game!: Game;
    role: string | null = '';
    averageRating: number | null = null;
    selectedStatus: string = 'want to play';
    isLiked: boolean = true;

    isLoading: boolean = true;
    
    backendUrl = environment.backendUrl;

    constructor(private store: Store) {
      this.store.select(selectAuthToken).subscribe(token => {
        if (token) {
          const decodedToken: any = jwtDecode(token);
          this.role = decodedToken.role;
        }
      });

      this.store.select(selectAllLikedGames)
      .subscribe((likedGames: LikedGame[]) => {
        if (this.game) {
          this.isLiked = likedGames.some(likedGame => likedGame.game.id === this.game.id);
        }
      });
    }

    ngOnInit(): void {
      this.updateAverageRating();
    }

    ngOnChanges(changes: SimpleChanges) {
      if (changes['game'] && this.game) {
        this.updateAverageRating();
      }
    }

    
    likeGame(event: MouseEvent): void {
      event.stopPropagation();
      this.store.dispatch(addLikedGame({ gameId: this.game.id, status: this.selectedStatus }));
    }

    unlikeGame(event: MouseEvent): void {
      event.stopPropagation();
      this.store.dispatch(unlikeGame({ gameId: this.game.id }));
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
      }
    }

    isAdmin(): boolean {
      return this.role === 'ADMIN';
    }

    updateAverageRating(): void {
      if (this.game && this.game.reviews && this.game.reviews.length > 0) {
        const total = this.game.reviews.reduce((sum, review) => sum + review.rating, 0);
        this.averageRating = total / this.game.reviews.length;
      } else {
        this.averageRating = null;
      }
    }
    
  }


