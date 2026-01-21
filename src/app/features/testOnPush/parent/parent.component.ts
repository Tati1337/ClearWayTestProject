import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildComponent } from '../child/child.componets';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [CommonModule, ChildComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="parent-container">
      <h2>Parent Component (OnPush)</h2>
      <div class="content">
        <p>Имя: <strong>{{ name }}</strong></p>
        <p>Возраст: <strong>{{ age }}</strong></p>
        <p>Email: <strong>{{ email }}</strong></p>
      </div>

      <app-child></app-child>
    </div>
  `,
  styles: [`
    .parent-container {
      padding: 20px;
      border: 2px solid #4caf50;
      border-radius: 8px;
      margin: 20px;
      background-color: #f1f8f4;
    }
    
    h2 {
      margin-top: 0;
      color: #4caf50;
    }
    
    .content {
      margin: 15px 0;
    }
    
    p {
      margin: 10px 0;
      font-size: 16px;
    }
    
    strong {
      color: #2e7d32;
    }
  `]
})
export class ParentComponent {
  // Input свойства с дефолтными значениями
  @Input() name: string = 'Гость';
  @Input() age: number = 0;
  @Input() email: string = 'example@mail.com';
}
