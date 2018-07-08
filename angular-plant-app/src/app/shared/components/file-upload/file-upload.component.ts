import { Component, EventEmitter, OnInit, Output, ViewChild, TemplateRef } from '@angular/core';

import { FileData } from '../../models/file-data';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  cropModalRefrence: any;
  initialFileUpload: File = null;
  @ViewChild('cropModal', { read: TemplateRef })
  cropModal: TemplateRef<any>;

  @Output() fileChange = new EventEmitter<FileData>();
  file: FileData;
  filedata;

  constructor(private readonly _modalService: NgbModal) {}

  ngOnInit() {}
  initialFileUploadEvent(file) {
    this.initialFileUpload = file;

    this.cropModalRefrence = this._modalService.open(this.cropModal);
  }

  imageCropped(image: string) {
    const imageParts = image.split(',');

    this.croppedImage = image;
  }
  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }

  saveImage() {
    const file: FileData = {
      filename: '',
      filetype: 'image/jpg',
      value: this.croppedImage
    };

    this.fileChange.next(file);
    this.cropModalRefrence.close();
  }
}
