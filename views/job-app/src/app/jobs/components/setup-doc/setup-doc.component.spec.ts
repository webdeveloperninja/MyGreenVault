import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupDocComponent } from './setup-doc.component';

describe('SetupDocComponent', () => {
  let component: SetupDocComponent;
  let fixture: ComponentFixture<SetupDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
