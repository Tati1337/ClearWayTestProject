import { Directive, ElementRef, HostListener, output, inject } from '@angular/core';

@Directive({
  selector: '[appDraggable]',
  standalone: true
})
export class DraggableDirective {
  positionChange = output<{ x: number; y: number }>();

  private readonly el = inject(ElementRef);

  private dragging = false;
  private offsetX = 0;
  private offsetY = 0;
  private parentRect: DOMRect | null = null;

  @HostListener('mousedown', ['$event'])
  start(event: MouseEvent): void {
    event.preventDefault();
    this.dragging = true;
    const elementRect = this.el.nativeElement.getBoundingClientRect();
    const parent = this.el.nativeElement.offsetParent || this.el.nativeElement.parentElement;
    this.parentRect = parent.getBoundingClientRect();
    
    this.offsetX = event.clientX - elementRect.left;
    this.offsetY = event.clientY - elementRect.top;
  }

  @HostListener('document:mousemove', ['$event'])
  move(event: MouseEvent): void {
    if (!this.dragging || !this.parentRect) return;
    
    const x = event.clientX - this.parentRect.left - this.offsetX;
    const y = event.clientY - this.parentRect.top - this.offsetY;
    
    this.positionChange.emit({ x, y });
  }

  @HostListener('document:mouseup')
  stop(): void {
    this.dragging = false;
    this.parentRect = null;
  }
}

