import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import jspreadsheet from 'jspreadsheet-ce';
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
      contextMenu(instance, colIndex, rowIndex, event) {
        const menuList = [];
        menuList.push({
          title: 'コピー',
          shortcut: 'Ctrl + C',
          // icon: 'copy',
          onclick: () => {
            console.log('copy', colIndex, rowIndex);
            // FIXME: これだとシート全体がコピーされてしまう
            // instance.copy();
            // instance.copyData()
          },
        });
        menuList.push({
          title: 'ペースト',
          shortcut: 'Ctrl + V',
          // icon: 'paste',
          onclick: async () => {
            const text = await navigator.clipboard.readText();
            console.log('paste', colIndex, rowIndex, text);
            // FIXME: これだと一つのシートしかペーストできない
            instance.paste(Number(colIndex), Number(rowIndex), text);
          },
        });

        return menuList;
      },
      onload(element, instance) {
        console.log('onload', element, instance);
      },
    });
  }

  ngOnDestroy(): void {
    this.#jspreadsheet?.destroy();
  }
}
