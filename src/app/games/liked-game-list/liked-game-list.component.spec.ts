import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedGameListComponent } from './liked-game-list.component';

describe('LikedGameListComponent', () => {
  let component: LikedGameListComponent;
  let fixture: ComponentFixture<LikedGameListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikedGameListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikedGameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
