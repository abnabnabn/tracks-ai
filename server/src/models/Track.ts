import mongoose, { Schema, Document } from 'mongoose';
import { ITrack } from '../types/track.types'; // Import the shared type

// Define the Mongoose document interface, extending the base ITrack and Mongoose Document
export interface ITrackDocument extends ITrack, Document {}

const TrackSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a track title'],
      trim: true,
    },
    artist: {
      type: String,
      required: [true, 'Please add an artist name'],
      trim: true,
    },
    album: {
      type: String,
      required: [true, 'Please add an album name'],
      trim: true,
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt timestamps
  }
);

// Add index for potential searching/sorting optimization
TrackSchema.index({ title: 1, artist: 1, album: 1 });

export default mongoose.model<ITrackDocument>('Track', TrackSchema);