import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2, inject, OnDestroy } from '@angular/core'
import { gist } from '../../models/gist.interface'

@Component({
  selector: 'preview-renderer',
  imports: [

  ],
  templateUrl: './preview-renderer.html',
  styleUrls: ['./preview-renderer.sass'],
})
export class PreviewRenderer implements OnInit, AfterViewInit, OnDestroy {
  @Input() gist: gist = {
    "name": "Placeholder Gist",
    "type": "Ülaceholder",
    "version": "1.0.0",
    "description": "This is a placeholder gist used for demonstration purposes.",
    "file": [
      {
        "filename": "placeholder.html",
        "language": "html",
        "code": "<div>Placeholder<\/div>"
      },
      {
        "filename": "placeholder.css",
        "language": "css",
        "code": "div { color: red }"
      }
    ]
  }
  @ViewChild('elRenderer', { static: false }) elRenderer!: ElementRef<HTMLElement>

  private styleElement?: HTMLStyleElement
  private renderer = inject(Renderer2)

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.renderCode()
    this.applyStyles()
  }

  private renderCode(): void {
    const htmlFile = this.gist.file.find(f => f.language === 'html')
    if (htmlFile && htmlFile.code && this.elRenderer) {
      this.elRenderer.nativeElement.innerHTML = htmlFile.code
    }
  }

  private applyStyles(): void {
    const cssFile = this.gist.file.find(f => f.language === 'css')
    if (cssFile && cssFile.code && this.elRenderer) {
      if (this.styleElement) {
        this.renderer.removeChild(this.elRenderer.nativeElement, this.styleElement)
      }

      this.styleElement = this.renderer.createElement('style')
      this.renderer.setAttribute(this.styleElement, 'type', 'text/css')
      const textNode = this.renderer.createText(cssFile.code)
      this.renderer.appendChild(this.styleElement, textNode)
      
      const firstChild = this.elRenderer.nativeElement.firstChild
      if (firstChild) {
        this.renderer.insertBefore(this.elRenderer.nativeElement, this.styleElement, firstChild)
      } else {
        this.renderer.appendChild(this.elRenderer.nativeElement, this.styleElement)
      }
    }
  }

  ngOnDestroy(): void {
    if (this.styleElement && this.elRenderer) {
      this.renderer.removeChild(this.elRenderer.nativeElement, this.styleElement)
    }
  }
}
