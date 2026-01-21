import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { take } from 'rxjs/operators';
import { DocumentViewerComponent } from './document-viewer.component';
import { DocumentApiService } from '../../core/services/document-api.service';
import { DocumentStateService } from '../../core/services/document-state.service';
import { Annotation, Document } from '../../core/models/document.model';
import { ParentComponent } from '../testOnPush/parent/parent.component';

@Component({
  selector: 'app-document-viewer-container',
  standalone: true,
  imports: [AsyncPipe, DocumentViewerComponent, ParentComponent],
  providers: [DocumentStateService],
  template: `
  <app-parent></app-parent>
    @if (document$ | async; as document) {
      <app-document-viewer
        [document]="document"
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

  readonly document$ = this.state.document$;

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
    this.state.document$.pipe(take(1)).subscribe((document: Document | null) => {
      if (document) {
        console.log({
          ...document,
          savedAt: new Date().toISOString()
        });
      }
    });
  }
}

