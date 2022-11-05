import { state } from '@angular/animations';
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

  public elapsedTime$: BehaviorSubject<string> = new BehaviorSubject("00:00:00")
  public remainingTime$: BehaviorSubject<string> = new BehaviorSubject("-00:00:00")
  
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject("paused")


  constructor() {

    this.audio = new Audio

    this.trackInfo$.subscribe( success => {
      success? this.setAudio(success) : ''
      
    })

    this.listenAllEvents()

   }

   private listenAllEvents(): void{
      this.audio.addEventListener('timeupdate', this.timeCalculate, false)

      this.audio.addEventListener('playing', this.setPlayerStatus, false)
      this.audio.addEventListener('play', this.setPlayerStatus, false)
      this.audio.addEventListener('pause', this.setPlayerStatus, false)
      this.audio.addEventListener('ended', this.setPlayerStatus, false)

   }

   private setPlayerStatus = (state: any) => {
      switch(state.type){
        case 'play':
          this.playerStatus$.next('play')
        break

        case 'playing':
          this.playerStatus$.next('playing')
        break

        case 'ended':
          this.playerStatus$.next('ended')
        break

        default:
          this.playerStatus$.next('paused')
        break
      }
   }

   private timeCalculate = () => {
      const { duration, currentTime } = this.audio;
      this.setElapsedTime(currentTime)
      this.setRemainingTime(currentTime, duration)
   }

   private setElapsedTime(currentTime: number): void {
    let seconds = Math.floor(currentTime % 60)
    let minutes = (Math.floor(currentTime / 60) % 60)
    let hours = (minutes / 60) % 60

    const displaySeconds = (seconds < 10)? `0${seconds}`: seconds
    const displayMinutes = (minutes < 10)? `0${minutes}`: minutes
    const displayHours = (hours < 10)? `0${hours}`: hours

    const displayFormat = `${displayHours}:${displayMinutes}:${displaySeconds}`

    this.elapsedTime$.next(displayFormat)

   }

   private setRemainingTime(currentTime: number, duration: number): void {
    let leftTime = duration - currentTime

    let seconds = Math.floor(leftTime % 60)
    let minutes = (Math.floor(leftTime / 60) % 60)
    let hours = Math.floor(minutes / 60) % 60

    const displaySeconds = (seconds < 10)? `0${seconds}`: seconds
    const displayMinutes = (minutes < 10)? `0${minutes}`: minutes
    const displayHours = (hours < 10)? `0${hours}`: hours

    const displayFormat = `-${displayHours}:${displayMinutes}:${displaySeconds}`

    this.remainingTime$.next(displayFormat)

   }

   public setAudio(track: TrackModel): void {
    console.log(track);

    this.audio.src = track.url

    this.audio.play()
    
   }

   public togglePlayer(): void {
    this.audio.paused? this.audio.play() : this.audio.pause()
   }
}
