import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-publish',
  imports: [],
  templateUrl: './publish.component.html',
  styleUrl: './publish.component.scss',
})
export class PublishComponent {
  @Output() closeModalEvent = new EventEmitter();
  closeModal() {
    this.closeModalEvent.emit();
  }
  sendPost() {
    this.closeModal();
    /* ! ENVIAR A SERVICE */
  }
}
