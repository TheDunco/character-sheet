import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackablesComponent } from './trackables.component';

describe('TrackablesComponent', () => {
  let component: TrackablesComponent;
  let fixture: ComponentFixture<TrackablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
