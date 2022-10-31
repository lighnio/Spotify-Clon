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

    this.loadAllData()
    this.loadRandomData()

  }

  loadAllData(): void{

     this.trackService.getAllTracks$()
    .subscribe(res => {
      this.tracksTrending = res;
    })

  }

  loadRandomData(): void {
    this.trackService.getAllRandom$()
    .subscribe(res => {
      console.log("random: ", res);
      
      this.tracksRandom = [res];
    })
  }

  ngOnDestroy(): void{
    
  }

}
