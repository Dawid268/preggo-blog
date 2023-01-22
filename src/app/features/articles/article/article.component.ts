import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Article } from '../articles.store';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent {
  @Input() article: Article | null = null;
}
