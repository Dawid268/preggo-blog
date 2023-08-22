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

import { PaginationEventType } from '@shared/enums';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [TranslateModule, MatIconModule, CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  @Input() size = 5;
  @Input() page = 0;
  @Input() set totalPages(value: number) {
    this.pagesArray = Array.from(Array(value).keys());
  }

  @Output() emitPagedEvent = new EventEmitter<number>();

  public paginationEvents = PaginationEventType;
  public pagesArray: number[] = [];

  public emitPaginationEvent(page: number) {
    if (this.pagesArray.includes(page)) {
      this.page = page;
      this.emitPagedEvent.emit(page);
    }
  }
}
