import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  callback: EventEmitter<any> = new EventEmitter<any>()

  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined)

  public audio!: HTMLAudioElement

  constructor() {

    this.audio = new Audio

    this.trackInfo$.subscribe( success => {
      success? this.setAudio(success) : ''
      
    })

   }

   private listenAllEvents(): void{

   }

   public setAudio(track: TrackModel): void {
    console.log(track);

    this.audio.src = track.url

    this.audio.play()
    
   }
}
