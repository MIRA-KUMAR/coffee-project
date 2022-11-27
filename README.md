# Coffee Project

## Step 1

- Imported dataset: https://www.kaggle.com/datasets/dimitryzub/walmart-coffee-listings-from-500-stores?resource=download

## Step 2. Docker-compose file installs:

- Mongo
- Elasticsearch

## Step 3 Project Set up

- npm init
- npm install
- docker-compose up -d

## Step 4

- Pre-processing and filtering of the dataset
- Create three Collections - Coffee Types, Coffee Sellers, Coffee Data and store in `MongoDB`

## Step 5

- Using `ElasticSearch` and `Bulk API` for fast retrieval of data
- Using `axios` as HTTPClient on the server side

# Step 6

- Created `CRUD` operations (GET, PUT, POST, DELETE) with mongoose ORM on

        - Coffee Data
        - Coffee Type
        - Coffee Seller
