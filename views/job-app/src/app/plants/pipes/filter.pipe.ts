import { Pipe, PipeTransform } from '@angular/core';
/*
 * pure: false makes stateful filter
 * */
@Pipe({
    name: 'filter',
    pure: false
})

export class FilterPipe implements PipeTransform {
    transform(plants:any, status: any): any {
        if (status === undefined || plants === undefined || plants === null) return plants;
        return plants.filter((plant:any) => {
            return plant.plantStatus == status;
        });
    }
}
