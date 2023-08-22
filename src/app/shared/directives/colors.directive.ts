import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appColors]',
  standalone: true,
})
export class ColorsDirective implements OnInit {
  @Input() baseColor!: string;
  @Input() skipFontColor = false;
  @Input() setBackgroundColor = false;
  @Input() customOpacityBackground?: number;
  @Input() customOpacityText?: number;

  constructor(private elementRef: ElementRef) {}

  public ngOnInit(): void {
    if (this.setBackgroundColor) {
      this.elementRef.nativeElement.style.backgroundColor = this.setFontColor(
        this.customOpacityBackground
      );
    }

    if (this.skipFontColor) {
      return;
    }

    this.elementRef.nativeElement.style.color = this.setFontColor(
      this.customOpacityText
    );
  }

  private setFontColor(opacity_?: number): string {
    const splittedColor = this.baseColor.split(',');
    let fontColor = '';
    const opacity =
      opacity_ || splittedColor[splittedColor.length - 1].split(')')[0] || 1;

    for (let i = 0; i < splittedColor.length - 1; i++) {
      fontColor += `${splittedColor[i]},`;
    }

    fontColor += `${opacity})`;
    return fontColor;
  }
}
