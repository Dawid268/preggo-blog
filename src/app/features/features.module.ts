import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import {
  ArticleListComponent,
  ArticlesComponent,
  MainComponent,
  TopBarComponent,
  ArticleComponent,
} from '.';

import { AppRoutingModule } from '@app/app-routing.module';
import {
  ButtonComponent,
  LoaderComponent,
  PaginationComponent,
} from '@shared/components';
import { ColorsDirective } from '@shared/directives/colors.directive';
import { MaterialModule } from '@shared/material.module';

const components = [
  MainComponent,
  TopBarComponent,
  ArticlesComponent,
  ArticleListComponent,
  ArticleComponent,
];
const sharedComponents = [
  ButtonComponent,
  PaginationComponent,
  LoaderComponent,
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    TranslateModule,
    HttpClientModule,
    AppRoutingModule,
    MatIconModule,
    ColorsDirective,
    InfiniteScrollModule,
    MaterialModule,
    ...sharedComponents,
  ],
})
export class FeaturesModule {}
