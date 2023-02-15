-- PostgreSQL Schema

DROP DATABASE IF EXISTS products_api;
CREATE DATABASE products_api;

USE products_api;

CREATE TABLE 'products' {
    'id' BIGINT NOT NULL,
    'name' TEXT NOT NULL,
    'slogan' TEXT,
    'description' TEXT,
    'category' TEXT,
    'default_price' DOUBLE PRECISION,
    PRIMARY KEY ('id', 'name')
};

CREATE TABLE 'features' {
    'id' BIGINT NOT NULL,
    'product_id' BIGINT NOT NULL,
    'feature' TEXT NOT NULL,
    'value' TEXT ,
    PRIMARY KEY ('id'),
    CONSTRAINT 'foreign_key_features'
        FOREIGN KEY ('product_id')
        REFERENCES 'products' ('id')
};

CREATE TABLE 'styles' {
    'id' BIGINT NOT NULL,
    'product_id' BIGINT NOT NULL,
    'name' TEXT NOT NULL,
    'original_price' DOUBLE PRECISION,
    'sale_price' DOUBLE PRECISION,
    'default?' BOOLEAN,
    PRIMARY KEY ('id'),
    CONSTRAINT 'foreign_key_styles'
        FOREIGN KEY ('product_id')
        REFERENCES 'products' ('id')
};

CREATE TABLE 'photos' {
    'id' BIGINT NOT NULL,
    'style_id' BIGINT NOT NULL,
    'thumbnail_url' TEXT,
    'url' TEXT,
    PRIMARY KEY ('id'),
    CONSTRAINT 'foreign_key_photos'
        FOREIGN KEY ('style_id')
        REFERENCES 'styles' ('id')
};

CREATE TABLE 'skus' {
    'id' BIGINT NOT NULL,
    'style_id' BIGINT NOT NULL,
    'size' TEXT NOT NULL,
    'quantity' BIGINT,
    PRIMARY KEY ('id'),
    CONSTRAINT 'foreign_key_skus'
        FOREIGN KEY ('style_id')
        REFERENCES 'styles' ('id')
};

CREATE TABLE 'relations' {
    'id' BIGINT NOT NULL,
    'product_id' BIGINT NOT NULL,
    'related_id' BIGINT NOT NULL,
    PRIMARY KEY ('id', 'product_id', 'related_id'),
    CONSTRAINT 'foreign_key_relations'
        FOREIGN KEY ('product_id')
        REFERENCES 'products' ('id')
};
