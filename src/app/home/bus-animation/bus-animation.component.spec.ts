import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusAnimationComponent } from './bus-animation.component';

describe('BusAnimationComponent', () => {
  let component: BusAnimationComponent;
  let fixture: ComponentFixture<BusAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusAnimationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
