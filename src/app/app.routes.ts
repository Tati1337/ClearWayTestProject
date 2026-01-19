import { Routes } from '@angular/router';


/*Route-level providers контейнер фичи*/
export const routes: Routes = [
    {
        path: 'viewer/:id',
        loadComponent: () =>
          import('./features/document-viewer/document-viewer.container')
            .then(m => m.DocumentViewerContainer)
    },
    {
        path: '',
        redirectTo: '/viewer/1',
        pathMatch: 'full'
      }
];








