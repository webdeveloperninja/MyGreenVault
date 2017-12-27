import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { PlantsService, Job } from '../../services/plants';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable, Subscription, Subject } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'update-plant',
    templateUrl: './update-plant.component.html',
    styleUrls: ['./update-plant.component.scss']
})
export class UpdatePlantComponent {

    activePlantFormGroup: FormGroup;

    @Output('closeUpdateModal')
    closeUpdateModal: EventEmitter<boolean> = new EventEmitter<boolean>();

    private _activePlant: any;
    get activePlant(): any {
        return this._activePlant;
    }
    @Input('activePlant')
    set activePlant(activePlant: any) {
        this._activePlant = activePlant;
        this.activePlantFormGroup = this.createGroup();
    }

    constructor(
        private _fb: FormBuilder,
        private _jobsService: PlantsService,
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

    createGroup() {
        const group = this._fb.group({});

        for (var prop in this.activePlant) {
            group.addControl(prop, this._fb.control(this.activePlant[prop]));
        }

        return group;
    }

    updateJob(activeJob) {
        this._jobsService.updateJob(activeJob.value).first().subscribe(data => {
            this._jobsService.doSearch();
            this.closeModal();
        });
    }

    closeModal() {
        this.closeUpdateModal.emit(true);
    }
}
