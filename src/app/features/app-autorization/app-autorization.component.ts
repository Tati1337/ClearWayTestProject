import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export const passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const password = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  if (!password || !confirm) return null;
  return password === confirm ? null : { passwordMismatch: true };
};

@Component({
  selector: 'app-autorization',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './app-autorization.component.html',
  styleUrl: './app-autorization.component.scss',
})
export class AppAutorizationComponent {
  private readonly fb = inject(FormBuilder);

  authForm = this.fb.nonNullable.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      agree: [false, Validators.requiredTrue],
    },
    { validators: passwordMatchValidator }
  );

  constructor() {
    this.authForm.controls.agree.valueChanges
      .pipe(startWith(this.authForm.controls.agree.value), takeUntilDestroyed())
      .subscribe((agree) => {
        const phoneCtrl = this.authForm.controls.phone;
        agree ? phoneCtrl.enable({ emitEvent: false }) : phoneCtrl.disable({ emitEvent: false });
      });
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched();
      this.focusFirstInvalidControl();
      return;
    }
    console.log(this.authForm.getRawValue());
  }

  private focusFirstInvalidControl(): void {
    const controls = this.authForm.controls;
  
    const firstInvalid = (Object.keys(controls) as Array<keyof typeof controls>)
      .find((key) => controls[key].invalid);
  
    if (!firstInvalid) return;
  
    const element = document.querySelector(`[formControlName="${firstInvalid}"]`);
    if (element instanceof HTMLElement) {
      element.focus();
    }
  }
}