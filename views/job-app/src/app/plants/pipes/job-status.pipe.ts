import { Pipe, PipeTransform } from '@angular/core';
/*
 * pure: false makes stateful filter
 * */
@Pipe({
    name: 'jobStatus',
    pure: false
})

export class JobStatusPipe implements PipeTransform {
    transform(status: number): string {
        if (status == 0) {
            return 'Staging'
        } else if (status == 1) {
            return 'Machining'
        } else if (status == 2) {
            return 'Quality'
        } else if (status == 3) {
            return 'Finished'
        } else if (status == 4) {
            return 'Shipped'
        } else if (status == 5) {
            return 'Removed'
        }
    }
}
