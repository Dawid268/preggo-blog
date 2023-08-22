import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { BaseActions } from './base.actions';
import { selectScreenSize } from './base.feature';

@Injectable({ providedIn: 'root' })
export class BaseFacade {
  public screeSize$ = this.store.select(selectScreenSize);

  constructor(private store: Store) {}

  public getCurrentBreakpoint(screenSize: string) {
    this.store.dispatch(
      BaseActions.getCurrentBreakpoint.success({ screenSize })
    );
  }
}
