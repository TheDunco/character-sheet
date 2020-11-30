import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HitDiceComponent } from './hit-dice.component';

describe('HitDiceComponent', () => {
  let component: HitDiceComponent;
  let fixture: ComponentFixture<HitDiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HitDiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HitDiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
