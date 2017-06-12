import { Pipe, PipeTransform } from '@angular/core';
/*
 * pure: false makes stateful filter
 * */
@Pipe({
    name: 'filter',
    pure: false
})

export class FilterPipe implements PipeTransform {
    transform(jobs:any, status: any): any {
        if (status === undefined || jobs === undefined) return jobs;
        return jobs.filter(function(job:any){
            return job.process == status;
        });
    }
}
