import mongoose, { Schema, ObjectId, Document } from 'mongoose';
import {mongoosePagination, Pagination} from 'mongoose-paginate-ts';

export interface IReview {
    userId: string;
    stars: number;
    productId: string; 
    like: boolean; 
}

export interface IReviewModel extends IReview, Document {}

const ReviewSchema: Schema = new Schema(
    {
        userId: {  type: String, ref: 'User', required: true },
        stars: { type: Number, required: true },
        productId: { type: String, ref: 'Product', required: true },
        like: { type: Boolean, required: true },
    },
    {
        versionKey: false,
        timestamps: true
    }
);

ReviewSchema.plugin(mongoosePagination);
export default mongoose.model<IReviewModel, Pagination<IReviewModel>>('Review', ReviewSchema);
