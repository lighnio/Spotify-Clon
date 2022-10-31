import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, mergeMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private readonly URL = environment.api



  constructor(private http:HttpClient) {

  }

  /**
   * 
   * @returns all songs
   */

  getAllTracks$(): Observable<any>{
    return this.http.get(`${this.URL}/tracks`)
    .pipe(
      map(({ data }: any) => {
        console.log(data);
        
        return data;
      })
    )
  }

  /**
   * 
   * @returns all random song
   */
  getAllRandom$(): Observable<any>{
    return this.http.get(`${this.URL}/tracks`)
    .pipe(
      mergeMap( ({data }: any) => data),
      catchError(err => {
        alert('Something Happens in tracks service')
        return of([])
      }
      )
    )
  }

}

