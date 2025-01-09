import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PublishComponent } from './publish/publish.component';
import { PostInterface } from '../../interfaces/post-interface';
import { PostsService } from '../../services/posts.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RelativeTimePipe } from '../../pipes/relative-time.pipe';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-explore',
  imports: [RouterLink, PublishComponent, AsyncPipe, RelativeTimePipe],
  providers: [],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss',
})
export class ExploreComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) { }
  ngOnInit() {
    this.authService.checkAuth().subscribe({
      next: (res) => {
        this.isAuthenticated = res.isAuthenticated
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  isAuthenticated: boolean = false;
  private readonly postsSvc = inject(PostsService);
  publishModal = false;
  togglePublishModal() {
    if (this.isAuthenticated) {
      this.publishModal = !this.publishModal;
    } else {
      this.router.navigate(['/login']);
    }
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

  deletePost(postId: number) {
    this.postsSvc.delete(postId).subscribe(() => {
      this.posts = this.postsSvc.show();
    });
  }

  posts: Observable<PostInterface[]> = this.postsSvc.show();
}
