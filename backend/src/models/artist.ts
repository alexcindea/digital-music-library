import { Schema, model, Document } from "mongoose";
import { IAlbum, albumSchema } from "./album";

export interface IArtist extends Document {
  name: string;
  albums: IAlbum[];
}

export const artistSchema = new Schema<IArtist>({
  name: { type: String, required: true },
  albums: [albumSchema],
});

export const Artist = model<IArtist>("Artist", artistSchema);
