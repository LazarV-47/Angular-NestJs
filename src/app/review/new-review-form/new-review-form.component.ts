import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addReview } from '../../store/reviews/reviews.actions';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../navbar/navbar.component";
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-new-review-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NavbarComponent,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
],
  templateUrl: './new-review-form.component.html',
  styleUrl: './new-review-form.component.scss'
})
export class NewReviewFormComponent {
  reviewForm: FormGroup;
  gameId: number;

  constructor(private fb: FormBuilder, private store: Store, private route: ActivatedRoute, private router: Router) {
    this.reviewForm = this.fb.group({
      rating: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      comment: ['', Validators.required]
    });
    
    this.gameId = +this.route.snapshot.paramMap.get('gameId')!;
  }

   onSubmit() {
    if (this.reviewForm.valid) {
      const review = {
        gameId: this.gameId,
        ...this.reviewForm.value
      };
      this.store.dispatch(addReview({ review }));
      this.router.navigate(['/game-detail', this.gameId]);
    }
  }
}
