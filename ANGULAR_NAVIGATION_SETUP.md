# Настройка переходов из шаблонов Angular

## Шаги для настройки:

### 1. Установите расширение Angular Language Service в Cursor:
   - Нажмите `Ctrl+Shift+X` (или `Cmd+Shift+X` на Mac)
   - Найдите: **"Angular Language Service"** (от Angular)
   - Установите расширение
   - Или используйте ID: `angular.ng-template`

### 2. Перезапустите Cursor:
   - `Ctrl+Shift+P` → `Developer: Reload Window`

### 3. Перезапустите TypeScript сервер:
   - `Ctrl+Shift+P` → `TypeScript: Restart TS Server`

### 4. Перезапустите Angular Language Service:
   - `Ctrl+Shift+P` → `Angular: Restart Language Service`

### 5. Проверьте работу:
   - Откройте файл `document-viewer.component.html`
   - Наведите курсор на переменную (например, `document()`, `zoom`, `isAddingAnnotation()`)
   - Нажмите `Ctrl+Click` или `F12`
   - Должен произойти переход к определению в `.ts` файле

## Если не работает:

1. **Проверьте панель вывода:**
   - `View` → `Output`
   - Выберите "Angular Language Service" в выпадающем списке
   - Проверьте наличие ошибок

2. **Проверьте установку пакета:**
   ```bash
   npm list @angular/language-service
   ```

3. **Убедитесь, что проект компилируется:**
   ```bash
   npm run build
   ```

4. **Проверьте версию TypeScript:**
   - Должна быть совместима с Angular 20
   - Текущая версия: 5.8.0

## Альтернативный способ:

Если переходы все еще не работают, используйте:
- `Ctrl+Shift+F` - поиск по проекту
- `Ctrl+P` - быстрый переход к файлу
- `Ctrl+T` - поиск символов в проекте
