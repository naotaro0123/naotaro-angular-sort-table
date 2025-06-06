import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GridTableComponent } from '../components/grid-table/grid-table.component';
import { SheetContextMenuComponent } from '../components/sheet-context-menu/sheet-context-menu.component';
import { SheetTableComponent } from '../components/sheet-table/sheet-table.component';
import { SortTableComponent } from '../components/sort-table/sort-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SortTableComponent,
    SheetTableComponent,
    GridTableComponent,
    SheetContextMenuComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'naotaro-angular-sort-table';

  constructor() {}
}
