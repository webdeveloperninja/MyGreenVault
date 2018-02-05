import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShipperContainerComponent } from './add-shipper-container.component';

describe('AddShipperContainerComponent', () => {
  let component: AddShipperContainerComponent;
  let fixture: ComponentFixture<AddShipperContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddShipperContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShipperContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
