import { Injectable, signal } from '@angular/core';
import { Document, Annotation } from '../models/document.model';

@Injectable()
export class DocumentStateService {
  private readonly documentSignal = signal<Document | null>(null);

  readonly document = this.documentSignal.asReadonly();

  setDocument(doc: Document): void {
    this.documentSignal.set(doc);
  }

  updateAnnotations(annotations: Annotation[]): void {
    const doc = this.documentSignal();
    if (!doc) return;
    this.documentSignal.set({ ...doc, annotations });
  }
}

