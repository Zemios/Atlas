import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow, format, differenceInMinutes, differenceInHours, differenceInDays } from 'date-fns';
import { es } from 'date-fns/locale';

@Pipe({
  standalone: true,
  name: 'relativeTime',
})
export class RelativeTimePipe implements PipeTransform {
  transform(value: string | Date): string {
    const date = new Date(value);
    const now = new Date();

    const diffMinutes = Math.floor(differenceInMinutes(now, date));
    const diffHours = Math.floor(differenceInHours(now, date));
    const diffDays = Math.floor(differenceInDays(now, date));

    if (diffDays > 30) {
      return format(date, 'dd/MM/yy', { locale: es });
    }

    let result: string;

    if (diffMinutes === 0) {
      result = 'Ahora mismo';
    } else if (diffMinutes < 60) {
      result = `hace ${diffMinutes === 1 ? 'un minuto' : `${diffMinutes} minutos`}`;
    } else if (diffHours < 24) {
      result = `hace ${diffHours === 1 ? 'una hora' : `${diffHours} horas`}`;
    } else {
      result = formatDistanceToNow(date, { addSuffix: true, locale: es });
    }

    return this.capitalizeFirstLetter(result);
  }

  private capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
