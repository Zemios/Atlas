import { Component, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PublishComponent } from './publish/publish.component';
import { PostInterface } from '../../interfaces/post-interface';
import { PostsService } from '../../services/posts.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RelativeTimePipe } from '../../pipes/relative-time.pipe';

@Component({
  selector: 'app-explore',
  imports: [RouterLink, PublishComponent, AsyncPipe, RelativeTimePipe],
  providers: [],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss',
})
export class ExploreComponent {
  private readonly postsSvc = inject(PostsService);
  publishModal = false;
  togglePublishModal() {
    this.publishModal = !this.publishModal;
  }
  closePublishModal() {
    this.publishModal = false;
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('[modal-content]')) {
      this.closePublishModal();
    }
  }

  posts: Observable<PostInterface[]> = this.postsSvc.show();
}
