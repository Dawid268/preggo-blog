import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';

import { Article, ArticleResponse } from '@features/articles/articles.store';
import { environment } from 'src/environments/environment';
import { PaginationParams, PaginationResponse } from '@shared/interfaces';
import { parseQueryParams } from '@shared/utils';

@Injectable()
export class ArticleService {
  constructor(private httpClient: HttpClient) {}

  public getArticles(
    pagination: PaginationParams
  ): Observable<PaginationResponse<Article[]>> {
    const params = parseQueryParams({
      size: pagination.size,
      page: pagination.page,
      tagId: pagination.tagId,
    });
    return this.httpClient
      .get<PaginationResponse<ArticleResponse[]>>(
        `${environment.api}/blog/articles`,
        { params }
      )
      .pipe(
        map(({ content, page, size, sort, totalElements, totalPages }) => ({
          page,
          size,
          sort,
          totalElements,
          totalPages,
          content: content?.map(
            ({ created, id, imageUrl, slug, translations, tags }) => ({
              id,
              created,
              imageUrl,
              title: translations?.titlePl,
              body: translations?.bodyPl,
              shortDescription: translations.shortDescriptionPl,
              slug,
              isLiked: false,
              tags: tags?.map(({ id, namePl: name, color }) => ({
                id,
                name,
                color,
              })),
            })
          ),
        }))
      );
  }

  public getArticleById(id: Article['id']): Observable<Article> {
    return this.httpClient
      .get<ArticleResponse>(`${environment.api}/blog/articles/${id}`)
      .pipe(
        map(({ created, id, imageUrl, slug, translations, tags }) => ({
          id,
          created,
          imageUrl,
          title: translations?.titlePl,
          body: translations?.bodyPl,
          shortDescription: translations.shortDescriptionPl,
          slug,
          isLiked: false,
          tags: tags?.map(({ id, namePl: name, color }) => ({
            id,
            name,
            color,
          })),
        }))
      );
  }
}
