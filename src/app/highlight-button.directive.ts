import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appHighlightButton]'
})
export class HighlightButtonDirective {
  @Input() highlightColor: string = '#4285f4';
  @Input() defaultColor: string = '';
  
  constructor(private el: ElementRef, private renderer: Renderer2) {
    // Store the original background color
    this.defaultColor = this.el.nativeElement.style.backgroundColor || '';
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(this.defaultColor);
  }

  @HostListener('click') onClick() {
    // Add a ripple effect
    this.addRippleEffect();
  }

  private highlight(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color);
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'background-color 0.3s');
  }

  private addRippleEffect() {
    // Create a ripple element
    const ripple = this.renderer.createElement('span');
    this.renderer.addClass(ripple, 'ripple');
    this.renderer.setStyle(ripple, 'position', 'absolute');
    this.renderer.setStyle(ripple, 'border-radius', '50%');
    this.renderer.setStyle(ripple, 'background', 'rgba(255, 255, 255, 0.7)');
    this.renderer.setStyle(ripple, 'transform', 'scale(0)');
    this.renderer.setStyle(ripple, 'animation', 'ripple-effect 0.6s linear');
    this.renderer.setStyle(ripple, 'pointer-events', 'none');
    
    // Calculate position
    const rect = this.el.nativeElement.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    this.renderer.setStyle(ripple, 'width', `${size}px`);
    this.renderer.setStyle(ripple, 'height', `${size}px`);
    this.renderer.setStyle(ripple, 'left', `${rect.width / 2 - size / 2}px`);
    this.renderer.setStyle(ripple, 'top', `${rect.height / 2 - size / 2}px`);
    
    // Add ripple to button
    this.renderer.appendChild(this.el.nativeElement, ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
      this.renderer.removeChild(this.el.nativeElement, ripple);
    }, 600);
  }
}

// Add this to your global styles.css to support the ripple animation
/*
@keyframes ripple-effect {
  to {
    transform: scale(2.5);
    opacity: 0;
  }
}
*/