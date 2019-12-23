# Demo - Node_Api

## About the Application
* It is NodeJS application sample application, which exposes the different api.

## Technologies Used
* NodeJS
* KoaJS
* PM2 (Load Balancer)

## NodeJs environment setup
* Install Node.js (8.6 or higher)
* Execute the command "npm install -g pm2 forever" (don't install it on project level or package.json)

## How to run the application
* Execute the command "npm install" from install the application folder.
* Execute the command "npm run api" once npm install completed.
* Use Postman to test APIs
    * Postman is a REST client exploration utility and is a must-have for API testing and development.    
    * Download and install the postman client - https://www.getpostman.com/apps
    * You can refer the sample req/res postman screenshots in "<<application_folter>>/screenshots"

## API Files
* api.js - Entry point for API or starting execution point for process
* /apis/* - API endpoints
  * *-route.js - Maps the request path to the nodejs method
  * *-handler.js - Actual handler methods


## API Details
* Contacts APIs
    * GET /contacts
        * Todo 1: Understand logic, test this api and review response
        * Todo 2: Instead of returning all fields, 
          * API should only return first_name, last_name, company, email fields and also omit field which is null
          *      eg: [{first_name: "fname", last_name: null, email:"test@test.test","company":"company name","address_line1":"add1",....},...
                               should return [{first_name: "fname", email:"test@test.test","company":"company name"},....]
          
    * GET /contacts/allisterdaniels
        * Todo 1: Understand logic, test this api and review response
        * Todo 2: Spend few mins with https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html
        in order to understand ElasticSearch Bool Query 
    * GET /contacts/:docid
        * Todo 1: Understand logic, test this api (/contacts/405682d689454c639a89487b2dc9685e) and review response
        * Todo 2: test /contacts/test, update logic so API will return actual error with status which received from https://dev.jobnimbus.com/api1/contacts/docid api
    * GET /contactsbug
        * Todo 1: Understand logic, test this api, update logic, so this API will return actual error with status which received from https://dev.jobnimbus.com/api1/contacts api
* Bugs APIs 
    * Todo: APIs should return "There was an error processing your request." with status code 500 if there is any error and track these errors somewhere (implement it centrally if possible)
    * POST /bug1
    * POST /bug2
    * POST /bug3
* Todo: Jobs APIs
    * GET /jobs
        * API should only return name, number, status_name fields and also omit field which is null (similar to Get /contacts API)                               
    * GET /jobs/westgate
        * api is similar to /contacts/allisterdaniels but this should execute for job and where name field value is "westgate"
    * GET /jobs/search
        * api is similar to /jobs/westgate but make title querystring parameter and apply into logic (follow rest approach)
    * GET /jobs/:docid
        * /jobs/lefei (should work similar to /contacts/405682d689454c639a89487b2dc9685e)
        * /jobs/test (should work similar to /contacts/test)
* Todo: GET /unzip API
    * unzip /zip/test.zip and return list of files in response    
    * research libraries (adm-zip, unzip, zlib), pick one, and then be prepared to tell us why you chose it over the others.
