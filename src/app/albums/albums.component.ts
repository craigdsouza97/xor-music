import { Component, OnInit } from '@angular/core';
import { SongService } from '../services/song.service';


@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css'],
})
export class AlbumsComponent implements OnInit {
  constructor(private songService:SongService) { }
  show(album)
  {
    this.songService.albumClicked(album)
  }
  ngOnInit() {
  }

}
