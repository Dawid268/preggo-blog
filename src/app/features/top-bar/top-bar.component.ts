import { Component } from '@angular/core';

interface TopBarMenu {
  name: string;
  path: string;
}

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
  public menu: TopBarMenu[] = [
    {
      name: 'TOP_BAR.BLOG',
      path: '',
    },
    {
      name: 'TOP_BAR.ACCOUNT',
      path: '',
    },
  ];
}
