import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { FileData } from '../../models/file-data';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  fileToUpload: File = null;

  @Output() fileChange = new EventEmitter<FileData>();
  file: FileData;
  filedata;

  constructor() {}

  ngOnInit() {}
  handleFileInput(files: FileList) {
    this.fileToUpload = files[0];

    let reader = new FileReader();

    reader.readAsDataURL(this.fileToUpload);

    reader.onload = () => {
      const file: FileData = {
        filename: files[0].name,
        filetype: files[0].type,
        value: reader.result
      };
      this.filedata = reader.result;
      this.file = file;

      console.log(file);

      this.fileChange.next(file);
    };
  }
}
