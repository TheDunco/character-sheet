import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatDialogComponent } from './feat-dialog.component';

describe('FeatDialogComponent', () => {
  let component: FeatDialogComponent;
  let fixture: ComponentFixture<FeatDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
