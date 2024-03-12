import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'errorReplace'
})
export class ErrorReplacePipe implements PipeTransform {


  transform(value: string) {
    switch (value) {
      case 'required':
        return 'Обязательное поле';
      case 'email':
        return 'Неправильный формат почты';
    }
    return value;
  }
}
