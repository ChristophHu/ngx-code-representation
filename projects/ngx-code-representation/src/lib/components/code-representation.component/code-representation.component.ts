import { Component } from '@angular/core';
import { HighlightJsDirective } from 'ngx-highlight-js'

@Component({
  selector: 'code-representation',
  imports: [
    HighlightJsDirective
  ],
  templateUrl: './code-representation.component.html',
  styleUrls: ['./code-representation.component.sass']
})
export class CodeRepresentationComponent {

}
