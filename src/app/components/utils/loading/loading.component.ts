import { Component, Input } from "@angular/core";


@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {

  @Input() text: string | null = null;
}
