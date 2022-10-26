import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import * as rawData from '../../../../data/tracks.json';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit {
  mockTrackList: Array<TrackModel> = [
    
  ]

  constructor() { }

  ngOnInit(): void {
    const {data}: any = (rawData as any).default;
    this.mockTrackList = data;

    
  }

}
