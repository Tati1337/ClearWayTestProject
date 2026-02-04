import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAnchor } from "@angular/material/button";

interface AutorizeFormValue{
  email: FormControl<string>,
  password: FormControl<string>,
  confirmPassword: FormControl<string>,
  address:  FormGroup<{
    street: FormControl<string> ,
    city: FormControl<string>,
  }>,
  rememberMe: FormControl<boolean>,
} 

@Component({
  selector: 'app-autorization',
  standalone: true,
  imports: [ReactiveFormsModule, MatAnchor],
  templateUrl: './app-autorization.component.html',
  styleUrl: './app-autorization.component.scss',
})
export class AppAutorizationComponent {
    authForm = new FormGroup<AutorizeFormValue>({
      email: new FormControl('', {nonNullable:true} ),
      password: new FormControl('',{nonNullable:true}),
      confirmPassword: new FormControl('',{nonNullable:true}),
      address: new FormGroup({
        street: new FormControl('',{nonNullable:true}),
        city: new FormControl('',{nonNullable:true}),
      }),
      rememberMe: new FormControl(false, {nonNullable:true})
    })

    onUpdate():void{
      this.authForm.patchValue({
          email:"111",
          password:'2222',
          rememberMe:false
      })
    };
    onSubmit():void{
      console.log(this.authForm.value)
    };
}
