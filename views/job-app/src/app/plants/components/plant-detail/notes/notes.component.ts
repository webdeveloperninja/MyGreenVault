import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NoteService } from '../../../services/note';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {  } from 'app/shared/components/alert/alert.component';

const MODAL_SIZE = 'lg';

@Component({
    selector: 'plant-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
    hasNotes: boolean = false;
    alert = alert;
    noteFormGroup: FormGroup;
    private _addNoteModalRef: NgbModalRef;

    private _plantNumber: string;
    
    get plantNumber(): string {
        return this._plantNumber;
    }

    @Input('plantNumber') 
    set plantNumber(value: string) {
        if (value) {
            this._plantNumber = value;
            this._noteService.updatePlantNumber(value);
            this._noteService.get();
        }
    }

    @ViewChild('addNoteRef') addNoteRef: ElementRef;

    notes$: Observable<Array<any>> = this._noteService.notes$.do(notes => {
        if (notes && notes.length > 0) {
            this.hasNotes = true;
        } else {
            this.hasNotes = false;
        }
    });

    formErrors = {
        'todo': ''
    };

    constructor(
        private _noteService: NoteService,
        private _modalService: NgbModal,
        private _formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.noteFormGroup = this._formBuilder.group({
            name: ['', Validators.required]
        });
    }

    openAddNoteModal() {
        this._addNoteModalRef = this._modalService.open(this.addNoteRef, { size: MODAL_SIZE });
    }

    addNote() {
        let noteObj = {
            name: this.noteFormGroup.controls['name'].value
        };

        this._noteService.add(noteObj).first().subscribe((expense) => {
            this._noteService.get();
        });
    }

    removeNote(note) {
        this._noteService.remove(note);
    }

    getConfirmationMessage(name: string) {
        return `Are you sure you want to remove ${name}?`
    }
}
