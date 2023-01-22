import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleService } from './http/article.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [ArticleService],
})
export class CoreModule {}
