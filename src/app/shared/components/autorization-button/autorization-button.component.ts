import { Component, inject } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from '@angular/material/dialog';
import { AppAutorizationComponent } from '../../../features/app-autorization/app-autorization.component';

@Component({
    selector:'autorization-button',
    standalone:true,
    template:`<button mat-raised-button (click)="openAutorizeForm()">Авторизоваться</button>`,
    imports: [MatButtonModule]
})
export class AutorizationButtonComponent {
    private readonly dialog = inject(MatDialog);
    
    openAutorizeForm(): void{
        this.dialog.open( AppAutorizationComponent ,{
            width: '500px',
        });
    }
}