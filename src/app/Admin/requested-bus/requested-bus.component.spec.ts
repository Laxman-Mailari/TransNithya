import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedBusComponent } from './requested-bus.component';

describe('RequestedBusComponent', () => {
  let component: RequestedBusComponent;
  let fixture: ComponentFixture<RequestedBusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestedBusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestedBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
