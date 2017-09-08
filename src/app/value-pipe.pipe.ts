import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valuePipe'
})
export class ValuePipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
