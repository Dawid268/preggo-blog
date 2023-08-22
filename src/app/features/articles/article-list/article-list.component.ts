import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { Article } from '../articles.store';
import { defaultDateFormat } from '@shared/index';
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

  @Output() selectedArticle = new EventEmitter<Article['id']>();

  public sizes = ScreenSize;
  public defaultDateFormat = defaultDateFormat;

  public selectArticle(id: Article['id']): void {
    this.selectedArticle.emit(id);
  }
}
