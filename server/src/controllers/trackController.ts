import { Request, Response, NextFunction } from 'express';
import Track, { ITrackDocument } from '../models/Track';
import { SortOrder, SortByField, TrackQueryOptions, PaginatedTracksResponse } from '../types/track.types';

// @desc    Add a new track
// @route   POST /api/tracks
// @access  Public
export const addTrack = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, artist, album } = req.body;

    if (!title || !artist || !album) {
      res.status(400);
      throw new Error('Please provide title, artist, and album');
    }

    const track = await Track.create({ title, artist, album });
    res.status(201).json(track);
  } catch (error) {
    next(error); // Pass error to the error handler middleware
  }
};

// @desc    Get all tracks with filtering, sorting, pagination
// @route   GET /api/tracks
// @access  Public
export const getAllTracks = async (req: Request<{}, {}, {}, TrackQueryOptions>, res: Response<PaginatedTracksResponse | { message: string }>, next: NextFunction) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Filtering
    const filter: any = {};
    if (req.query.title) {
        // Case-insensitive partial match
        filter.title = { $regex: req.query.title, $options: 'i' };
    }
    if (req.query.artist) {
        filter.artist = { $regex: req.query.artist, $options: 'i' };
    }
    if (req.query.album) {
        filter.album = { $regex: req.query.album, $options: 'i' };
    }

    // Sorting
    const sortBy = (req.query.sortBy || 'createdAt') as SortByField;
    const sortOrder = (req.query.sortOrder || 'desc') as SortOrder;
    const sortOptions = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    // Get total count for pagination
    const totalItems = await Track.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limit);

    const tracks = await Track.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      data: tracks.map(doc => doc.toObject({ virtuals: true })), // Use virtuals if you define 'id'
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        pageSize: limit,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single track by ID
// @route   GET /api/tracks/:id
// @access  Public
export const getTrackById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const track = await Track.findById(req.params.id);
        if (!track) {
            res.status(404);
            throw new Error('Track not found');
        }
        res.status(200).json(track);
    } catch (error) {
        next(error);
    }
};


// @desc    Update a track
// @route   PUT /api/tracks/:id
// @access  Public
export const updateTrack = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const track = await Track.findById(req.params.id);

    if (!track) {
      res.status(404);
      throw new Error('Track not found');
    }

    const { title, artist, album } = req.body;
    if (!title || !artist || !album) {
        res.status(400);
        throw new Error('Please provide title, artist, and album');
    }

    const updatedTrack = await Track.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true } // Return updated doc, run schema validators
    );

    res.status(200).json(updatedTrack);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a track
// @route   DELETE /api/tracks/:id
// @access  Public
export const deleteTrack = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const track = await Track.findById(req.params.id);

    if (!track) {
      res.status(404);
      throw new Error('Track not found');
    }

    await track.deleteOne(); // Use deleteOne method on the document

    res.status(200).json({ message: 'Track removed successfully', id: req.params.id });
  } catch (error) {
    next(error);
  }
};