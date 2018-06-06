import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

@Pipe({
  name: 'elapsedDate'
})
export class ElapsedDatePipe implements PipeTransform {

  transform (value: any, args?: any): any {
    const diff = moment().diff(moment(value));
    const hours = Math.round(diff / (1000 * 60 * 60));
    if (hours < 1) {
      return Math.round(diff / (1000 * 60)) + '分前';
    }
    if (hours < 24) {
      return hours + '時間前';
    }
    return Math.round(diff / (1000 * 60 * 60 * 24)) + '日前';
  }

}
