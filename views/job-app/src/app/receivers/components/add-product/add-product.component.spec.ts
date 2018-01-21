/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddtoolComponent } from './add-tool.component';

describe('toolComponent', () => {
    let component: AddtoolComponent;
    let fixture: ComponentFixture<AddtoolComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AddtoolComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddtoolComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
