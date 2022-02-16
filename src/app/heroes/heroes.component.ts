import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: any[] = [];

  public limit: number = 20;
  public offset: number = 0;
  public page: number=0;

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes(this.offset, this.limit);

  }

  getHeroes(offset: number, limit: number): void {
    this.heroService.getHeroes(offset, limit)
    .subscribe(res => this.heroes = res.data.results);

  }

  public previousPage(){
    if(this.offset>0){
      this.offset-=this.limit;
      this.getHeroes(this.offset, this.limit);
    }
  }

  public nextPage(){
    this.offset+=this.limit;
    this.getHeroes(this.offset, this.limit);
  }

}
