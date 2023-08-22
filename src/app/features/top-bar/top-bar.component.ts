import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenSize } from '@app/state/base';

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

  constructor(private router: Router) {}

  public onNavigate(path: string): void {
    this.router.navigate([path]);
  }
}
