import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobStatusChipComponent } from './job-status-chip.component';

describe('JobStatusChipComponent', () => {
  let component: JobStatusChipComponent;
  let fixture: ComponentFixture<JobStatusChipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobStatusChipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobStatusChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
