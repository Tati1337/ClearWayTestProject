export interface Page {
  number: number;
  imageUrl: string;
}

export interface Annotation {
  id: string;
  text: string;
  x: number;
  y: number;
  pageNumber: number;
}

export interface Document {
  name: string;
  pages: Page[];
  annotations?: Annotation[];
}



