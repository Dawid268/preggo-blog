import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { Article, Tag } from '../articles.store';
import { ScreenSize } from '@app/state/base';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListComponent {
  @Input() articles: Article[] = [];
  @Input() screen: ScreenSize = ScreenSize.Large;
  @Input() isLastPage: boolean = false;

  @Output() selectedArticle = new EventEmitter<Article['id']>();
  @Output() emitGetArticlesByTag = new EventEmitter<Tag>();

  public sizes = ScreenSize;

  public selectArticle(id: Article['id']): void {
    this.selectedArticle.emit(id);
  }

  public getArticlesByTag(tag: Tag): void {
    this.emitGetArticlesByTag.emit(tag);
  }
}
