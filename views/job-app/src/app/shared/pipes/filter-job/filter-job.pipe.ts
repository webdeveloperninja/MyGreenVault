import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterJob'
})
export class FilterJobPipe implements PipeTransform {

  transform(jobs: Array<any>, jobStatus: number): Array<any> {
    if (jobs) {
      return jobs.filter(item => item.jobStatus === jobStatus);
    }
    return
  }

}
