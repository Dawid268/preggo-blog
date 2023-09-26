import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { ScreenSize } from '@app/state/base';

@Component({
  standalone: true,
  imports: [TranslateModule, MatIconModule, CommonModule],
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() text = '';
  @Input() icon: string | null = null;
  @Input() screenSize: ScreenSize = ScreenSize.Medium;

  @Output() emitClickEvent = new EventEmitter<void>();

  public screenSizeEnum = ScreenSize;

  public clickEvent(): void {
    this.emitClickEvent.emit();
  }
}
