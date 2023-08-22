import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArticleComponent, ArticlesComponent, MainComponent } from './features';

const routes: Routes = [
  // ,
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: ArticlesComponent,
      },
      {
        path: ':id',
        component: ArticleComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
