import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceContainerComponent } from './preference-container.component';

describe('PreferenceContainerComponent', () => {
  let component: PreferenceContainerComponent;
  let fixture: ComponentFixture<PreferenceContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferenceContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenceContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
