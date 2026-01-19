import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Document, Annotation } from '../models/document.model';

@Injectable()
export class DocumentStateService {
  private readonly documentSubject$ = new BehaviorSubject<Document | null>(null);

  readonly document$ = this.documentSubject$.asObservable();

  setDocument(doc: Document): void {
    this.documentSubject$.next(doc);
  }

  updateAnnotations(annotations: Annotation[]): void {
    const doc = this.documentSubject$.value;
    if (!doc) return;
    this.documentSubject$.next({ ...doc, annotations });
  }
}

