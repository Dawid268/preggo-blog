import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';

import {
  ArticleListComponent,
  ArticlesComponent,
  MainComponent,
  TopBarComponent,
  ArticleComponent,
} from '.';

import { AppRoutingModule } from '@app/app-routing.module';
import { ButtonComponent } from '@shared/components';

const components = [
  MainComponent,
  TopBarComponent,
  ArticlesComponent,
  ArticleListComponent,
  ArticleComponent,
];
const sharedComponents = [ButtonComponent];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    TranslateModule,
    HttpClientModule,
    AppRoutingModule,
    MatIconModule,
    ...sharedComponents,
  ],
})
export class FeaturesModule {}
