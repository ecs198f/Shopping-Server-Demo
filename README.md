# Getting Started

1. Follow the project prompt to host the server on repl.it. Make sure you make
   the server public before submitting the project so that we can grade the
   assignment

2. Install server dependencies with `npm install`

3. Run the server with `npm run start` or click the 'Run' button on repl.it

**Do not put any sensitive data on the server**

# Shopping Post Object

| column       | data class type | database type |
| ------------ | --------------- | ------------- |
| id           | Int             | INTEGER       |
| shoppingItem | String          | TEXT          |
| price        | Int             | INTEGER       |
| image        | String          | TEXT          |

# API Endpoints

| request type | endpoint            | returns             |
| ------------ | ------------------- | ------------------- |
| POST         | /images/upload      | ImageUploadResponse |
| GET          | /images/{imagename} | Binary for Image    |
| POST         | /shopping           | Message             |
| GET          | /shopping/all       | List\<Post>         |
| GET          | /shopping/{id}      | Post                |
