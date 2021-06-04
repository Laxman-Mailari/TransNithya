import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestForBusComponent } from './request-for-bus.component';

describe('RequestForBusComponent', () => {
  let component: RequestForBusComponent;
  let fixture: ComponentFixture<RequestForBusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestForBusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestForBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
