-- psql -d products_api -a -f injectData.sql -U postgres

\c products_api;

\copy products from 'raw_data/product.csv' delimiter ',' csv header;
\copy features from 'raw_data/features.csv' delimiter ',' csv header;

-- NULL AS is for converting sting in CSV to a DOUBLE
\copy styles from 'raw_data/styles.csv' delimiter ',' csv NULL AS 'null' header;
\copy skus from 'raw_data/skus.csv' delimiter ',' csv header;

-- This will fail due to the hardcoded and unchangeable 1gb file size limit for copy. Rude!
\copy photos from 'raw_data/photos.csv' delimiter ',' csv header;
\copy relations from 'raw_data/related.csv' delimiter ',' csv header;
