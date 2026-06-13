import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleRide } from './toggle-ride';

describe('ToggleRide', () => {
  let component: ToggleRide;
  let fixture: ComponentFixture<ToggleRide>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleRide]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleRide);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
