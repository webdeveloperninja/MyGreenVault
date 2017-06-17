import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'camelCaseToRegular'})
export class CamelCaseToRegularPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let transormedValue: string = '';
    transormedValue = value.replace(/([A-Z])/g, ' $1')
      .replace(/^./, function(str){ return str.toUpperCase(); })
    return transormedValue;
  }
}