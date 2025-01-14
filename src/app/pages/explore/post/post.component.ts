import { Observable } from 'rxjs';
import { Component, inject } from '@angular/core';
import { PostInterface } from '../../../interfaces/post-interface';
import { PostsService } from '../../../services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { NewlineToBrPipe } from '../../../pipes/newline-to-br.pipe';

@Component({
  selector: 'app-post',
  imports: [AsyncPipe, NewlineToBrPipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  private readonly postsSvc = inject(PostsService);
  route = inject(ActivatedRoute);
  id: string | null = this.route.snapshot.paramMap.get('id');
  post: Observable<PostInterface> = this.postsSvc.get(Number(this.id));
}
