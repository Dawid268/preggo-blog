export enum ScreenSize {
  XSmall = 'XSmall',
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
  XLarge = 'XLarge',
}

export interface BaseState {
  screenSize: ScreenSize;
}
