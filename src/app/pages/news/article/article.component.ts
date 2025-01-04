import { Observable } from 'rxjs';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsInterface } from '../../../interfaces/news-interface';
import { NewsService } from '../../../services/news.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-article',
  imports: [AsyncPipe],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent {
  private readonly newsSvc = inject(NewsService);
  route = inject(ActivatedRoute);
  id: string | null = this.route.snapshot.paramMap.get('id');
  article: Observable<NewsInterface> = this.newsSvc.get(Number(this.id));
}
