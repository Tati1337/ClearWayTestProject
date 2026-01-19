import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Document } from '../models/document.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DocumentApiService {
  private readonly http = inject(HttpClient);

  getDocument(id: string): Observable<Document> {
    return this.http.get<Document>('assets/mocks/document.mock.json');
  }
}







