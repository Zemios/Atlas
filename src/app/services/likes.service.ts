import { Injectable } from '@angular/core';
import { LikesInterface } from '../interfaces/likes-interface';

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  constructor() { }
  likes: LikesInterface[] = [{id: 1, user_id: 1, post_id: 1, news_id: 1}, {id: 2, user_id: 2, post_id: 2, news_id: 2}, {id: 3, user_id: 3, post_id: 3, news_id: 3}];

}
