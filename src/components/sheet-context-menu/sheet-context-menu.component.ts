import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import jspreadsheet from 'jspreadsheet-ce';
import Sortable from 'sortablejs';
import { User, users } from '../../data/sample-data';

@Component({
  selector: 'sheet-context-menu',
  standalone: true,
  templateUrl: './sheet-context-menu.component.html',
  styleUrl: './sheet-context-menu.component.scss',
})
export class SheetContextMenuComponent implements AfterViewInit, OnDestroy {
  users: User[] = [...users];
  #jspreadsheet: ReturnType<typeof jspreadsheet> | undefined;
  #sortableInstance: Sortable | undefined;
  @ViewChild('spreadsheetContainer', { static: true })
  readonly spreadsheetContainer!: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    const spreadsheetContainer = this.spreadsheetContainer.nativeElement;
    this.#jspreadsheet = jspreadsheet(spreadsheetContainer, {
      columnDrag: false,
      rowDrag: false,
      columns: [
        { title: '名前', width: 140 },
        { title: 'タイトル', width: 140 },
        { title: '説明', width: 160 },
      ],
      data: this.users.map((user) => [user.name!, user.title!, user.mask!]),
    });

    this.#sortableInstance = new Sortable(
      this.#jspreadsheet.table.tHead?.querySelector('tr')!,
      {
        draggable: 'td',
        onStart: (e) => {
          console.log('onStart:', e);
        },
        onEnd: (e) => {
          console.log('onEnd:', e);
          const { oldIndex, newIndex } = e;
          this.#jspreadsheet?.moveColumn(
            (oldIndex ?? 0) - 1,
            (newIndex ?? 0) - 1
          );
        },
      }
    );
  }

  ngOnDestroy(): void {
    this.#sortableInstance?.destroy();
    this.#jspreadsheet?.destroy();
  }
}
