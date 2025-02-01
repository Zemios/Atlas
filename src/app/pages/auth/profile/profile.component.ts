import { PostsService } from './../../../services/posts.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserInterface } from '../../../interfaces/user-interface';
import { UsersService } from '../../../services/users.service';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { Router, ActivatedRoute } from '@angular/router';
import { IMAGES_URL } from '../../../app.config';
import { PostInterface } from '../../../interfaces/post-interface';
import { RelativeTimePipe } from "../../../pipes/relative-time.pipe";
import { HtmlToTextPipe } from "../../../pipes/html-to-text.pipe";
import { HighlightCodePipe } from "../../../pipes/highlight-code.pipe";
import { NewlineToBrPipe } from "../../../pipes/newline-to-br.pipe";
import { SanitizeHtmlPipe } from "../../../pipes/sanitize-html.pipe";
import { LoadingComponent } from "../../../components/utils/loading/loading.component";

@Component({
  selector: 'app-profile',
  imports: [ProfileEditComponent, RelativeTimePipe, HtmlToTextPipe, HighlightCodePipe, NewlineToBrPipe, SanitizeHtmlPipe, LoadingComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user: UserInterface | null = null;
  posts: PostInterface[] = [];
  isEdit: boolean = false;
  profileEditModal = false;
  IMAGES_URL = IMAGES_URL;
  loading: boolean = false;
  userId: number | null = null;
  page: number = 1;
  limit: number = 10;
  lastScrollTop: number = 0;
  timeout: any;

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private postsService: PostsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.has('id') ? parseInt(params.get('id')!) : null;
      if (this.userId) {
        this.usersService.get(this.userId).subscribe({
          next: (user) => {
            this.user = user;
            this.loadUserPosts();
          },
          error: (error) => {
            console.error('Error al obtener el usuario:', error);
          },
        });
      } else {
        this.authService.subscribeToCurrentUser((user) => {
          this.isEdit = true;
          this.user = user;
          this.loadUserPosts();
        });
      }
    });
  }

  toggleProfileEditModal() {
    this.profileEditModal = !this.profileEditModal;
  }

  saveProfileEdit() {
    this.profileEditModal = false;
    if (this.user) {
      this.authService.getActualUser().subscribe({
        next: (user) => {
          if (!user) {
            console.error('User authenticated not found.');
            this.user = null;
            return;
          }
          this.user = user;
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }

  closeProfileEditModal() {
    this.profileEditModal = false;
  }

  openProfileEditModal() {
    if (this.user) {
      this.profileEditModal = true;
    } else {
      this.router.navigate(['/login']);
    }
  }
  loadUserPosts(): void {
    if (this.userId || this.user) {
      if (this.user) {
        this.userId = this.user.id
      }
      if (!this.userId) {
        console.error('User ID not found.');
        return;
      }
      this.loading = true;
      this.postsService.getUserPosts(this.userId, this.page, this.limit).subscribe({
        next: (posts) => {
          this.posts = [...this.posts, ...posts];
          this.loading = false;
          this.page++;
        },
        error: (error) => {
          console.error('Error al cargar las publicaciones:', error);
          this.loading = false;
        },
      });
    }
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
      this.loading = true;
      this.timeout = setTimeout(() => {
        this.loading = false;
        this.loadUserPosts();
      }, 200);
    }
  }
}
