import { Component, signal } from '@angular/core';
import { CodeRepresentationComponent } from '../../../ngx-code-representation/src/public-api';
import { HighlightAuto } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import { file } from '../../../ngx-code-representation/src/lib/models/file.interface';

@Component({
  selector: 'app-root',
  imports: [
    CodeRepresentationComponent,
    HighlightAuto,
    HighlightLineNumbers
  ],
  templateUrl: './app.html',
  styleUrl: './app.sass'
})
export class App {
  protected readonly title = signal('demo');
  
  testCode = `function hello() {
  console.log('Hello World');
  return true;
}`;

  files: file[] =
    [
    {filename: 'main.ts', language: 'typescript', code: `import { provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';`},
    {filename: 'app.ts', language: 'typescript', code: `export interface file {
  filename: string;
  language: string;
  code: string;
}

export interface files {
  files: file[];
}`},
    {filename: 'highlight-url.ts', language: 'typescript', filepath: `assets/code/highlight-url.ts`},
  ]
}
