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
  selector: 'sheet-table',
  standalone: true,
  templateUrl: './sheet-table.component.html',
  styleUrl: './sheet-table.component.scss',
})
export class SheetTableComponent implements AfterViewInit, OnDestroy {
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

    // header
    const tdList = this.#jspreadsheet.table.tHead?.querySelectorAll('td');
    if (tdList === undefined) return;
    for (let i = 0; i < tdList.length; i++) {
      if (tdList[i].classList.contains('jexcel_selectall')) {
        continue;
      }
      tdList[i].classList.add('sortable-td');

      const span1 = document.createElement('span');
      span1.textContent = '▲';
      span1.style.padding = '4px';
      span1.style.backgroundColor = 'lightgray';
      span1.style.cursor = 'pointer';
      span1.style.zIndex = '3';
      tdList[i].prepend(span1);
    }

    this.#sortableInstance = new Sortable(
      this.#jspreadsheet.table.tHead?.querySelector('tr')!,
      {
        draggable: 'td',
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
