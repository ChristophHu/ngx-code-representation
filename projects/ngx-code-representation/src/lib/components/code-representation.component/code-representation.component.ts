import { Component, signal, OnInit, ElementRef, viewChildren, effect } from '@angular/core'
import { file } from '../../models/file.interface'
import { gist } from '../../models/gist.interface'
import { CommonModule } from '@angular/common'
import { PreviewRenderer } from '../preview-renderer/preview-renderer'
import { CodeRepresentationService } from '../../services/code-representation.service'
import { Observable, of } from 'rxjs'
import { CodeRenderer } from '../code-renderer/code-renderer'
import { IconsComponent } from '@christophhu/ngx-icons'
import { CodeEnum } from '../../models/code.enum'

@Component({
  selector: 'code-representation',
  imports: [
    CodeRenderer,
    CommonModule,
    PreviewRenderer,
    IconsComponent
],
  templateUrl: './code-representation.component.html',
  styleUrls: ['./code-representation.component.sass']
})
export class CodeRepresentationComponent implements OnInit {
  gist$: Observable<gist | null> = of(null)
  file$: Observable<file | null> = of(null)
  file_index: number = 0

  // copied = signal(false)
  // activeFileIndex = signal(1)
  activeView = signal<CodeEnum.CODE | CodeEnum.PREVIEW>(CodeEnum.CODE)
  
  tabItems = viewChildren<ElementRef<HTMLLIElement>>('tabItem')
  indicatorLeft = signal<number>(0)
  indicatorWidth = signal<number>(0)
  hoveredTabIndex = signal<number | null>(null)

  constructor(private _codeRepresentationService: CodeRepresentationService) {
    effect(() => {
      this.updateIndicator()
    })
  }
  
  ngOnInit(): void {
    this.gist$ = this._codeRepresentationService.gist$
    this.file$ = this._codeRepresentationService.file$
    
    // Initialize first file when gist is loaded
    this._codeRepresentationService.gist$.subscribe(gist => {
      if (gist && gist.file && gist.file.length > 0) {
        this._codeRepresentationService.setFile(0)
      }
    })
  }

  selectFile(index: number): void {
    if (this.file_index === index) return
    this._codeRepresentationService.setFile(index) 
    this.file_index = index
    this.updateIndicator()
  }

  selectView(view: CodeEnum.CODE | CodeEnum.PREVIEW): void {
    this.activeView.set(view)
    this.updateIndicator()
  }

  updateIndicator(): void {
    const tabs = this.tabItems()
    if (!tabs || tabs.length === 0) return

    let targetIndex = -1
    
    // If hovering, use hovered tab index
    if (this.hoveredTabIndex() !== null) {
      targetIndex = this.hoveredTabIndex()!
    } else {
      // Otherwise use active tab
      if (this.activeView() === CodeEnum.PREVIEW) {
        targetIndex = 0
      } else {
        // Find the active code tab - it's after the preview tab if it exists
        const hasPreview = tabs.some(tab => 
          tab.nativeElement.classList.contains('preview-tab')
        )
        targetIndex = hasPreview ? this.file_index + 1 : this.file_index
      }
    }

    if (targetIndex >= 0 && targetIndex < tabs.length) {
      const targetTab = tabs[targetIndex].nativeElement
      this.indicatorLeft.set(targetTab.offsetLeft)
      this.indicatorWidth.set(targetTab.offsetWidth)
    }
  }

  onTabHover(index: number): void {
    this.hoveredTabIndex.set(index)
    this.updateIndicator()
  }

  onTabLeave(): void {
    this.hoveredTabIndex.set(null)
    this.updateIndicator()
  }
}
