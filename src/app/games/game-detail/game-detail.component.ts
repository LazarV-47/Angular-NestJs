import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../../store/games/games.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { selectGameById } from '../../store/games/games.selectors';
import { NavbarComponent } from "../../navbar/navbar.component";
import { MatButtonModule } from '@angular/material/button';
import { addReview, deleteReview as deleteReviewAction, editReview, loadReview } from '../../store/reviews/reviews.actions';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { environment } from '../../../environments/environments';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    NavbarComponent,
    MatButtonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule
],
  templateUrl: './game-detail.component.html',
  styleUrl: './game-detail.component.scss'
})
export class GameDetailComponent {
  game: Game | undefined;
  showReviewForm = false; // Track if the review form should be shown
  reviewForm: FormGroup;
  backendUrl = environment.backendUrl;

  constructor(private route: ActivatedRoute, private store: Store, private fb: FormBuilder, private router: Router) {
    this.reviewForm = this.fb.group({
      rating: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      comment: ['', Validators.required]
    });

    
    const gameId = +this.route.snapshot.paramMap.get('id')!;


    if(gameId){
      this.store.select(selectGameById(gameId)).subscribe((game) => {
        if (game) {
          this.game = game;
          if(game.review){
            this.store.dispatch(loadReview({ gameId: gameId }));
          }
        }
      });
    }
  }

// Modify the methods
onAddReview(): void {
  if (this.game) {
      this.router.navigate(['/add-review', this.game.id]);
  }
}

editReview(): void {
  if (this.game && this.game.review) {
      this.router.navigate(['/edit-review', this.game.review.id], { queryParams: { gameId: this.game.id } });
  }
}

deleteReview(): void {
  if (this.game && this.game.review) {
      this.store.dispatch(deleteReviewAction({ id: this.game.review.id }));
  }
}

}
