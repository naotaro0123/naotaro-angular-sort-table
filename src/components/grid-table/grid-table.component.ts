import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import Sortable from 'sortablejs';
import { columns, User, users } from '../../data/sample-data';

@Component({
  selector: 'grid-table',
  standalone: true,
  templateUrl: './grid-table.component.html',
  styleUrl: './grid-table.component.scss',
})
export class GridTableComponent implements AfterViewInit, OnDestroy {
  columns: string[] = [...columns];
  users: User[] = [...users];
  #sortableInstance: Sortable | undefined;

  ngAfterViewInit(): void {
    this.#sortableInstance = new Sortable(
      document.querySelector('.grid-table')!,
      {
        draggable: '.drag-row',
        direction: 'horizontal',
        onEnd: (e) => {
          console.log(e);
        },
      }
    );
  }

  ngOnDestroy(): void {
    this.#sortableInstance?.destroy();
  }
}
