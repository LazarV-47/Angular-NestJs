import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleLikedGameComponent } from './single-liked-game.component';

describe('SingleLikedGameComponent', () => {
  let component: SingleLikedGameComponent;
  let fixture: ComponentFixture<SingleLikedGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleLikedGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleLikedGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
