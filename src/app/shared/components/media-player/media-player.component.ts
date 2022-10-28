import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
   mockCover: TrackModel = {
    cover:'https://i1.sndcdn.com/artworks-000247627460-1hqnjr-t500x500.jpg',
    album:'Valentino Ft MTZ Manuel Turizo (Video Oficial)"',
    name:'Bésame💋',
    url: "http://localhost/track.mp3",
    _id: 1
   }

   listObservers$: Array<Subscription> = []

  constructor(private multimediaService: MultimediaService) { }

  ngOnInit(): void {
    const observer_one$: Subscription = this.multimediaService.callback.subscribe(
      (response: TrackModel) => {
        console.log("Receiving song: ", response);
        
      }
    )

    this.listObservers$ = [observer_one$]
  }

  ngOnDestroy(): void {

    this.listObservers$.forEach(u => u.unsubscribe())
    
  }

}
