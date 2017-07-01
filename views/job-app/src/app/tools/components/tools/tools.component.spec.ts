/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { toolsComponent } from './tools.component';

describe('toolsComponent', () => {
  let component: toolsComponent;
  let fixture: ComponentFixture<toolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ toolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(toolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
