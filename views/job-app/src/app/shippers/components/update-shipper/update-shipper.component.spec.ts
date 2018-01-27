import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReceiverComponent } from './update-receiver.component';

describe('UpdateReceiverComponent', () => {
  let component: UpdateReceiverComponent;
  let fixture: ComponentFixture<UpdateReceiverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateReceiverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateReceiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
