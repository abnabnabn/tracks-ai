import express from 'express';
import {
  addTrack,
  getAllTracks,
  getTrackById, // Assuming you might want get by ID as well
  updateTrack,
  deleteTrack,
} from '../controllers/trackController';

const router = express.Router();

// Define routes
router.route('/')
  .post(addTrack) // POST /api/tracks
  .get(getAllTracks); // GET /api/tracks (with query params for filter, sort, page)

router.route('/:id')
  .get(getTrackById) // GET /api/tracks/:id
  .put(updateTrack) // PUT /api/tracks/:id
  .delete(deleteTrack); // DELETE /api/tracks/:id

export default router;