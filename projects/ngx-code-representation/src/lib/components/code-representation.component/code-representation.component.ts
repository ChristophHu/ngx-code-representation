import { Component, ElementRef, signal, ViewChild, AfterViewInit, Input, QueryList, ViewChildren } from '@angular/core';
import { HighlightAuto } from 'ngx-highlightjs'
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers'
import { file } from '../../models/file.interface';
import { CommonModule } from '@angular/common';
import { CodeFromUrlPipe } from "../../pipes/code-from-url.pipe";

@Component({
  selector: 'code-representation',
  imports: [
    CommonModule,
    HighlightAuto,
    HighlightLineNumbers,
    CodeFromUrlPipe
],
  templateUrl: './code-representation.component.html',
  styleUrls: ['./code-representation.component.sass']
})
export class CodeRepresentationComponent implements AfterViewInit {
  @ViewChild('codeEl') codeElementRef!: ElementRef<HTMLElement>;
  @Input() font_size: string = '16px';
  @Input() files: file[] = [];
  
  copied = signal(false);
  activeTabIndex = signal(0);

  get activeFile(): file | null {
    if (this.files.length === 0) return null
    return this.files[this.activeTabIndex()]
  }

  selectTab(index: number): void {
    if (index === this.activeTabIndex()) return;
    
    // Hide code element and fade out table
    this.codeElementRef.nativeElement.classList.remove('hljs-line-numbers');
    const table = this.codeElementRef.nativeElement.querySelector('.hljs-ln') as HTMLElement;
    if (table) {
      table.style.opacity = '0';
    }
    
    setTimeout(() => {
      this.activeTabIndex.set(index);
      setTimeout(() => {
        if (this.codeElementRef) {
          this.addLineNumbersManually(this.codeElementRef.nativeElement);
          // Fade in new table
          setTimeout(() => {
            const newTable = this.codeElementRef.nativeElement.querySelector('.hljs-ln') as HTMLElement;
            if (newTable) {
              newTable.style.opacity = '1';
            }
          }, 10);
        }
      }, 50);
    }, 150);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.codeElementRef) {
        this.addLineNumbersManually(this.codeElementRef.nativeElement);
        // Fade in initial table
        const table = this.codeElementRef.nativeElement.querySelector('.hljs-ln') as HTMLElement;
        if (table) {
          table.style.opacity = '1';
        }
      }
    }, 200);
  }
  
  copyToClipboard(): void {
    if (this.files.length === 0) return
    // navigator.clipboard.writeText(this.activeFile!.code!).then(() => {
    //   this.copied.set(true);
    //   setTimeout(() => {
    //     this.copied.set(false);
    //   }, 2000);
    // }).catch(err => {
    //   console.error('Failed to copy:', err);
    // });
  }
  
  private addLineNumbersManually(codeElement: HTMLElement): void {
    const highlightedHtml = codeElement.innerHTML;
    const lines = highlightedHtml.split('\n');
    
    let tableHtml = '<table class="hljs-ln" style="font-size: ' + this.font_size + '; opacity: 0;"><tbody>';
    lines.forEach((line, index) => {
      const lineNumber = index + 1;
      tableHtml += `<tr><td class="hljs-ln-line hljs-ln-numbers" style="width: 30px; text-align: right; padding-right: 10px; user-select: none;" data-line-number="${lineNumber}"><div class="hljs-ln-n" data-line-number="${lineNumber}">${lineNumber}</div></td><td class="hljs-ln-line hljs-ln-code" data-line-number="${lineNumber}">${line || ' '}</td></tr>`;
    });
    tableHtml += '</tbody></table>';
    
    codeElement.innerHTML = tableHtml;
    codeElement.classList.add('hljs-line-numbers');
  }
}
