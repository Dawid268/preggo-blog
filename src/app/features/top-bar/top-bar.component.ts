import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenSize } from '@app/state/base';

import * as social from '@shared/const/socials';

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
  @Input() screen: ScreenSize = ScreenSize.Large;
  public sizes = ScreenSize;
  public menu: TopBarMenu[] = [
    // {
    //   name: 'TOP_BAR.HOME',
    //   path: '',
    // },
  ];
  public instagramLink = social.instagram;
  public facebookLink = social.facebook;

  constructor(private router: Router) {}

  public onNavigate(path: string): void {
    this.router.navigate([path]);
  }
}
