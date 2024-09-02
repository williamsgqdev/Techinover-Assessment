## TechinOver Assessment

### Overview

Simple e-commerce system api for products and users management.


## Runnig project locally

1. Clone this project locally .

2.  Create .env file and add :
``` 
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=root
DB_PASSWORD=password
DB_NAME=techinoverDb
JWT_SECRET=test

```
NOTE: use your own Database credentials

3. Run `npm install`.

4. Run `npm run start:dev`.

## Running project using docker-compose

1. Clone this project locally .

2. Create .env file and add :

```
PORT=3000
DB_HOST=db
DB_PORT=5432
DB_USER=root
DB_PASSWORD=password
DB_NAME=techinoverDb
JWT_SECRET=test

```

2. Run `docker compose up` OR `docker compose up -d` to run in detached mode .