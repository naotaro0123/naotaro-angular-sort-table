import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SheetTableComponent } from '../components/sheet-table/sheet-table.component';
import { SortTableComponent } from '../components/sort-table/sort-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SortTableComponent, SheetTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-sort-table';

  constructor() {}
}
