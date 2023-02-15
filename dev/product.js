// Nested Mongoose SCHEMAS for MongoDB
import mongoose from 'mongoose';
const { Schema } = mongoose;

const featureSchema = new Schema({
    feature: {
        type: String
    },
    value: {
        type: String
    }
});

const skuSchema = new Schema({
    size: {
        type: String
    },
    quantity: {
        type: Number
    }
});

const photoSchema = new Schema({
    thumbnail_url: {
        type: String
    },
    url: {
        type: String
    }
});

const styleSchema = new Schema({
    style_id: {
        type: Number
    },
    name: {
        type: String
    },
    original_price: {
        type: Number
    },
    sale_price: {
        type: Number
    },
    "default?": {
        type: Boolean
    },
    photo: [photoSchema],
    sku: [skuSchema]
});

const productSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    product_id: {
        type: Number
    },
    name: {
        type: String
    },
    slogan: {
        type: String
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    default_price: {
        type: Number
    },
    feature: [featureSchema],
    style: [styleSchema],
    related: [
        {
            type: Schema.Types.ObjectId
        }
    ]
});

export {
    featureSchema,
    photoSchema,
    productSchema,
    skuSchema,
    styleSchema
};
