import { Component } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector:'autorization-button',
    standalone:true,
    template:`<button mat-raised-button (click)="openAutorizeForm()">Авторизоваться</button>`,
    imports: [MatButtonModule]
})
export class AutorizationButtonComponent {
    
    openAutorizeForm(): void{
        // openAuth.set(true)
    }
}