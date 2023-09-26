import { Injectable } from '@angular/core';

import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, exhaustMap, tap } from 'rxjs';

import { ArticleService } from '@core/http/article.service';
import { PaginationParams, PaginationResponse } from '@shared/interfaces';

export type PaginatedArticles = Pick<
  ArticlesState,
  'page' | 'size' | 'totalPages' | 'articles'
>;

interface TranslationResponse {
  bodyPl: string;
  titlePl: string;
  shortDescriptionPl: string;
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

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Article {
  id: string;
  title: string;
  body: string;
  shortDescription: string;
  tags: Tag[];
  created: string;
  imageUrl: string;
  isLiked: boolean;
  slug: string;
}

export interface ArticleDetails {
  articles: Article[];
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
  isLoading: boolean;
}

@Injectable()
export class ArticlesStore extends ComponentStore<ArticlesState> {
  public readonly articlesData$: Observable<ArticleDetails> = this.select(
    state => {
      return {
        articles: state.articles,
        page: state.page,
        size: state.size,
        totalPages: state.totalPages,
      };
    }
  );

  public readonly isLoading$: Observable<boolean> = this.select(
    state => state.isLoading
  );

  constructor(private readonly articlesService: ArticleService) {
    super({
      articles: [],
      page: 0,
      size: 0,
      sort: [],
      totalElements: 0,
      totalPages: 0,
      isLoading: false,
    });
  }

  readonly updateLoaderStatus = this.updater((state, isLoading: boolean) => ({
    ...state,
    isLoading,
  }));

  readonly getAllArticles = this.effect(
    (paginationParams: Observable<PaginationParams>) => {
      return paginationParams.pipe(
        tap(() => this.updateLoaderStatus(true)),
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

  readonly clearArticlesState = this.updater(state => ({
    ...state,
    articles: [],
    page: 0,
    size: 0,
    sort: [],
    totalElements: 0,
    totalPages: 0,
  }));

  readonly addArticles = this.updater(
    (
      state,
      { content, ...rest }: PaginationResponse<Article[]>
    ): ArticlesState => ({
      ...state,
      articles: [...state.articles, ...content],
      isLoading: false,
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
