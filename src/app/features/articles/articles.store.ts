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
import { PaginationParams, PaginationResponse } from '@shared/interfaces';
import { cloneDeep } from 'lodash-es';

export type PaginatedArticles = Pick<
  ArticlesState,
  'page' | 'size' | 'totalPages' | 'articles'
>;

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
  translations: TranslationResponse;
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

export interface ArticleDetails {
  articles: Article[];
  newestArticle: Article | null;
  page: number;
  size: number;
  totalPages: number;
}

export interface ArticlesState {
  articles: Article[];
  page: number;
  size: number;
  sort: string[];
  totalElements: number;
  totalPages: number;
}

@Injectable()
export class ArticlesStore extends ComponentStore<ArticlesState> {
  public readonly articlesData$: Observable<ArticleDetails> = this.select(
    state => {
      const sortedArticles = cloneDeep(state.articles).sort((a, b) =>
        b.created.localeCompare(a.created)
      );
      return {
        articles: sortedArticles,
        newestArticle: sortedArticles.shift() || null,
        page: state.page,
        size: state.size,
        totalPages: state.totalPages,
      };
    }
  );

  constructor(private readonly articlesService: ArticleService) {
    super({
      articles: [],
      page: 0,
      size: 0,
      sort: [],
      totalElements: 0,
      totalPages: 0,
    });
  }

  readonly getAllArticles = this.effect(
    (paginationParams: Observable<PaginationParams>) => {
      return paginationParams.pipe(
        exhaustMap(pagination =>
          this.articlesService.getArticles(pagination).pipe(
            tapResponse(
              articles => this.addArticles(articles),
              error => console.log(error)
            )
          )
        )
      );
    }
  );

  readonly addArticles = this.updater(
    (
      state,
      { content, ...rest }: PaginationResponse<Article[]>
    ): ArticlesState => ({
      ...state,
      articles: [...state.articles, ...content],
      ...rest,
    })
  );

  public selectArticlesWithPagination(): Observable<PaginatedArticles> {
    return this.select(({ articles, page, size, totalPages }) => ({
      articles,
      page,
      size,
      totalPages,
    }));
  }
}
