import { Component, signal } from '@angular/core';
import { CodeRepresentationComponent } from '../../../ngx-code-representation/src/public-api';

@Component({
  selector: 'app-root',
  imports: [
    CodeRepresentationComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.sass'
})
export class App {
  protected readonly title = signal('demo');
}
