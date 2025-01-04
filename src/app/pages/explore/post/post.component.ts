import { Observable } from 'rxjs';
import { Component, inject } from '@angular/core';
import { PostInterface } from '../../../interfaces/post-interface';
import { PostsService } from '../../../services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-post',
  imports: [AsyncPipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  route = inject(ActivatedRoute);
  id: string | null = this.route.snapshot.paramMap.get('id');
  post: Observable<PostInterface> | undefined = inject(PostsService).get(Number(this.id));
}
