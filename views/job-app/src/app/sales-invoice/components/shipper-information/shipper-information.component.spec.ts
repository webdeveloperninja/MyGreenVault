import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipperInformationComponent } from './shipper-information.component';

describe('ShipperInformationComponent', () => {
  let component: ShipperInformationComponent;
  let fixture: ComponentFixture<ShipperInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipperInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipperInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
