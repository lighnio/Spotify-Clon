import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { observable, Observable, of } from 'rxjs';
import * as rawData from '../../../data/tracks.json';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  dataTrackTrending$: Observable<TrackModel[]> = of([])
  dataTrackRandom$: Observable<TrackModel[]> = of([])

  constructor() {
    const {data}: any = (rawData as any).default
    this.dataTrackTrending$ = of(data)

    this.dataTrackRandom$ = new Observable((observer) => {

      const trackExample: TrackModel = {
        _id: 9,
        name: 'Leve',
        album: "Cartel de Santa",
        url: 'http://',
        cover: 'https://www.whosampled.com/static/track_images_200/lr179341_20161118_23200534156.jpg'

      }

      setTimeout(() => {
        observer.next([trackExample])
      }, 3500)
    })
  }
}

