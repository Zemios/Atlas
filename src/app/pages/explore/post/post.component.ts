import { IMAGES_URL } from './../../../app.config';
import { Observable } from 'rxjs';
import { Component, inject } from '@angular/core';
import { PostInterface } from '../../../interfaces/post-interface';
import { PostsService } from '../../../services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { NewlineToBrPipe } from '../../../pipes/newline-to-br.pipe';
import { HighlightCodePipe } from '../../../pipes/highlight-code.pipe';
import { HtmlToTextPipe } from '../../../pipes/html-to-text.pipe';
import { RelativeTimePipe } from "../../../pipes/relative-time.pipe";

@Component({
  selector: 'app-post',
  imports: [AsyncPipe, NewlineToBrPipe, HighlightCodePipe, HtmlToTextPipe, RelativeTimePipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  private readonly postsSvc = inject(PostsService);
  route = inject(ActivatedRoute);
  IMAGES_URL = IMAGES_URL
  id: string | null = this.route.snapshot.paramMap.get('id');
  post: Observable<PostInterface> = this.postsSvc.get(Number(this.id));
}
