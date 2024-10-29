import { Component, OnDestroy, OnInit } from '@angular/core';
import Sortable from 'sortablejs';
import { Column, columns, User, users } from '../../data/sample-data';

@Component({
  selector: 'sort-table',
  standalone: true,
  templateUrl: './sort-table.component.html',
  styleUrl: './sort-table.component.scss',
})
export class SortTableComponent implements OnInit, OnDestroy {
  columns: Column[] = [...columns];
  users: User[] = [...users];
  #sortableInstance: Sortable | undefined;

  ngOnInit(): void {
    this.#sortableInstance = new Sortable(
      document.querySelector('.sort-table > thead > tr')!,
      {
        draggable: 'th',
        direction: 'horizontal',
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
