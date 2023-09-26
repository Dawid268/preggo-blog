import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ComponentStore } from '@ngrx/component-store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter } from 'rxjs';

import { Article, ArticlesState, ArticlesStore, Tag } from './articles.store';
import { setFontColorFn } from '@shared/utils';
import { BaseFacade, ScreenSize } from '@app/state/base';
@UntilDestroy()
@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  providers: [ComponentStore, ArticlesStore],
})
export class ArticlesComponent implements OnInit {
  @ViewChild('articlesContainer')
  public articlesContainer: ElementRef<HTMLElement> | null = null;

  public selectedArticle: Article | null = null;
  public articles: Article[] = [];
  public size: ArticlesState['size'] = 5;
  public page: ArticlesState['page'] = 0;
  public totalPages: ArticlesState['totalPages'] = 0;
  public newestArticle: Article | null = null;
  public screenSize$ = this.baseFacade.screeSize$;
  public sizes = ScreenSize;
  public selectedTag: Tag | null = null;
  public isLoading$ = this.articlesStore.isLoading$.pipe(untilDestroyed(this));
  public isLastPage: boolean = false;

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
      .subscribe(({ articles, page, size, totalPages }) => {
        this.page = page;
        this.size = size;
        this.totalPages = totalPages;
        
        if (this.selectedTag) {
          this.newestArticle = null;
          this.articles = articles;
          return;
        }

        if (!this.newestArticle && !this.selectedTag) {
          this.newestArticle = articles.shift() || null;
        }

        this.articles = articles;
      });
    this.getAllArticles();
    const { id } = this.activatedRoute.snapshot.queryParams;

    if (id) {
      this.getSelectedArticle(id);
    }
  }

  public getAllArticlesBySelectedTagTrigger(tag: Tag): void {
    this.selectedTag = null;

    setTimeout(() => {
      this.articlesStore.clearArticlesState();
      this.selectedTag = tag;
      this.articlesContainer?.nativeElement.scrollTo(0, 0);
      this.getArticlesByTag(tag);
      this.newestArticle = null;
    }, 0);
  }

  public getArticlesByTag(tag: Tag): void {
    this.articlesStore.getAllArticles({
      page: this.page,
      size: 8,
      tagId: tag?.id,
    });
  }

  public getSelectedArticle(id: Article['id'] | undefined): void {
    if (!id) {
      return;
    }

    this.router.navigate([id]);
  }

  public removeSelectedTag(): void {
    this.selectedTag = null;
    this.articlesContainer?.nativeElement.scrollTo(0, 0);
    this.articlesStore.clearArticlesState();
    this.articlesStore.getAllArticles({ page: 0, size: 5 });
  }

  private getAllArticles(): void {
    this.articlesStore.getAllArticles({ page: this.page, size: this.size });
  }

  public getPagedArticles(page = this.page, size = this.size): void {
    this.articlesStore.getAllArticles({ page, size });
  }

  public onScroll(): void {
    this.page++;
    if (this.page === this.totalPages) {
      this.isLastPage = true;
      return;
    }

    this.selectedTag
      ? this.getArticlesByTag(this.selectedTag)
      : this.getAllArticles();
  }

  public setFontColor(backgroundColor: string): string {
    return setFontColorFn(backgroundColor);
  }
}
