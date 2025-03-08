import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'icon', standalone: true 
})
export class IconPipe implements PipeTransform {
  transform(value: string): string {
    // נבדוק אם המילה 'הוספה' מופיעה, אם כן נחזיר אייקון של הוספה
    if (value.includes('add')) {
      return 'add'; // אייקון הוספה
    } 
    // נבדוק אם המילה 'הסרה' מופיעה, אם כן נחזיר אייקון של הסרה
    else if (value.includes('remove')) {
      return 'remove'; 
    }
    return ''; 
  }
}
