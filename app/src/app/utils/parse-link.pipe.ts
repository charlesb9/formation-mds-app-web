import { Output } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
let input = "Voici le lien vers la formation : http://google.com";
let output = "Voici le lien vers la formation : <a href='http://google.com'>http://google.com</a>";
@Pipe({
  name: 'parseLink',
  standalone: true
})
export class ParseLinkPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    const splittedArray : string[] = value.split(' ');
    
    let result = splittedArray.map((word)=>{
      return word.includes('https://' || 'http://') ? `<a href="${word}"> ${word} </a>` : word;
    }).join(' ')
    return result;
  }

}
