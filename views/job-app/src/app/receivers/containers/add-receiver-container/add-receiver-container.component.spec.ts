import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReceiverContainerComponent } from './add-receiver-container.component';

describe('AddReceiverContainerComponent', () => {
  let component: AddReceiverContainerComponent;
  let fixture: ComponentFixture<AddReceiverContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReceiverContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReceiverContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
