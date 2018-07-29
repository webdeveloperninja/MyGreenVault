import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWeekComponent } from './update-week.component';

describe('UpdateWeekComponent', () => {
  let component: UpdateWeekComponent;
  let fixture: ComponentFixture<UpdateWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
