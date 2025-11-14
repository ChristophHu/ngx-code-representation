import { Injectable, signal } from '@angular/core';
import { HighlightLoader } from 'ngx-highlightjs';

@Injectable({
  providedIn: 'root',
})
export class NgxCodeThemesService {
  currentTheme = signal<string | null>(null)
  themes: string[] = []
  default_theme = 'assets/style/github-dark.css'

  constructor(private hlLoader: HighlightLoader) {}

  setHighlightTheme(path: string): void {
    this.hlLoader.setTheme(path)
    this.currentTheme.set(path)
  }

  getHighlightTheme(): string | null {
    return this.currentTheme()
  }

  toggleHighlightTheme() {
    const current = this.currentTheme()
    const currentIndex = this.themes.indexOf(current || '')
    const nextIndex = (currentIndex + 1) % this.themes.length
    const nextTheme = this.themes[nextIndex]
    this.setHighlightTheme(nextTheme)

  }

  setThemes(themes: string[]): void {
    this.themes = themes
  }
}
