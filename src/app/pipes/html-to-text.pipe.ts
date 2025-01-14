import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'htmlToText'
})
export class HtmlToTextPipe implements PipeTransform {
    transform(value: string): string {
        const doc = new DOMParser().parseFromString(value, 'text/html');
        return doc.body.textContent || "";
    }
}
