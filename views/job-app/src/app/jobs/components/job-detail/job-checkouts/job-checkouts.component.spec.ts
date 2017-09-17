import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCheckoutsComponent } from './job-checkouts.component';

describe('JobCheckoutsComponent', () => {
  let component: JobCheckoutsComponent;
  let fixture: ComponentFixture<JobCheckoutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobCheckoutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCheckoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
