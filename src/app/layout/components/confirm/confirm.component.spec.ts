import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ConfirmComponent} from './confirm.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';

describe('ConfirmComponent', () => {

    let fixture: ComponentFixture<ConfirmComponent>;
    let component: ConfirmComponent;
    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            providers: [],
            declarations: [ConfirmComponent]
        });

        fixture = TestBed.createComponent(ConfirmComponent);
        component = fixture.componentInstance;

    });

    xit('should be able to create component instance', () => {
        expect(component).toBeDefined();
    });

});
