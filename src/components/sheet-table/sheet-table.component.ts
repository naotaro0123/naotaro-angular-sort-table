import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import jspreadsheet from 'jspreadsheet-ce';
import Sortable from 'sortablejs';
import { columns, User, users } from '../../data/sample-data';

@Component({
  selector: 'sheet-table',
  standalone: true,
  templateUrl: './sheet-table.component.html',
  styleUrl: './sheet-table.component.scss',
})
export class SheetTableComponent implements AfterViewInit, OnDestroy {
  columns: string[] = [...columns];
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

    this.#jspreadsheet.table.id = 'sort-table';

    // header
    const tdList = this.#jspreadsheet.table.tHead?.querySelectorAll('td');
    if (tdList === undefined) return;
    for (let i = 0; i < tdList.length; i++) {
      if (tdList[i].classList.contains('jexcel_selectall')) {
        continue;
      }
      tdList[i].setAttribute('data-id', this.columns[i - 1]);
      tdList[i].classList.add('sortable-td');

      const span1 = document.createElement('span');
      span1.textContent = '▲';
      span1.style.padding = '4px';
      span1.style.backgroundColor = 'lightgray';
      span1.style.cursor = 'pointer';
      span1.style.zIndex = '3';
      tdList[i].prepend(span1);
    }

    // body
    const trList = this.#jspreadsheet.table.tBodies[0].querySelectorAll('tr');
    for (let i = 0; i < trList.length; i++) {
      const _tdList = trList[i].querySelectorAll('td');
      for (let j = 0; j < _tdList.length; j++) {
        _tdList[j].setAttribute('data-id', this.columns[j]);
      }
    }

    this.#sortableInstance = new Sortable(
      document.querySelector('#sort-table > thead > tr')!,
      {
        draggable: 'td',
        // direction: 'horizontal',
        onStart: (e) => {
          console.log('onStart:', e);
        },
        // onUpdate: (e) => console.log('update', e),
        // onChoose: (e) => console.log('choose', e),
        // onChange: (e) => console.log('change', e),
        // onMove: (e) => console.log('move', e),
        onEnd: (e) => {
          console.log('onEnd:', e);
          const items = e.target.querySelectorAll('td');

          const newColumns: string[] = [];
          for (let i = 0; i < items.length; i++) {
            const value = items[i].getAttribute('data-id');
            if (value === null) continue;
            newColumns.push(value);
          }
          this.columns = newColumns;
        },
      }
    );
  }

  ngOnDestroy(): void {
    this.#sortableInstance?.destroy();
    this.#jspreadsheet?.destroy();
  }
}
