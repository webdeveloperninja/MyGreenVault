import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductShippedDetailsComponent } from './product-shipped-details.component';

describe('ProductShippedDetailsComponent', () => {
  let component: ProductShippedDetailsComponent;
  let fixture: ComponentFixture<ProductShippedDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductShippedDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductShippedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
