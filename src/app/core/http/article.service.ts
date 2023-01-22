import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Article } from '@features/articles/articles.store';

@Injectable()
export class ArticleService {
  constructor(private httpClient: HttpClient) {}

  public getArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>('/assets/articles.mock.json');
  }

  public getArticleById(id: Article['id']): Observable<Article> {
    return this.httpClient.get<Article>('/assets/article.mock.json', {
      params: new HttpParams().append('id', id),
    });
  }
}
