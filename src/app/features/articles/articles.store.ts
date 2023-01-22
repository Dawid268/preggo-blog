import { Injectable } from '@angular/core';

import { ComponentStore, tapResponse } from '@ngrx/component-store';
import {
  EMPTY,
  Observable,
  catchError,
  exhaustMap,
  switchMap,
  tap,
} from 'rxjs';

import { ArticleService } from '@core/http/article.service';

export interface Article {
  id: string;
  title: string;
  shortDescription: string;
  tags: string[];
  created: string;
  img: string;
  isLiked: boolean;
}

export interface ArticlesState {
  articles: Article[];
  article: Article | null;
}

@Injectable()
export class ArticlesStore extends ComponentStore<ArticlesState> {
  constructor(private readonly articlesService: ArticleService) {
    super({ articles: [], article: null });
  }

  readonly getAllArticles = this.effect<void>(trigger$ =>
    trigger$.pipe(
      exhaustMap(() =>
        this.articlesService.getArticles().pipe(
          tapResponse(
            articles => this.addArticles(articles),
            error => console.log(error)
          )
        )
      )
    )
  );

  readonly getArticle = this.effect((articleId$: Observable<Article['id']>) => {
    return articleId$.pipe(
      switchMap(id =>
        this.articlesService.getArticleById(id).pipe(
          tap({
            next: article => this.addArticle(article),
            error: error => console.log(error),
          }),
          catchError(() => EMPTY)
        )
      )
    );
  });

  readonly addArticles = this.updater(
    (state, articles: Article[]): ArticlesState => ({
      ...state,
      articles: [...state.articles, ...articles],
    })
  );

  readonly addArticle = this.updater(
    (state, article: Article): ArticlesState => ({
      ...state,
      article: article,
    })
  );

  readonly removeArticle = this.updater(
    (state): ArticlesState => ({
      ...state,
      article: null,
    })
  );

  public selectArticles(): Observable<Article[]> {
    return this.select(state => state.articles);
  }

  public selectArticle(): Observable<Article | null> {
    return this.select(state => state.article);
  }
}
