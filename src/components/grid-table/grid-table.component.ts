import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import Sortable from 'sortablejs';
import { User, users } from '../../data/sample-data';
@Component({
  selector: 'grid-table',
  standalone: true,
  imports: [MatMenuModule, MatMenuTrigger],
  templateUrl: './grid-table.component.html',
  styleUrl: './grid-table.component.scss',
})
export class GridTableComponent implements AfterViewInit, OnDestroy {
  users: User[] = [...users];
  #sortableInstance: Sortable | undefined;

  ngAfterViewInit(): void {
    // this.#sortableInstance = new Sortable(
    //   // この下のdrag-rowは不要だった
    //   document.querySelector('.grid-table > .drag-rows')!,
    //   {
    //     handle: '.handle',
    //     onEnd: (e) => {
    //       console.log(e);
    //     },
    //   }
    // );
  }

  menuOpened(): void {
    this.#sortableInstance = new Sortable(
      // この下のdrag-rowは不要だった
      document.querySelector('.grid-table > .drag-rows')!,
      {
        handle: '.handle',
        onEnd: (e) => {
          console.log(e);
        },
      }
    );
  }

  menuClosed(): void {
    this.#sortableInstance?.destroy();
  }

  ngOnDestroy(): void {
    // this.#sortableInstance?.destroy();
  }
}
