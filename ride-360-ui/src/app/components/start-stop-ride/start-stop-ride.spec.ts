import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartStopRide } from './start-stop-ride';

describe('StartStopRide', () => {
  let component: StartStopRide;
  let fixture: ComponentFixture<StartStopRide>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartStopRide]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartStopRide);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
