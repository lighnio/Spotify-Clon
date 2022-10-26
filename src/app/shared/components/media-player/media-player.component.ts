import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit {
   mockCover: any = {
    cover:'https://i1.sndcdn.com/artworks-000247627460-1hqnjr-t500x500.jpg',
    album:'Valentino Ft MTZ Manuel Turizo (Video Oficial)"',
    name:'Bésame💋',

   }

  constructor() { }

  ngOnInit(): void {
  }

}
