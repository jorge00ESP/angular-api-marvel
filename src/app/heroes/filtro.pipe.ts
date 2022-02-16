import { Pipe, PipeTransform } from '@angular/core';
import { HeroesComponent } from './heroes.component';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(hero: any[]): any {

    return hero;

  }

}
