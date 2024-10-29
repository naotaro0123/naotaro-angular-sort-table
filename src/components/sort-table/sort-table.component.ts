import { Component, OnDestroy, OnInit } from '@angular/core';
import Sortable from 'sortablejs';

const columns = ['id', 'name', 'e-mail', 'message'] as const;
type Column = (typeof columns)[number];

@Component({
  selector: 'sort-table',
  standalone: true,
  templateUrl: './sort-table.component.html',
  styleUrl: './sort-table.component.scss',
})
export class SortTableComponent implements OnInit, OnDestroy {
  columns: Column[] = [...columns];
  users: { [key in Column]: string }[] = [
    {
      id: '1',
      name: 'name1',
      'e-mail': 'info1@hoge.com',
      message: 'hellow world',
    },
    {
      id: '2',
      name: 'name2',
      'e-mail': 'info2@hoge.com',
      message: 'hellow cooking',
    },
    {
      id: '3',
      name: 'name3',
      'e-mail': 'info3@hoge.com',
      message: 'hellow speak',
    },
    {
      id: '4',
      name: 'name4',
      'e-mail': 'info4@hoge.com',
      message: 'hellow call',
    },
    {
      id: '5',
      name: 'name5',
      'e-mail': 'info5@hoge.com',
      message: 'hellow jump',
    },
    {
      id: '6',
      name: 'name6',
      'e-mail': 'info6@hoge.com',
      message: 'hellow stand',
    },
    {
      id: '7',
      name: 'name7',
      'e-mail': 'info7@hoge.com',
      message: 'hellow down',
    },
  ];
  #sortableInstance: Sortable | undefined;

  ngOnInit(): void {
    this.#sortableInstance = new Sortable(
      document.querySelector('.sort-table > thead > tr')!,
      {
        draggable: 'th',
        direction: 'horizontal',
        // onUpdate: (e) => console.log('update', e),
        // onChoose: (e) => console.log('choose', e),
        // onChange: (e) => console.log('change', e),
        // onStart: (e) => console.log('start', e),
        // onMove: (e) => console.log('move', e),
        onEnd: (e) => {
          const items = e.target.querySelectorAll('th');

          const newColumns: Column[] = [];
          for (let i = 0; i < items.length; i++) {
            const value = items[i].getAttribute('data-id');
            if (value === null) continue;
            newColumns.push(value as Column);
          }
          this.columns = newColumns;
        },
      }
    );
  }

  ngOnDestroy(): void {
    this.#sortableInstance?.destroy();
  }
}
