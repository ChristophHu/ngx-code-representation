import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxCodeRepresentationService } from './code-representation.service';
import { gist } from '../models/gist.interface';

describe('CodeRepresentationService', () => {
  let service: NgxCodeRepresentationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        NgxCodeRepresentationService,
        provideZonelessChangeDetection()
      ]
    }).compileComponents();
    
    service = TestBed.inject(NgxCodeRepresentationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and emit gist', async () => {
    const mockGist: gist = {
      name: 'test-gist',
      type: 'test',
      version: '1.0.0',
      description: 'Test gist',
      file: [
        {
          filename: 'test.html',
          language: 'html',
          code: '<div>Test</div>'
        }
      ]
    };

    const subscription = service.gist$.subscribe(gist => {
      if (gist) {
        expect(gist.name).toBe('test-gist');
        expect(gist.file.length).toBe(1);
      }
    });

    service.setGist(mockGist);
    
    subscription.unsubscribe();
  });

  it('should set file by index', async () => {
    const mockGist: gist = {
      name: 'test-gist',
      type: 'test',
      version: '1.0.0',
      description: 'Test gist',
      file: [
        {
          filename: 'test1.html',
          language: 'html',
          code: '<div>Test 1</div>'
        },
        {
          filename: 'test2.css',
          language: 'css',
          code: 'div { color: red; }'
        }
      ]
    };

    const subscription = service.file$.subscribe(file => {
      if (file) {
        expect(file.filename).toBe('test2.css');
        expect(file.language).toBe('css');
      }
    });

    service.setGist(mockGist);
    service.setFile(1);
    
    subscription.unsubscribe();
  });

  it('should return null when file index is out of bounds', async () => {
    const mockGist: gist = {
      name: 'test-gist',
      type: 'test',
      version: '1.0.0',
      description: 'Test gist',
      file: [
        {
          filename: 'test.html',
          language: 'html',
          code: '<div>Test</div>'
        }
      ]
    };

    let receivedNull = false;
    const subscription = service.file$.subscribe(file => {
      if (file === null && receivedNull) {
        expect(file).toBeNull();
      }
      if (file === null) {
        receivedNull = true;
      }
    });

    service.setGist(mockGist);
    service.setFile(99);
    
    subscription.unsubscribe();
  });

  it('should have default font size of 16px', async () => {
    const subscription = service.fontsize$.subscribe(size => {
      expect(size).toBe('16px');
    });
    
    subscription.unsubscribe();
  });

  it('should increase font size', async () => {
    let callCount = 0;
    const subscription = service.fontsize$.subscribe(size => {
      if (callCount === 0) {
        expect(size).toBe('16px');
      } else if (callCount === 1) {
        expect(size).toBe('18px');
      } else if (callCount === 2) {
        expect(size).toBe('20px');
      }
      callCount++;
    });

    service.increaseFontSize();
    service.increaseFontSize();
    
    subscription.unsubscribe();
  });

  it('should decrease font size', async () => {
    let callCount = 0;
    const subscription = service.fontsize$.subscribe(size => {
      if (callCount === 0) {
        expect(size).toBe('16px');
      } else if (callCount === 1) {
        expect(size).toBe('14px');
      } else if (callCount === 2) {
        expect(size).toBe('12px');
      }
      callCount++;
    });

    service.decreaseFontSize();
    service.decreaseFontSize();
    
    subscription.unsubscribe();
  });

  it('should handle multiple font size changes', async () => {
    let callCount = 0;
    const subscription = service.fontsize$.subscribe(size => {
      if (callCount === 0) {
        expect(size).toBe('16px');
      } else if (callCount === 3) {
        expect(size).toBe('18px');
      }
      callCount++;
    });

    service.increaseFontSize();
    service.increaseFontSize();
    service.decreaseFontSize();
    
    subscription.unsubscribe();
  });
});
