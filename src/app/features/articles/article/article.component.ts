import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ComponentStore } from '@ngrx/component-store';

import { ArticleStore } from './article.store';
import { BaseFacade, ScreenSize } from '@app/state/base';

@UntilDestroy()
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers: [ComponentStore, ArticleStore],
})
export class ArticleComponent implements OnInit {
  public article$ = this.articleStore.article$.pipe(untilDestroyed(this));
  public screenSize$ = this.baseFacade.screeSize$;
  public sizes = ScreenSize;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private readonly articleStore: ArticleStore,
    private baseFacade: BaseFacade
  ) {}

  public ngOnInit(): void {
    const articleId = this.activatedRoute.snapshot.params?.['id'];
    this.articleStore.getArticle(articleId);
  }

  public backToArticlesList(): void {
    this.router.navigate(['']);
  }
}
