import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RzrpaymentComponent } from './rzrpayment.component';

describe('RzrpaymentComponent', () => {
  let component: RzrpaymentComponent;
  let fixture: ComponentFixture<RzrpaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RzrpaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RzrpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
