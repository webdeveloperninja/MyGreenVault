import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorInformationComponent } from './distributor-information.component';

describe('DistributorInformationComponent', () => {
  let component: DistributorInformationComponent;
  let fixture: ComponentFixture<DistributorInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributorInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
