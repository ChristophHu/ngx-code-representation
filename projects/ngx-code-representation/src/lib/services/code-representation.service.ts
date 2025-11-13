import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { gist } from '../models/gist.interface';
import { file } from '../models/file.interface';

@Injectable({
  providedIn: 'root',
})
export class CodeRepresentationService {
  private _gist = new BehaviorSubject<gist | null>(null)
  gist$: Observable<gist | null> = this._gist.asObservable()

  private _file = new BehaviorSubject<file | null>(null)
  file$: Observable<file | null> = this._file.asObservable()

  private _fontsize = new BehaviorSubject<string>('16px')
  fontsize$: Observable<string> = this._fontsize.asObservable()

  constructor() {}

  public setGist(gist: gist): void {
    this._gist.next(gist)
  }

  public setFile(index: number): void {
    this._file.next(this._gist.value?.file[index] || null)
  }

  public increaseFontSize(): void {
    const currentSize = parseInt(this._fontsize.value)
    this._fontsize.next(`${currentSize + 2}px`)
  }
  
  public decreaseFontSize(): void {
    const currentSize = parseInt(this._fontsize.value)
    this._fontsize.next(`${currentSize - 2}px`)
  }
}
