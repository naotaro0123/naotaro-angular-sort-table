import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
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
export class SheetTableComponent implements OnInit, OnDestroy {
  columns: string[] = [...columns];
  users: User[] = [...users];
  #jspreadsheet: ReturnType<typeof jspreadsheet> | undefined;
  #sortableInstance: Sortable | undefined;
  @ViewChild('spreadsheetContainer', { static: true })
  readonly spreadsheetContainer!: ElementRef<HTMLDivElement>;

  ngOnInit(): void {
    const spreadsheetContainer = this.spreadsheetContainer.nativeElement;
    this.#jspreadsheet = jspreadsheet(spreadsheetContainer, {
      about: false,
      allowDeleteColumn: false,
      allowDeleteRow: false,
      allowExport: false,
      allowInsertColumn: false,
      allowInsertRow: false,
      allowManualInsertColumn: false,
      // columnDrag: true,
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
      const target = tdList[i + 1];
      if (tdList[i + 1] === undefined) continue;

      target.setAttribute('data-id', this.columns[i]);
      target.draggable = true;
      if (this.columns[i] === 'name') {
        target.addEventListener('drag', (e) => {
          console.log('drag:', e);
        });
      }
    }

    // body
    const trList = this.#jspreadsheet.table.tBodies[0].querySelectorAll('tr');
    for (let i = 0; i < trList.length; i++) {
      const _tdList = trList[i].querySelectorAll('td');
      for (let j = 0; j < _tdList.length; j++) {
        _tdList[j].setAttribute('data-id', this.columns[j]);
      }
    }

    // console.log('#', document.querySelector('#sort-table > thead > tr'));

    this.#sortableInstance = new Sortable(
      document.querySelector('#sort-table > thead > tr')!,
      {
        draggable: 'td',
        // direction: 'horizontal',
        dragClass: 'sortable-drag',
        onStart: (e) => {
          console.log('onStart:', e);
        },
        onEnd: (e) => {
          console.log('onEnd:', e);
          const items = e.target.querySelectorAll('th');

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
