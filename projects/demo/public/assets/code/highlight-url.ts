import { HighlightPlusModule } from 'ngx-highlightjs';

@Component({
  selector: 'app-root',
  template: `
   <pre>
     <code [highlight]="codeUrl | codeFromUrl | async" language="ts"></code>
   </pre>
  `,
  imports: [HighlightPlusModule, CommonModule]
})
export class AppComponent {
  codeUrl: string = 'assets/example-code.ts';
}