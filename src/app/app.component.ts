import { Component } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ScreenSize, BaseFacade } from './state/base';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'preggo-blog';

  private displayNameMap = new Map([
    [Breakpoints.XSmall, ScreenSize.XSmall],
    [Breakpoints.Small, ScreenSize.Small],
    [Breakpoints.Medium, ScreenSize.Medium],
    [Breakpoints.Large, ScreenSize.Large],
    [Breakpoints.XLarge, ScreenSize.XLarge],
  ]);

  constructor(
    public breakpointObserver: BreakpointObserver,
    private baseFacade: BaseFacade
  ) {
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(untilDestroyed(this))
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.baseFacade.getCurrentBreakpoint(
              this.displayNameMap.get(query) || ScreenSize.XLarge
            );
          }
        }
      });
  }
}
