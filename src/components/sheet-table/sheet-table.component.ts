import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import jspreadsheet from 'jspreadsheet-ce';
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
  // #sortableInstance: Sortable | undefined;
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
      columns: [
        { title: 'name', width: 160 },
        { title: 'title', width: 160 },
        { title: 'mask', width: 160 },
      ],
      data: this.users.map((user) => [user.name!, user.title!, user.mask!]),
    });

    // this.#sortableInstance = new Sortable(
    //   document.querySelector('.sheet-table > thead > tr')!,
    //   {
    //     draggable: 'th',
    //     direction: 'horizontal',
    //     onEnd: (e) => {
    //       const items = e.target.querySelectorAll('th');

    //       const newColumns: string[] = [];
    //       for (let i = 0; i < items.length; i++) {
    //         const value = items[i].getAttribute('data-id');
    //         if (value === null) continue;
    //         newColumns.push(value);
    //       }
    //       this.columns = newColumns;
    //     },
    //   }
    // );
  }

  ngOnDestroy(): void {
    // this.#sortableInstance?.destroy();
    this.#jspreadsheet?.destroy();
  }
}
