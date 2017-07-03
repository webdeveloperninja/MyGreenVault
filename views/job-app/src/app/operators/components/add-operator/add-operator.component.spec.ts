/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddOperatorComponent } from './add-operator.component';

describe('operatorComponent', () => {
    let component: AddOperatorComponent;
    let fixture: ComponentFixture<AddOperatorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AddOperatorComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddOperatorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
