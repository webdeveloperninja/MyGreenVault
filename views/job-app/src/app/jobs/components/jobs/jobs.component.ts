import { Component, OnInit } from '@angular/core';
import { JobsService, IPagedList, IJob } from '../../services/jobs';
import { SettingsService } from '../../services/settings';
import { SidebarService } from '../../services/sidebar';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  public defaultTake: number = 8;
  loading: boolean = true;
  private _more: boolean;
  get more(): boolean {
    return this._more;
  }
  set more(val: boolean) {
    this._more = val;
  }

  private _jobs: IJob[];
  get jobs() {
    return this._jobs;
  }
  set jobs(val: IJob[]) {
    this._jobs = val;
  }

  private _skip: number = 0;
  set skip(val: number) {
    this._skip = val;
  }
  get skip(): number {
    return this._skip;
  }

  private _take: number = this.defaultTake;
  set take(val: number) {
    this._take = val;
  }
  get take(): number {
    return this._take;
  }

  constructor(
      private _jobsService: JobsService
  ) { }

  ngOnInit() {
    this.loading = true;
    this._jobsService.getJobs(this.skip, this.take).subscribe(val => {
      this.loading = false;
      this.jobs = val.data;
      this.skip = val.skip;
      this.take = val.take;
      this.more = val.more;
    })
  }

  nextPage() {
    this.skip = this.skip + this.take;
    this.loading = true;
    this._jobsService.getJobs(this.skip, this.take).subscribe(data => {
      this.loading = false;
      this.jobs = data.data;
      this.more = data.more;
    })
  }

  previousPage() {
    this.loading = true;
    if (this.skip >= this.take) {
      this.skip = this.skip - this.take; 
      this._jobsService.getJobs(this.skip, this.take).subscribe(data => {
        this.loading = false;
        this.jobs = data.data;
        this.more = data.more;
      })
    } 
  }
}
