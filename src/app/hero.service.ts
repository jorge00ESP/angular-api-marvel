import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class HeroService {

  private heroesUrl = 'http://gateway.marvel.com/v1/public/characters?ts=patata&apikey=ec010c5da759fef72fee5c3af7e53ea0&hash=0cc332c1645f8a2fc9f76c21abed7c7c';  // URL to web api

  constructor(
    public http: HttpClient,
    private messageService: MessageService) { }

  public getHeroes(offset: number, limit: number) {
    let url = this.heroesUrl+'&offset='+offset+'&limit='+limit;

    //console.log(url);
    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): any {
    let url= "http://gateway.marvel.com/v1/public/characters/"+id+"?ts=patata&apikey=ec010c5da759fef72fee5c3af7e53ea0&hash=0cc332c1645f8a2fc9f76c21abed7c7c&offset=0&limit=1";

    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found heroes matching "${term}"`) :
         this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  //////// Save methods //////////

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
