import { Schema, model, Document } from "mongoose";
import { ISong, songSchema } from "./song";

export interface IAlbum extends Document {
  title: string;
  description: string;
  songs: ISong[];
}

export const albumSchema = new Schema<IAlbum>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  songs: [songSchema],
});

export const Album = model<IAlbum>("Album", albumSchema);
