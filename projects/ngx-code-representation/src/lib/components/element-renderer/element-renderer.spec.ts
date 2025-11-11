import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementRenderer } from './element-renderer';

describe('ElementRenderer', () => {
  let component: ElementRenderer;
  let fixture: ComponentFixture<ElementRenderer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElementRenderer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
