import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  styleUrls: [],
})
export class LoadingComponent {
  @Input() text: string | null = null;
}
