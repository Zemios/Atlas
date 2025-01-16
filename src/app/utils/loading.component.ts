import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  imports: [],
  template: `
    <div class="flex items-center justify-center h-full">
      <img src="loading.svg" class="w-8 h-8 fill-blue-600">
    </div>
  `,
  styles: ''
})
export class LoadingComponent {

}
