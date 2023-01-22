import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArticlesComponent, MainComponent } from './features';

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
    ],
  },

  // {
  //   path: '*',
  //   redirectTo: '',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
