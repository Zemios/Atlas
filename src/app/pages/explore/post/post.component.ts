import { Component } from '@angular/core';
import { PostInterface } from '../../../interfaces/post-interface';
import { PostsService } from '../../../services/posts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  post: PostInterface | undefined;
  constructor(private postsService: PostsService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.postsService.get(params['id']).subscribe(post => {
        this.post = post;
      })
    })
  }
}
