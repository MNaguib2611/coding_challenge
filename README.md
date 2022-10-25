a simple CRUD application containing a web portal consuming a service layer using
a monogoDB to store the data.

# 1-The web app

#### Run the Project

simply run

```
./scripts/start.sh
```

to build the `docker-compose` container and run the project

#### Run the unit test

```
./scripts/test.sh
```

#### The crud apis

```
will be found under the /books path
```

# 2-The problem solving challenge

#### using an api post request

1. use the end point `/order`
2. use `file` as the key for the file
3. the 2 output files will be generated in the `output_files` directory
4. the file content will also be returned as response for the `/orders` endpoint

## Technologies used

1. ExpressJs
2. TypeScript
3. MongoDB
4. Jest

## PS

there is a directory called helper_files containing:

1. postman collection file containing all the endpoints
2. input_example.csv
3. order_log00.csv
