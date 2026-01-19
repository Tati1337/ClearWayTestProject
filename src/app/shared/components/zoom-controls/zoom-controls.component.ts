import { Component, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-zoom-controls',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  template: `
    <span>{{ zoom() }}%</span>
    <button mat-icon-button (click)="decrease()" [disabled]="zoom() <= minZoom">
      <mat-icon>remove</mat-icon>
    </button>
    <button mat-icon-button (click)="increase()" [disabled]="zoom() >= maxZoom">
      <mat-icon>add</mat-icon>
    </button>
  `,
  styles: [`
    :host {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    span {
      min-width: 50px;
      text-align: center;
    }
  `]
})
export class ZoomControlsComponent {
  readonly zoom = model.required<number>();

  readonly minZoom = 50;
  readonly maxZoom = 200;

  increase(): void {
    const newZoom = Math.min(this.zoom() + 10, this.maxZoom);
    this.zoom.set(newZoom);
  }

  decrease(): void {
    const newZoom = Math.max(this.zoom() - 10, this.minZoom);
    this.zoom.set(newZoom);
  }
}

