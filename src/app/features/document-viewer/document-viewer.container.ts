import { Component, OnInit, inject, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { DocumentViewerComponent } from './document-viewer.component';
import { DocumentApiService } from '../../core/services/document-api.service';
import { DocumentStateService } from '../../core/services/document-state.service';
import { Annotation, Document } from '../../core/models/document.model';

@Component({
  selector: 'app-document-viewer-container',
  standalone: true,
  imports: [DocumentViewerComponent],
  providers: [DocumentStateService],
  template: `
    @if (document(); as doc) {
      <app-document-viewer
        [document]="doc"
        (annotationsChange)="onAnnotationsChange($event)"
        (save)="onSave()"
      />
    }
  `
})
export class DocumentViewerContainer implements OnInit {
  private readonly api = inject(DocumentApiService);
  private readonly state = inject(DocumentStateService);
  private readonly route = inject(ActivatedRoute);

  readonly document = this.state.document;

  constructor() {
    effect(() => {
      const doc = this.document();
      if (doc) {
        console.log('Document loaded:', doc.name);
      }
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.api.getDocument(id).subscribe((doc: Document) => {
      this.state.setDocument(doc);
    });
  }

  onAnnotationsChange(annotations: Annotation[]): void {
    this.state.updateAnnotations(annotations);
  }

  onSave(): void {
    const document = this.document();
    if (document) {
      console.log({
        ...document,
        savedAt: new Date().toISOString()
      });
    }
  }
}

