import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import {mongoosePagination, PaginationOptions } from 'mongoose-paginate-ts';
import Product from '../models/Product';
import User from '../models/User';
import Review from '../models/Review';

const createReview = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, stars, productId, like } = req.body;

    try {
        // Check if the user and product exist in the database by name
        const userExists = await User.findById(userId);
        const productExists = await Product.findById(productId);
    
        if (!userExists || !productExists) {
          return res.status(404).json({ message: 'User or product not found in the database', 
          userExists,
          productExists,
        });
        }
        
    const review = new Review({
        _id: new mongoose.Types.ObjectId(),
        userId: userExists.username,
        stars,
        productId: productExists.name,
        like
    });

    const savedReview = await review.save();
    return res.status(201).json(savedReview);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const readReview = (req: Request, res: Response, next: NextFunction) => {
    const reviewId = req.params.reviewId;

    return Review.findById(reviewId)
        .then((review) => (review ? res.status(200).json(review) : res.status(404).json({ message: 'Review no encontrada' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1; 
    const options: PaginationOptions = {
        page,
        limit: 3
    };
    return Review.paginate(options)
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json({ error }));
};

const updateReview = (req: Request, res: Response, next: NextFunction) => {
    const reviewId = req.params.reviewId;

    return Review.findById(reviewId)
        .then((review) => {
            if (review) {
                review.set(req.body);

                return review
                    .save()
                    .then((updatedReview) => res.status(200).json(updatedReview))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'Review no encontrada' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteReview = (req: Request, res: Response, next: NextFunction) => {
    const reviewId = req.params.reviewId;

    return Review.findByIdAndDelete(reviewId)
        .then((purchase) => (purchase ? res.status(204).json({ message: 'Review eliminada' }) : res.status(404).json({ message: 'Review no encontrada' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createReview, readReview, readAll, updateReview, deleteReview };
