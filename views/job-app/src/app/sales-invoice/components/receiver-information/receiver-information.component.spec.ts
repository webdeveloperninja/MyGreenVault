import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiverInformationComponent } from './receiver-information.component';

describe('ReceiverInformationComponent', () => {
  let component: ReceiverInformationComponent;
  let fixture: ComponentFixture<ReceiverInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiverInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiverInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
