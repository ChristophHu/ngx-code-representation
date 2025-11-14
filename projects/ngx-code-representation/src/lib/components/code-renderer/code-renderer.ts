import { Component, Input, OnInit, ViewEncapsulation, ElementRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core'
import { HighlightAuto } from 'ngx-highlightjs'
import { file } from '../../models/file.interface'
import { CodeRepresentationService } from '../../services/code-representation.service'
import { NgxIconsComponent } from '@christophhu/ngx-icons'
import { ThemesService } from '../../services/themes/themes.service'

@Component({
  selector: 'code-renderer',
  imports: [
    HighlightAuto,
    NgxIconsComponent
  ],
  templateUrl: './code-renderer.html',
  styleUrl: './code-renderer.sass',
  encapsulation: ViewEncapsulation.None
})
export class CodeRenderer implements OnInit, AfterViewInit, OnChanges {
  @Input() file!: file
  font_size: string = '16px'

  constructor(
    private _codeRepresentationService: CodeRepresentationService,
    private _themesService: ThemesService,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    this._codeRepresentationService.fontsize$.subscribe({
      next: (size: string) => {
        this.font_size = size
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['file'] && !changes['file'].firstChange) {
      this.makeAllElementsSelectable()
    }
  }

  ngAfterViewInit(): void {
    this.makeAllElementsSelectable()
  }

  private makeAllElementsSelectable(): void {
    setTimeout(() => {
      const allElements = this.elementRef.nativeElement.querySelectorAll('*')
      allElements.forEach((el: HTMLElement) => {
        el.style.userSelect = 'text'
        el.style.webkitUserSelect = 'text'
        el.style.setProperty('-moz-user-select', 'text')
        el.style.setProperty('-ms-user-select', 'text')
        el.style.setProperty('-khtml-user-select', 'text')
      })
    }, 100)
  }

  copyToClipboard(): void {
    if (this.file && this.file.code) {
      navigator.clipboard.writeText(this.file.code).then(() => {
        // Optionally, you can provide feedback to the user here
      }).catch(err => {
        console.error('Could not copy text: ', err)
      })
    }
  }
  
  changeHighlightTheme() {
    this._themesService.toggleHighlightTheme()
  }

  increaseFontSize(): void {
    this._codeRepresentationService.increaseFontSize()
  }

  decreaseFontSize(): void {
    this._codeRepresentationService.decreaseFontSize()
  }
}
