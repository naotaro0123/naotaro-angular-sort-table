import { Component, OnDestroy, OnInit } from '@angular/core';
import Sortable from 'sortablejs';
import { columns, User, users } from '../../data/sample-data';

@Component({
  selector: 'sort-table',
  standalone: true,
  templateUrl: './sort-table.component.html',
  styleUrl: './sort-table.component.scss',
})
export class SortTableComponent implements OnInit, OnDestroy {
  columns: string[] = [...columns];
  users: User[] = [...users];
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
  }
}
