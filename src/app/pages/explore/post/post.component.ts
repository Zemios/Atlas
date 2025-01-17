import { IMAGES_URL } from './../../../app.config';
import { Observable } from 'rxjs';
import { Component, HostListener, inject } from '@angular/core';
import { PostInterface } from '../../../interfaces/post-interface';
import { PostsService } from '../../../services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { NewlineToBrPipe } from '../../../pipes/newline-to-br.pipe';
import { HighlightCodePipe } from '../../../pipes/highlight-code.pipe';
import { HtmlToTextPipe } from '../../../pipes/html-to-text.pipe';
import { RelativeTimePipe } from "../../../pipes/relative-time.pipe";
import { CommentInterface } from '../../../interfaces/comment-interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post',
  imports: [AsyncPipe, NewlineToBrPipe, HighlightCodePipe, HtmlToTextPipe, RelativeTimePipe, ReactiveFormsModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  private readonly postsSvc = inject(PostsService);
  comments: CommentInterface[] = [];
  commentForm: FormGroup;
  pageComment: number = 1;
  limitComment: number = 5;
  loadingComments: boolean = false;
  lastScrollTopComment: number = 0;
  timeout: any;
  commentModal = false;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private activatedRoute: ActivatedRoute) {
    this.loadComments()
    window.addEventListener('scroll', this.onScrollComment.bind(this)); // Detecta el scroll
    this.commentForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  submitComment() {
    this.submitted = true;

    if (this.commentForm.valid) {
      const comment = this.commentForm.value;
      comment.post_id = parseInt(this.activatedRoute.snapshot.params['id']);
      this.postsSvc.createComment(comment).subscribe({
        next: () => {
          this.showSnackbar('Comentario creado con éxito', 'success');
          this.commentForm.reset();
          this.submitted = false;
          this.pageComment = 1;
          this.comments = [];
          this.loadComments();
        },
        error: (error) => {
          console.log(error);
          this.showSnackbar('Error al crear el comentario', 'error');
        },
      });
    }
  }



  loadComments() {
    if (this.id && this.pageComment && this.limitComment) {
      if (this.loadingComments) return;

      this.loadingComments = true;
      this.postsSvc.getComments(parseInt(this.id), this.pageComment, this.limitComment).subscribe({
        next: (newComments) => {
          console.log(newComments)
          if (newComments.length > 0) {
            this.comments = [...this.comments, ...newComments];
            this.pageComment++;
          }
          this.loadingComments = false;
        },
        error: (error) => {
          console.error('Error al cargar los comentarios', error);
          this.loadingComments = false;
        }
      });
    }
  }

  @HostListener('window:scroll', [])
  onScrollComment(): void {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const nearBottom = scrollPosition + windowHeight >= documentHeight * 0.9;
    const scrollingDown = window.scrollY > this.lastScrollTopComment;
    this.lastScrollTopComment = window.scrollY;

    if (nearBottom && scrollingDown && !this.loadingComments) {
      clearTimeout(this.timeout);
      this.loadingComments = true
      this.timeout = setTimeout(() => {
        this.loadingComments = false
        this.loadComments();
      }, 200)
    }
  }
  showSnackbar(message: string, type: 'success' | 'error') {
    let config: MatSnackBarConfig = {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: type === 'success' ? ['custom-snackbar', 'snackbar-success'] : ['custom-snackbar', 'snackbar-error'],
    };
    this._snackBar.open(message, '', config);
  }
  route = inject(ActivatedRoute);
  IMAGES_URL = IMAGES_URL
  id: string | null = this.route.snapshot.paramMap.get('id');
  post: Observable<PostInterface> = this.postsSvc.get(Number(this.id));
}
