import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sanitizeHtml'
})
export class SanitizeHtmlPipe implements PipeTransform {

  private dangerousClasses = ['absolute', 'relative', 'fixed', 'sticky', 'z-', 'top-', 'left-', 'right-', 'bottom-'];

  transform(htmlContent: string): string {
    const div = document.createElement('div');
    div.innerHTML = htmlContent;

    const elementsWithClasses = div.querySelectorAll('[class]');

    elementsWithClasses.forEach(element => {
      const classList = element.getAttribute('class');

      if (classList) {
        const safeClasses = classList
          .split(' ')
          .filter(className => !this.isDangerousClass(className))
          .join(' ');

        element.setAttribute('class', safeClasses);
      }
    });

    return div.innerHTML;
  }

  private isDangerousClass(className: string): boolean {
    return this.dangerousClasses.some(dangerous => className.startsWith(dangerous));
  }
}
