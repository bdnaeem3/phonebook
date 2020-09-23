I've made this simple CRUD REST phonebook app using koa.js and mongodb

## What you need to run this project

- NodeJS installed in your Computer
- MongoDB installed in your Computer


## Steps to run this project

- Clone the repository
- change directory to phonebook
- Make a mongoDB database called phonebook. ( if you want to change the name of database, simply use the database name in index.js line no 8. replace the phonebook word with your database name)
- npm i / yarn
- npm start / yarn start
- use Postman to check the API's

You are ready to go :)


## Create Contact [POST]
http://localhost:5000/api/add-contact - send 'name' and 'phone' to store the number and also use valid Bangladeshi mobile number


## Read Contact [GET]
http://localhost:5000/api/search-contact/:phone - send 'phone' as parameter to check details for the number


## Update Contact [PUT]
http://localhost:5000/api/edit-contact/:id - send 'id' as parameter to change the 'phone' or 'name' for that 'id'


## Delete Contact [POST]
http://localhost:5000/api/delete-contact/:phone - send 'phone' as parameter to remove the number as well as name for that number


## All Contacts [GET]
http://localhost:5000/api/all-contacts - to check the listed contacts


Hope everything works fine :)