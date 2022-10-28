import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model'
import { TrackService } from '@modules/tracks/services/track.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit, OnDestroy{
  tracksTrending: Array<TrackModel> = []
  tracksRandom: Array<TrackModel> = []

  listObservers$: Array<Subscription> = []

  constructor(private trackService: TrackService) { }

  ngOnInit(): void {
    const observer1$ = this.trackService.dataTrackTrending$
    .subscribe(response => {
      this.tracksTrending = response
      console.log('Canciones trending', response);
    })

    const observer2$ = this.trackService.dataTrackRandom$
    .subscribe(response => {
      this.tracksRandom = [...this.tracksRandom, ...response]
      console.log('Canciones random', response);
    })

    this.listObservers$ = [observer1$]
  }

  ngOnDestroy(): void{
    this.listObservers$.forEach(u => u.unsubscribe())
  }

}
