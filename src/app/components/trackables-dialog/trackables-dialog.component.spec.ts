import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackablesDialogComponent } from './trackables-dialog.component';

describe('TrackablesDialogComponent', () => {
  let component: TrackablesDialogComponent;
  let fixture: ComponentFixture<TrackablesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackablesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackablesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
