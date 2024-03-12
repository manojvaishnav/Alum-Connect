<div style="text-align:center;">
<img src="./Logo.png" alt="Image description" style="width:200px;height:200px;">  
</div>


- It is a robust, user-friendly, and scalable Alumni tracking System and Database
- This system should collect, store, and manage data about alumni and their career paths, with a focus on real-time updates and long-term tracking.






## **Table of Content**

- #### <p> <a href="#tech_Stack"> Tech_Stack </a></p>
- #### <p> <a href="#features"> Features </a></p>
- #### <p> <a href="#env"> Environmental Variables </a></p>
- #### <p> <a href="#rou_ref"> Router References </a></p>
- #### <p> <a href="#color"> Colour Reference </a></p>
- #### <p> <a href="#run"> Run Locally </a></p>
- #### <p> <a href="#demo"> Demo </a></p>

- #### <p> <a href="#future"> Future Development  </a></p>

## <h2 id="tech_stack">Technologies Used </h2>
**Server :** NodeJS, ExpressJS<br>
**Frontend :** ReactJS , ChakraUI , BootStrap <br>
**Database :** MongoDB<br>
**ChatBot :** AI/ML



## <h2 id="features">Features </h2>

1. College Can Register and Approved by Admin
2. Admin can Also Delete the College
3. Student/Alumni  Can Register only on there Respective College with College Details and will be verified by User
4. Alumni can Post various opportunities for students of the College
5. User (student and Alumni of same College ) can Connect with each Other 
6. CHATBOT for Helping the user to Use site 

## <h2 id="rou_ref">Router References </h2>

| User Routes                  | Description                                  |
| ------------------------- | -------------------------------------------- |
| `/register`               | Register the user                            |
| `/login`                  | Login the user                               |
| `/profile`                | Profile of the logged user                   |
| `/fetch-all-posts`        | Fetch all the posts of the logged user       |
| `/update-profile`         | Update the logged user's profile             |
| `/update-experience`      | Update the logged user's experience          |
| `/add-skill`              | Update the logged user's skills              |
| `/add-connection/:_id`    | Adding a new connection by the logged user   |
| `/fetch-clg-all-posts`    | Fetch all the posts of the logged user’s college |
| `/fetch-clg-alumni`       | Fetch all the alumni of the logged user’s college |


<br> <br>

| College routes                        | Description                                      |
| ------------------------------- | ------------------------------------------------ |
| `/clg-register`                 | Register by the colleges                         |
| `/clg-login`                    | Login by the registered college                  |
| `/clg-profile`                  | Profile of the logged college                    |
| `/clg-student-list`             | Fetch all unverified college students            |
| `/clg-alumni-list`              | Fetch all unverified college alumni              |
| `/clg-student-verified-list`    | Fetch all verified college students              |
| `/clg-alumni-verified-list`     | Fetch all verified college alumni                |
| `/update-clg-profile`           | Update college by logged college                 |
| `/clg-posts`                    | Fetch all the posts of the college               |
| `/verify-user-by-clg/:_id`      | Verify the user by the college                   |
| `/delete-user-by-clg/:_id`      | Delete the user by the college                   |


<br> <br>

| Post Routes              | Description                                |
| --------------------- | ------------------------------------------ |
| `/fetch-all-posts`    | Fetch all the posts of the logged user      |
| `/post`               | Make a post by the alumni                  |
| `/get-post/:_id`      | Get 1 post by the id                        |
| `/delete-post/:_id`   | Delete 1 post by the id                    |


<br> <br>
## Admin Routes
<br> <br>

| College Routes                        | Description                                      |
| ------------------------------- | ------------------------------------------------ |
| `/fetch-verify-clg-list`        | Fetch all the verified college list by the admin  |
| `/fetch-unverify-clg-list`      | Fetch all the unverified college list by the admin|
| `/verify-clg/:_id`              | Verify the college by the admin with respect to id|
| `/Delete-clg/:_id`              | Delete the college by the admin with respect to id|


<br> <br>

| User Routes                        | Description                                      |
| ------------------------------- | ------------------------------------------------ |
| `/fetch-verify-alumni-list`     | Fetch all the verified alumnus list by the admin  |
| `/fetch-verify-student-list`    | Fetch all the verified student list by the admin  |
| `/delete-user/:_id`             | Delete the user by the admin                      |


<br> <br>

| Post routes              | Description                                |
| --------------------- | ------------------------------------------ |
| `/allPosts`           | Fetch all the posts by the admin           |
| `/delete-post/:_id`   | Delete post by the admin                   |


<br> <br>


## <h2 id="color">Colour References </h2>

| Color Name  | Hex Code   |
| ------------| ---------- |
| Pink (400)  | `#ED64A6`  |
| Gray (100)  | `#EDF2F7`  |


## <h2 id="run"> Run Locally </h2>

Clone the project

```bash
  git clone https://github/The_deciders.git
```

Go to the project directory

```bash
  cd client
  cd server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start (start at only time)
```

## <h2 id="future"> Future Development </h2>

- Message Feature for connection between user of same college
- College can Add Users by uploading Excel sheet
