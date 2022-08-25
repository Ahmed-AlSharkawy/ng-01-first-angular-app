import { Pipe, PipeTransform } from '@angular/core';
import { Server } from './server';

@Pipe({
  name: 'filter',
  // pure: false
})
export class FilterPipe implements PipeTransform {
  transform(value: Server[], filterValue: string, filterProp: string): any {
    if (value == undefined || value.length == 0 || filterValue == '' || filterValue == null || filterProp == '' || filterProp == null)
      return value;

    return value.filter(item => item[filterProp] == filterValue);
  }
}
