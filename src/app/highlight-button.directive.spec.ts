import { HighlightButtonDirective } from './highlight-button.directive';
import { ElementRef, Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';

describe('HighlightButtonDirective', () => {
  let renderer: Renderer2;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ElementRef,
          useValue: {
            nativeElement: document.createElement('div')
          }
        },
        {
          provide: Renderer2,
          useValue: {
            setStyle: jasmine.createSpy('setStyle'),
            addClass: jasmine.createSpy('addClass'),
            createElement: jasmine.createSpy('createElement').and.returnValue(document.createElement('span')),
            appendChild: jasmine.createSpy('appendChild'),
            removeChild: jasmine.createSpy('removeChild')
          }
        }
      ]
    });
    
    renderer = TestBed.inject(Renderer2);
  });

  it('should create an instance', () => {
    const elementRef = TestBed.inject(ElementRef);
    const directive = new HighlightButtonDirective(elementRef, renderer);
    expect(directive).toBeTruthy();
  });
});
