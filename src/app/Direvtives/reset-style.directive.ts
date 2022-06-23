import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appResetStyle]',
})
export class ResetStyleDirective implements OnInit {
  @Input() classNames: string = '';
  @HostBinding('style.fontSize') fontSize: string = '1rem';
  @HostBinding('style.borderRadius') borderRadius: string = '5px';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    // this.elementRef.nativeElement.style.backgroundColor = 'yellow';
    // this.elementRef.nativeElement.style.fontWeight = 'bold';
    // this.elementRef.nativeElement.style.borderWidth = '2px';
    this.renderer.setStyle(this.elementRef.nativeElement, 'fontWeight', 'bold');
    this.renderer.setStyle(this.elementRef.nativeElement, 'borderWidth', '2px');
    this.classNames.split(' ').forEach((className: string) => {
      this.renderer.addClass(this.elementRef.nativeElement, className);
    });
  }

  @HostListener('mouseenter') mouseEnter(eventData: Event) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'yellow');
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'border',
      '5px solid yellow'
    );

    this.fontSize = '1.25rem';
    this.borderRadius = '15px';
  }

  @HostListener('mouseleave') mouseLeave(eventData: Event) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'color', '#dc3545');
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'border',
      '2px solid #dc3545'
    );
    this.fontSize = '1rem';
    this.borderRadius = '5px';
  }
}
