import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NewsInterface } from '../../interfaces/news-interface';
import { NewsService } from '../../services/news.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-news',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
})
export class NewsComponent {
  selectedCategory = '';
  private readonly newsSvc = inject(NewsService);
  news: Observable<NewsInterface[]> = this.newsSvc.show();

  /* TODO: Esto de aqui deberia importar las categorias que hay entre los elementos de news? */
  // get filteredNews() {
  //   return this.selectedCategory ? this.news.filter((item) => item.category === this.selectedCategory) : this.news;
  // }

  // filterNews(category: string) {
  //   this.selectedCategory = category;
  // }
}
