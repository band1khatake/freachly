# freachly
freachly home task

Task:
Given are two data sets that are related to each other. Implement a microservice which
allows CRUD operations and the retrieval of basic statistical data.
- Implement both models with Mongoose. Try to be as precise as possible when
  defining your model. Consider what fields are required or have to have unique
  values. Think about if and which Indexes make sense.
- Allow CRUD operations for both entities.
- There should be the ability to retrieve all comments for a specific user.
- Comments should also have an additional endpoint to retrieve a ranked list of the top
  10 hashtags and top 10 mentions, and how often they were used. Ideally this is done
  with the aggregation framework from mongo. 
  
There is no need for any sort of authentication. Unless you really want to implement it,
  extracting the hashtags and mentions from the comment text is also a little out of the scope
  of this coding challenge.
- This should be done using Node.js, Express and Mongoose. Please do not use a
  serverless architecture.
- The service should be as “production ready” as possible
- Unit tests are not needed
- It is okay if the documents have an _id which is different from the id as it simplifies
  things a lot.
- No script for populating the database is needed


Installation and Usage
----------------------

First install [Node.js](http://nodejs.org/) and [MongoDB](https://www.mongodb.org/downloads). Then run:

```sh
npm install
```
The project requires mongoDB connection uri to be set via env variable ```MONGO_URI```. 

To run the project use
```sh
 MONGO_URI="<connection uri>" npm run start
```
