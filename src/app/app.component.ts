import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SortTableComponent } from '../components/sort-table/sort-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SortTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-sort-table';

  constructor() {}
}
