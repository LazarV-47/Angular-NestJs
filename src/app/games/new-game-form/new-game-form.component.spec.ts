import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGameFormComponent } from './new-game-form.component';

describe('NewGameFormComponent', () => {
  let component: NewGameFormComponent;
  let fixture: ComponentFixture<NewGameFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewGameFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewGameFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
