import { Component, input, output, inject, signal, computed, ChangeDetectionStrategy, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ZoomControlsComponent } from '../../shared/components/zoom-controls/zoom-controls.component';
import { AnnotationComponent } from '../../shared/components/annotation/annotation.component';
import { Document, Annotation } from '../../core/models/document.model';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

interface AnnotationInputState {
  visible: boolean;
  x: number;
  y: number;
  pageNumber: number;
  text: string;
}

@Component({
  selector: 'app-document-viewer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    ZoomControlsComponent,
    AnnotationComponent,
  ],
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss']
})
export class DocumentViewerComponent {
  document = input.required<Document>();
  annotationsChange = output<Annotation[]>();
  save = output<void>();

  private readonly dialog = inject(MatDialog);


  readonly zoom = signal(100);
  readonly isAddingAnnotation = signal(false);

 
  readonly scaleTransform: Signal<string> = computed(() => {
    return `scale(${this.zoom() / 100})`;
  });
  

  readonly annotationInput = signal<AnnotationInputState>({
    visible: false,
    x: 0,
    y: 0,
    pageNumber: 0,
    text: ''
  });


  readonly annotationsByPage = computed(() => {
    const annotations = this.document().annotations || [];
    const grouped = new Map<number, Annotation[]>();
    
    annotations.forEach(annotation => {
      const pageNum = annotation.pageNumber;
      if (!grouped.has(pageNum)) {
        grouped.set(pageNum, []);
      }
      grouped.get(pageNum)!.push(annotation);
    });
    
    return grouped;
  });

  onPageClick(event: MouseEvent, pageNumber: number): void {
    if (!this.isAddingAnnotation()) return;

    const pageWrapper = event.currentTarget as HTMLElement;
    const rect = pageWrapper.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

  
    this.annotationInput.set({
      visible: true,
      x,
      y,
      pageNumber,
      text: ''
    });
  }

  startAddingAnnotation(): void {
    this.isAddingAnnotation.set(true);
  }

  cancelAddingAnnotation(): void {
    this.isAddingAnnotation.set(false);
    this.annotationInput.update(state => ({
      ...state,
      visible: false,
      text: ''
    }));
  }

  confirmAnnotation(): void {
    const inputState = this.annotationInput();
    const text = inputState.text.trim();
    if (!text) {
      this.cancelAddingAnnotation();
      return;
    }

    const newAnnotation: Annotation = {
      id: Date.now().toString(),
      text,
      x: inputState.x,
      y: inputState.y,
      pageNumber: inputState.pageNumber
    };

    const annotations = [...(this.document().annotations || []), newAnnotation];
    this.annotationsChange.emit(annotations);

    this.cancelAddingAnnotation();
  }

  updateAnnotationInputText(text: string): void {
    this.annotationInput.update(state => ({ ...state, text }));
  }

  onAnnotationInputKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.confirmAnnotation();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.cancelAddingAnnotation();
    }
  }

  onRemoveAnnotation(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'Удаление аннотации',
        message: 'Вы уверены, что хотите удалить эту аннотацию?'
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        const annotations = (this.document().annotations || []).filter((a: Annotation) => a.id !== id);
        this.annotationsChange.emit(annotations);
      }
    });
  }

  onAnnotationMove(annotation: Annotation, position: { x: number; y: number }): void {
    const annotations = (this.document().annotations || []).map((a: Annotation) =>
      a.id === annotation.id ? { ...a, x: position.x, y: position.y } : a
    );
    this.annotationsChange.emit(annotations);
  }

  onSave(): void {
    this.save.emit();
  }

  getAnnotationsForPage(pageNumber: number): Annotation[] {
    return this.annotationsByPage().get(pageNumber) || [];
  }
}

