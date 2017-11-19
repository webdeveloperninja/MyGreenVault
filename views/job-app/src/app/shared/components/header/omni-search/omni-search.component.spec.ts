import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OmniSearchComponent } from './omni-search.component';

describe('OmniSearchComponent', () => {
  let component: OmniSearchComponent;
  let fixture: ComponentFixture<OmniSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OmniSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OmniSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
