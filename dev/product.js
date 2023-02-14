var product = new Schema({
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
    feature: new Schema({
        feature: {
            type: String
        },
        value: {
            type: String
        }
    }),
    style: new Schema({
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
        photo: new Schema({
            thumbnail_url: {
                type: String
            },
            url: {
                type: String
            }
        }),
        sku: new Schema({
            size: {
                type: String
            },
            quantity: {
                type: Number
            }
        })
    })
});
