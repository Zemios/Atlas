import { IMAGES_URL } from './../../app.config';
import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PublishComponent } from './publish/publish.component';
import { PostInterface } from '../../interfaces/post-interface';
import { PostsService } from '../../services/posts.service';
import { RelativeTimePipe } from '../../pipes/relative-time.pipe';
import { AuthService } from '../../services/auth.service';
import { NewlineToBrPipe } from '../../pipes/newline-to-br.pipe';
import { HighlightCodePipe } from '../../pipes/highlight-code.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { HtmlToTextPipe } from '../../pipes/html-to-text.pipe';
import { SanitizeHtmlPipe } from '../../pipes/sanitize-html.pipe';

@Component({
  selector: 'app-explore',
  imports: [RouterLink, PublishComponent, RelativeTimePipe, NewlineToBrPipe, HighlightCodePipe, HtmlToTextPipe, SanitizeHtmlPipe],
  providers: [],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss',
})
export class ExploreComponent implements OnInit, AfterViewInit {
  posts: PostInterface[] = [];
  IMAGES_URL = IMAGES_URL;
  page: number = 1;
  limit: number = 10;
  lastScrollTop: number = 0;
  loading: boolean = false;
  isAuthenticated: boolean = false;
  currentUserId: number | undefined;
  publishModal = false;
  timeout: any;
  isDeleteModalVisible: boolean = false;
  postToDeleteId: number | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private postsSvc: PostsService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.loadPosts();
    this.authService.checkAuth().subscribe({
      next: (res) => {
        this.isAuthenticated = res.isAuthenticated;
        this.authService.subscribeToCurrentUser((user) => {
          this.currentUserId = user?.id;
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
    window.addEventListener('scroll', this.onScroll.bind(this));
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

  loadPosts() {
    if (this.loading) return;

    this.loading = true;
    this.postsSvc.show(this.page, this.limit).subscribe({
      next: (newPosts) => {
        if (newPosts.length > 0) {
          this.posts = [...this.posts, ...newPosts];
          this.page++;
        }
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const nearBottom = scrollPosition + windowHeight >= documentHeight * 0.9;
    const scrollingDown = window.scrollY > this.lastScrollTop;
    this.lastScrollTop = window.scrollY;

    if (nearBottom && scrollingDown && !this.loading) {
      clearTimeout(this.timeout);
      this.loading = true
      this.timeout = setTimeout(() => {
        this.loading = false
        this.loadPosts();
      }, 200);
    }
  }

  onPostCreated() {
    this.page = 1;
    this.posts = [];
    this.loadPosts();
  }

  showDeleteModal(postId: number) {
    this.postToDeleteId = postId;
    this.isDeleteModalVisible = true;
  }

  closeDeleteModal() {
    this.isDeleteModalVisible = false;
    this.postToDeleteId = null;
  }

  deletePostConfirmed() {
    if (this.postToDeleteId !== null) {
      this.postsSvc.delete(this.postToDeleteId).subscribe(() => {
        this.posts = this.posts.filter((post) => post.id !== this.postToDeleteId);
        this.closeDeleteModal();
      });
    }
  }

  setFocus() {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      (textarea as HTMLTextAreaElement).focus();
    }
  }
}
