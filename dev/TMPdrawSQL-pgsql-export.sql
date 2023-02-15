CREATE TABLE "product"(
    "id" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "slogan" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "default_price" DOUBLE PRECISION NOT NULL
);
ALTER TABLE
    "product" ADD PRIMARY KEY("id");
CREATE TABLE "style"(
    "id" BIGINT NOT NULL,
    "product_id" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "original_price" DOUBLE PRECISION NOT NULL,
    "sale_price" DOUBLE PRECISION NOT NULL,
    "default?" BOOLEAN NOT NULL
);
ALTER TABLE
    "style" ADD PRIMARY KEY("id");
CREATE TABLE "sku"(
    "id" BIGINT NOT NULL,
    "style_id" BIGINT NOT NULL,
    "size" VARCHAR(255) CHECK
        ("size" IN('')) NOT NULL,
        "quantity" BIGINT NULL
);
ALTER TABLE
    "sku" ADD PRIMARY KEY("id");
CREATE TABLE "feature"(
    "id" BIGINT NOT NULL,
    "product_id" BIGINT NOT NULL,
    "feature" TEXT NOT NULL,
    "value" TEXT NOT NULL
);
ALTER TABLE
    "feature" ADD PRIMARY KEY("id");
CREATE TABLE "related_product"(
    "product_id" BIGINT NOT NULL,
    "related_id" BIGINT NOT NULL
);
ALTER TABLE
    "related_product" ADD PRIMARY KEY("product_id");
ALTER TABLE
    "related_product" ADD PRIMARY KEY("related_id");
CREATE TABLE "photo"(
    "id" BIGINT NOT NULL,
    "style_id" BIGINT NOT NULL,
    "thumbnail_url" TEXT NULL,
    "url" TEXT NULL
);
ALTER TABLE
    "photo" ADD PRIMARY KEY("id");
CREATE TABLE "TYPE size_enum"(
    "xxs" TEXT NOT NULL,
    "xs" TEXT NOT NULL,
    "s" TEXT NOT NULL,
    "m" TEXT NOT NULL,
    "l" TEXT NOT NULL,
    "xl" TEXT NOT NULL,
    "xxl" TEXT NOT NULL
);
ALTER TABLE
    "style" ADD CONSTRAINT "style_product_id_foreign" FOREIGN KEY("product_id") REFERENCES "product"("id");
ALTER TABLE
    "sku" ADD CONSTRAINT "sku_style_id_foreign" FOREIGN KEY("style_id") REFERENCES "style"("id");
ALTER TABLE
    "feature" ADD CONSTRAINT "feature_product_id_foreign" FOREIGN KEY("product_id") REFERENCES "product"("id");
ALTER TABLE
    "photo" ADD CONSTRAINT "photo_style_id_foreign" FOREIGN KEY("style_id") REFERENCES "style"("id");