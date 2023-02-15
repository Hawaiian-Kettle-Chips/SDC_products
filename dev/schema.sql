
DROP DATABASE IF EXISTS products_api;
CREATE DATABASE products_api;

USE products_api;

CREATE TABLE products {
    'id' BIGINT NOT NULL,
    'name' TEXT NOT NULL,
    'slogan' TEXT NOT NULL,
    'description' TEXT NOT NULL,
    'category' TEXT NOT NULL,
    'default_price' DOUBLE PRECISION NOT NULL,
    PRIMARY KEY (id, 'name')
};

CREATE TABLE features {
    'id' BIGINT NOT NULL,
    'product_id' BIGINT NOT NULL,
    'feature' TEXT NOT NULL,
    'value' TEXT NOT NULL,
    PRIMARY KEY (id)
};

CREATE TABLE styles {
    'id' BIGINT NOT NULL,
    'product_id' BIGINT NOT NULL,
    'name' TEXT NOT NULL,
    'original_price' DOUBLE PRECISION NOT NULL,
    'sale_price' DOUBLE PRECISION NOT NULL,
    'default?' BOOLEAN NOT NULL,
    PRIMARY KEY (id)
};

CREATE TABLE photos {
    'id' BIGINT NOT NULL,
    'style_id' BIGINT NOT NULL,
    'thumbnail_url' TEXT NULL,
    'url' TEXT NULL,
    PRIMARY KEY (id)
};

CREATE TABLE skus {
    'id' BIGINT NOT NULL,
    'style_id' BIGINT NOT NULL,
    'size' TEXT NOT NULL,
    'quantity' BIGINT NOT NULL,
    PRIMARY KEY (id)
};

CREATE TABLE relations {
    'id' BIGINT NOT NULL,
    'product_id' BIGINT NOT NULL,
    'related_id' BIGINT NOT NULL
    PRIMARY KEY (id, 'product_id', 'related_id')
};
