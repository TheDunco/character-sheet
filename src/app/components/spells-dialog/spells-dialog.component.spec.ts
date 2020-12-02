import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellsDialogComponent } from './spells-dialog.component';

describe('SpellsDialogComponent', () => {
  let component: SpellsDialogComponent;
  let fixture: ComponentFixture<SpellsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpellsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpellsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
