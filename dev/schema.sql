-- PostgreSQL Schema'
-- `psql -f schema.sql -p <port_int> -U <user>`

DROP DATABASE IF EXISTS products_api;
CREATE DATABASE products_api;

-- psql equivelent of `USE products_api;`
\c products_api;

-- id,name,slogan,description,category,default_price
CREATE TABLE products (
    id BIGINT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    slogan TEXT,
    description TEXT,
    category TEXT,
    default_price DOUBLE PRECISION,
    PRIMARY KEY (id)
);

-- id,product_id,feature,value
CREATE TABLE features (
    id BIGINT NOT NULL UNIQUE,
    product_id BIGINT NOT NULL,
    feature TEXT NOT NULL,
    value TEXT,
    PRIMARY KEY (id),
    CONSTRAINT foreign_key_features
        FOREIGN KEY (product_id)
        REFERENCES products (id)
);

-- id,productId,name,sale_price,original_price,default_style
CREATE TABLE styles (
    id BIGINT NOT NULL UNIQUE,
    "productId" BIGINT NOT NULL,
    name TEXT NOT NULL,
    sale_price DOUBLE PRECISION,
    original_price DOUBLE PRECISION,
    default_style BOOLEAN,
    PRIMARY KEY (id),
    CONSTRAINT foreign_key_styles
        FOREIGN KEY ("productId")
        REFERENCES products (id)
);

-- id,styleId,url,thumbnail_url
CREATE TABLE photos (
    id BIGINT NOT NULL UNIQUE,
    "styleId" BIGINT NOT NULL,
    thumbnail_url TEXT,
    url TEXT,
    PRIMARY KEY (id),
    CONSTRAINT foreign_key_photos
        FOREIGN KEY ("styleId")
        REFERENCES styles (id)
);

-- id,styleId,size,quantity
CREATE TABLE skus (
    id BIGINT NOT NULL UNIQUE,
    "styleId" BIGINT NOT NULL,
    size TEXT NOT NULL,
    quantity BIGINT,
    PRIMARY KEY (id),
    CONSTRAINT foreign_key_skus
        FOREIGN KEY ("styleId")
        REFERENCES styles (id)
);

-- id,current_product_id,related_product_id
CREATE TABLE relations (
    id BIGINT NOT NULL UNIQUE,
    current_product_id BIGINT NOT NULL,
    related_product_id BIGINT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT foreign_key_relations
        FOREIGN KEY (current_product_id)
        REFERENCES products (id)
);
