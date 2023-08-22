import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ComponentStore } from '@ngrx/component-store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Article, ArticlesState, ArticlesStore } from './articles.store';
import { filter } from 'rxjs';
import { setFontColorFn } from '@shared/utils';
import { defaultDateFormat } from '@shared/const';
import { BaseFacade, ScreenSize } from '@app/state/base';

@UntilDestroy()
@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  providers: [ComponentStore, ArticlesStore],
})
export class ArticlesComponent implements OnInit {
  public selectedArticle: Article | null = null;
  public articles: Article[] = [];
  public size: ArticlesState['size'] = 5;
  public page: ArticlesState['page'] = 0;
  public totalPages: ArticlesState['totalPages'] = 0;
  public newestArticle: Article | null = null;
  public defaultDateFormat = defaultDateFormat;
  public screenSize$ = this.baseFacade.screeSize$;
  public sizes = ScreenSize;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private readonly articlesStore: ArticlesStore,
    private baseFacade: BaseFacade
  ) {}

  public ngOnInit(): void {
    this.articlesStore.articlesData$
      .pipe(
        untilDestroyed(this),
        filter(({ articles }) => !!articles?.length)
      )
      .subscribe(({ articles, page, size, totalPages, newestArticle }) => {
        this.articles = articles;
        this.page = page;
        this.size = size;
        this.totalPages = totalPages;
        this.newestArticle = newestArticle;
      });
    this.getAllArticles();
    const { id } = this.activatedRoute.snapshot.queryParams;

    if (id) {
      this.getSelectedArticle(id);
    }
  }

  public getSelectedArticle(id: Article['id'] | undefined): void {
    if (!id) {
      return;
    }

    this.router.navigate([id]);
  }

  private getAllArticles(): void {
    this.articlesStore.getAllArticles({ page: this.page, size: this.size });
  }

  public getPagedArticles(page = this.page, size = this.size): void {
    this.articlesStore.getAllArticles({ page, size });
  }

  onScroll(): void {
    this.page++;
    if (this.page === this.totalPages) {
      return;
    }

    this.getAllArticles();
  }

  public setFontColor(backgroundColor: string): string {
    return setFontColorFn(backgroundColor);
  }
}
