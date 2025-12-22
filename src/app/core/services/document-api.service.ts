import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Document } from '../models/document.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DocumentApiService {
  constructor(private http: HttpClient) {}

  getDocument(id: string): Observable<Document> {
    return this.http.get<Document>('assets/mocks/document.mock.json');
  }
}



