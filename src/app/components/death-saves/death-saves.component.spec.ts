import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathSavesComponent } from './death-saves.component';

describe('DeathSavesComponent', () => {
  let component: DeathSavesComponent;
  let fixture: ComponentFixture<DeathSavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeathSavesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeathSavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
