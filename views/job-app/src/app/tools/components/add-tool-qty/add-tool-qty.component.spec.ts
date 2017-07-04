import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToolQtyComponent } from './add-tool-qty.component';

describe('AddToolQtyComponent', () => {
  let component: AddToolQtyComponent;
  let fixture: ComponentFixture<AddToolQtyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToolQtyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToolQtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
