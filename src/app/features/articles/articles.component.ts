import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ComponentStore } from '@ngrx/component-store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Article, ArticlesStore } from './articles.store';

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

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private readonly articlesStore: ArticlesStore
  ) {}

  public ngOnInit(): void {
    this.getAllArticles();
    const { id } = this.activatedRoute.snapshot.queryParams;

    if (id) {
      this.getSelectedArticle(id);
    }
  }

  public getSelectedArticle(id: Article['id']): void {
    this.articlesStore.getArticle(id);
    this.articlesStore
      .selectArticle()
      .pipe(untilDestroyed(this))
      .subscribe(article => {
        this.selectedArticle = article;
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: { id },
          queryParamsHandling: 'merge',
        });
      });
  }

  private getAllArticles(): void {
    this.articlesStore.getAllArticles();
    this.articlesStore
      .selectArticles()
      .pipe(untilDestroyed(this))
      .subscribe(articles => (this.articles = articles));
  }

  public backToArticlesList(): void {
    this.articlesStore.removeArticle();
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { id: null },
      queryParamsHandling: 'merge',
    });
  }
}
