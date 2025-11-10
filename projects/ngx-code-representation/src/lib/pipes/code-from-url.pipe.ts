import { Pipe, PipeTransform, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError } from 'rxjs';

@Pipe({
  name: 'codeFromUrl'
})
export class CodeFromUrlPipe implements PipeTransform {
  private http = inject(HttpClient);

  transform(url: string): Observable<string> {
    if (!url) {
      return of('');
    }

    return this.http.get(url, { responseType: 'text' }).pipe(
      catchError((error) => {
        console.error('Failed to load code from URL:', error);
        return of('// Error loading file');
      })
    );
  }
}
