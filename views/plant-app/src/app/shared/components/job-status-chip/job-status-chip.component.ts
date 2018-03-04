import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ti-job-status-chip',
  templateUrl: './job-status-chip.component.html',
  styleUrls: ['./job-status-chip.component.scss']
})
export class JobStatusChipComponent implements OnInit {
  chipClass: string;
  labelClass: string;

  private _jobStatus: number;
  get jobStatus(): number {
      return this._jobStatus;
  }

  @Input('jobStatus')
  set jobStatus(value: number) {
      this._jobStatus = value;
      this.updateChipClass()
  }

  updateChipClass() {
    switch (this.jobStatus) {
        case 0:
            this.chipClass = "primary";
            break;
        case 1:
            this.chipClass = "success";
            break;
        case 2:
            this.chipClass = "info";
            break;
        case 3:
            this.chipClass = "muted";
            break;
        case 4:
            this.chipClass = "primary";
            break;
        case 5:
            this.chipClass = "danger";
            break;
        default: 
            this.chipClass = "primary";
            break;
    }
    this.labelClass = `label-${this.chipClass}`;
  }

  constructor() { }

  ngOnInit() {
  }

}
