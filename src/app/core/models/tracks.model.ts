import { ArtistModel } from "./artist.model";

export interface TrackModel {
     name: string;
    album: string;
    cover: string;
    artist?: ArtistModel;
    // duration: number;
    url: string;
    _id: string | number;
}