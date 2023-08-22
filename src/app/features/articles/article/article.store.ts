import { Injectable } from '@angular/core';

import { ComponentStore } from '@ngrx/component-store';
import { EMPTY, Observable, catchError, switchMap, tap } from 'rxjs';

import { ArticleService } from '@core/http/article.service';

interface TranslationResponse {
  bodyPl: string;
  titlePl: string;
}

interface TagResponse {
  id: string;
  namePl: string;
  color: string;
}

export interface ArticleResponse {
  created: string;
  id: string;
  imageUrl: string;
  slug: string;
  translation: TranslationResponse;
  tags: TagResponse[];
}

interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Article {
  id: string;
  title: string;
  shortDescription: string;
  tags: Tag[];
  created: string;
  imageUrl: string;
  isLiked: boolean;
  slug: string;
}

export interface ArticleState {
  article: Article | null;
}

@Injectable()
export class ArticleStore extends ComponentStore<ArticleState> {
  public readonly article$: Observable<Article | null> = this.select(
    ({ article }) => article
  );

  constructor(private readonly articlesService: ArticleService) {
    super({
      article: null,
    });
  }

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

  readonly addArticle = this.updater(
    (state, article: Article): ArticleState => ({
      ...state,
      article: article,
    })
  );

  public selectArticle(): Observable<Article | null> {
    return this.select(({ article }) => article);
  }
}
