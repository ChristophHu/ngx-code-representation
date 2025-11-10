import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeRepresentationComponent } from './code-representation.component';

describe('CodeRepresentationComponent', () => {
  let component: CodeRepresentationComponent;
  let fixture: ComponentFixture<CodeRepresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeRepresentationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeRepresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
