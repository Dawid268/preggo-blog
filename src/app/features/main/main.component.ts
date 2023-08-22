import { Component } from '@angular/core';
import { BaseFacade } from '@app/state/base';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;

  public selector = 'main-container__body';
  public screenSize$ = this.baseFacade.screeSize$;

  constructor(private baseFacade: BaseFacade) {}

  onScrollDown(ev: any) {
    console.log('scrolled down!!', ev);
  }

  onUp(ev: any) {
    console.log('scrolled up!', ev);
  }

  onScroll(): void {
    console.log('tutaj');
  }
}
