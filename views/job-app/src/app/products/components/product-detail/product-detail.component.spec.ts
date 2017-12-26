import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeedDetailComponent } from './weed-detail.component';

describe('WeedDetailComponent', () => {
  let component: WeedDetailComponent;
  let fixture: ComponentFixture<WeedDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeedDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeedDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
