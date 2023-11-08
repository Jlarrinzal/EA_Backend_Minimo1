import express from 'express';
import controller from '../controllers/Review';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/createreview', ValidateSchema(Schemas.review.create), controller.createReview);
router.get('/readreview/:reviewId', controller.readReview);
router.get('/readall', controller.readAll);
router.put('/updatereview/:reviewId', ValidateSchema(Schemas.review.update), controller.updateReview);
router.delete('/deletereview/:reviewId', controller.deleteReview);

export = router;