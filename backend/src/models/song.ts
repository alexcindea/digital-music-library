import { Schema, model, Document } from "mongoose";

export interface ISong extends Document {
  title: string;
  length: string;
}

export const songSchema = new Schema<ISong>({
  title: { type: String, required: true },
  length: { type: String, required: true },
});

export const Song = model<ISong>("Song", songSchema);
