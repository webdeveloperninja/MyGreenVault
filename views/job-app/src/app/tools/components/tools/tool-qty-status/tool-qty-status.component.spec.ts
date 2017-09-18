import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolQtyStatusComponent } from './tool-qty-status.component';

describe('ToolQtyStatusComponent', () => {
  let component: ToolQtyStatusComponent;
  let fixture: ComponentFixture<ToolQtyStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolQtyStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolQtyStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
