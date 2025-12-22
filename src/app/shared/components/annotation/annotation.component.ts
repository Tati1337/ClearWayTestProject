import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DraggableDirective } from '../../directives/draggable.directive';
import { Annotation } from '../../../core/models/document.model';

@Component({
  selector: 'app-annotation',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    DraggableDirective
  ],
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.scss']
})
export class AnnotationComponent {
  annotation = input.required<Annotation>();
  remove = output<string>();
  positionChange = output<{ x: number; y: number }>();

  move(position: { x: number; y: number }): void {
    this.positionChange.emit(position);
  }

  onRemove(event: MouseEvent): void {
    event.stopPropagation();
    this.remove.emit(this.annotation().id);
  }
}

