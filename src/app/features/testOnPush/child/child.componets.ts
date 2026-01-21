import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
    <div class="child-container" (click)="onClick()">
      <h3>Child Component (Default Strategy)</h3>
      <div class="content">
        <p>Сообщение: <strong>{{ currentMessage }}</strong></p>
        <p>Количество: <strong>{{ currentCount }}</strong></p>
        <p>Активен: <strong>{{ currentIsActive ? 'Да' : 'Нет' }}</strong></p>
        <p class="click-info">Кликов: <strong>{{ clickCounter }}</strong></p>
      </div>
      <button class="click-button">Кликни меня!</button>
    </div>
  `,
  styles: [`
    .child-container {
      padding: 15px;
      border: 2px solid #ff9800;
      border-radius: 8px;
      margin: 10px;
      background-color: #fff3e0;
    }
    
    h3 {
      margin-top: 0;
      color: #ff9800;
    }
    
    .content {
      margin: 10px 0;
    }
    
    p {
      margin: 8px 0;
      font-size: 14px;
    }
    
    strong {
      color: #e65100;
    }
    
    .click-info {
      margin-top: 15px;
      padding-top: 10px;
      border-top: 1px solid #ff9800;
      font-weight: bold;
    }
    
    .click-button {
      margin-top: 10px;
      padding: 8px 16px;
      background-color: #ff9800;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }
    
    .click-button:hover {
      background-color: #f57c00;
    }
  `]
})
export class ChildComponent implements OnInit {
  // Input свойства с дефолтными значениями
  @Input() message: string = 'Привет из Child!';
  @Input() count: number = 0;
  @Input() isActive: boolean = false;
  
  // Внутренние свойства для изменяемых данных
  currentMessage: string = '';
  currentCount: number = 0;
  currentIsActive: boolean = false;
  clickCounter: number = 0;
  
  constructor() {
    // Инициализация из input значений
    this.currentMessage = this.message || 'Привет из Child!';
    this.currentCount = this.count;
    this.currentIsActive = this.isActive;
  }
  
  ngOnInit(): void {
    // Инициализация после установки input значений
    this.currentMessage = this.message || 'Привет из Child!';
    this.currentCount = this.count;
    this.currentIsActive = this.isActive;
  }
  
  onClick(): void {
    // Увеличиваем счетчик кликов
    this.clickCounter++;
    
    // Меняем сообщение
    const messages = [
      'Кликнули!',
      'Еще раз!',
      'Продолжаем!',
      'Отлично!',
      'Супер!'
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    this.currentMessage = randomMessage;
    
    // Увеличиваем количество
    this.currentCount++;
    
    // Переключаем активность
    this.currentIsActive = !this.currentIsActive;
  }
}
