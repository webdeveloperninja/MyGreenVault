import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavLinkComponent } from './side-nav-link.component';

describe('SideNavLinkComponent', () => {
  let component: SideNavLinkComponent;
  let fixture: ComponentFixture<SideNavLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideNavLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
