import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QtyWeightValueComponent } from './qty-weight-value.component';

describe('QtyWeightValueComponent', () => {
  let component: QtyWeightValueComponent;
  let fixture: ComponentFixture<QtyWeightValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QtyWeightValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QtyWeightValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
