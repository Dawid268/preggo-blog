import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { Article } from '../articles.store';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListComponent {
  @Input() articles: Article[] = [];

  @Output() selectedArticle = new EventEmitter<Article['id']>();

  public selectArticle(id: Article['id']): void {
    this.selectedArticle.emit(id);
  }
}
