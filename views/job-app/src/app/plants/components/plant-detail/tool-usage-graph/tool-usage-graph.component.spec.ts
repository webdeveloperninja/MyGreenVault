import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolUsageGraphComponent } from './tool-usage-graph.component';

describe('ToolUsageGraphComponent', () => {
  let component: ToolUsageGraphComponent;
  let fixture: ComponentFixture<ToolUsageGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolUsageGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolUsageGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
