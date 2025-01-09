import { AfterViewInit, Component, HostListener, inject, OnInit } from '@angular/core';
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
export class ExploreComponent implements OnInit, AfterViewInit {
  constructor(private router: Router, private authService: AuthService) { }
  private readonly postsSvc = inject(PostsService);
  posts: Observable<PostInterface[]> = this.postsSvc.show();
  isAuthenticated: boolean = false;
  currentUserId: number = 0;
  publishModal = false;
  ngOnInit() {
    this.authService.checkAuth().subscribe({
      next: (res) => {
        this.isAuthenticated = res.isAuthenticated
        this.authService.getActualUser().subscribe({
          next: (res) => {
            this.currentUserId = res.id
          },
          error: (err) => {
            console.error(err)
          }
        })
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngAfterViewInit() {
    if (this.publishModal) {
      this.setFocus();
    }
  }

  togglePublishModal() {
    if (this.isAuthenticated) {
      this.publishModal = !this.publishModal;
      if (this.publishModal) {
        setTimeout(() => {
          this.setFocus();
        }, 0);
      }
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

  setFocus() {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      (textarea as HTMLTextAreaElement).focus();
    }
  }
}
