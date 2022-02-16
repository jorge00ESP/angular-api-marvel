import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

  public heroes: any[] = [];
  public limit: number = 20;
  public offset: number = Math.floor((Math.random()*1559-this.limit)+1);

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }


  public getHeroes(): void {
    this.heroService.getHeroes(this.offset, this.limit).subscribe((res) => {
      console.log('Respuesta', res);
      this.heroes = res.data.results;
    });
  }

}
