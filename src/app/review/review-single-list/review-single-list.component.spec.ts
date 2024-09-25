import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSingleListComponent } from './review-single-list.component';

describe('ReviewSingleListComponent', () => {
  let component: ReviewSingleListComponent;
  let fixture: ComponentFixture<ReviewSingleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewSingleListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewSingleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
