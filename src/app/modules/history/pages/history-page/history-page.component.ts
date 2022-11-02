import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { SearchService } from '@modules/history/services/search.service';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit {
  listResults: TrackModel[] = []

  constructor(private search: SearchService) { }

  ngOnInit(): void {
  }

  receiveData(event: string): void {
    console.log(event);
    this.search.searchTracks$(event)
    .subscribe(({data}) => {
      this.listResults = data
      
    })
  }

}
