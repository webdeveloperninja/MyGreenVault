import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutToolComponent } from './checkout-tool.component';

describe('CheckoutToolComponent', () => {
  let component: CheckoutToolComponent;
  let fixture: ComponentFixture<CheckoutToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
