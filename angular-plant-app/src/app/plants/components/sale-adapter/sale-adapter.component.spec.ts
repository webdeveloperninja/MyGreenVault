import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleAdapterComponent } from './sale-adapter.component';

describe('SaleAdapterComponent', () => {
  let component: SaleAdapterComponent;
  let fixture: ComponentFixture<SaleAdapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleAdapterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleAdapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
