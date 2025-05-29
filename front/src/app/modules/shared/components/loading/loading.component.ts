import {Component} from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

/**
 * @title Basic progress-spinner
 */
@Component({
  standalone: true,
  selector: 'app-loading',
  templateUrl: 'loading.component.html',
  styleUrls: ['./loading.component.css'],
  imports: [MatProgressSpinnerModule],
})
export class LoadingComponent {}
