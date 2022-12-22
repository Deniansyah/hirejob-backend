# Peworld

![image](https://user-images.githubusercontent.com/86812576/208875608-24029a82-867b-43f5-9266-480c13656a92.png)

![image](https://user-images.githubusercontent.com/86812576/208875852-8dee398c-88f6-4898-89cf-c0ec0ab581e3.png)

## About The Project

Web application that connect jobseeker and recruiter to help find their dream job and talent for company

## Feature
- Jobseeker profile
- Jobseeker experiences
- Jobseeker portofolio
- Hiring page
- Company profile
- Chat between jobseeker and company
- And more

## Built with

- [Frontend](https://github.com/rioprayoga23/fw12-frontend-collab)
1. [React js ](https://reactjs.org/)
2. [Tailwind](https://tailwindcss.com/)

- [Backend](https://github.com/rioprayoga23/fw12-backend-collab)
1. [Node js](https://nodejs.org/en/)
2. [Express js](https://expressjs.com/en/starter/installing.html)

### Requirements
1. [Node js](https://nodejs.org/en/)
2. Backenda [API ](fw12-backend-collab.vercel.app)
3. NPM Modules

### How to run application?
1. Clone this project to your local computer
2. Open this project in your code editor and install few modules
3. type `npm i`
4. type `npm i redux`
5. type `npm i react-router-dom`
6. type `npm i axios`
7. to start this project type `npm start` in [fw12-frontend-collab](https://github.com/rioprayoga23/fw12-frontend-collab)
### Acknowledgements
- [Redux](https://redux.js.org/)
- [Axios](https://axios-http.com/docs/intro)
- argon
- [jwt token](https://www.npmjs.com/package/jsonwebtoken)

## What's in Backend?
### CRUD database for:
- users
- profile
- portofolio
- company
- contacts
- purposes
- userskills

### Main Endpoint

|                              URL                         | Method | Description |
| -------------------------------------------------------- |:------:| --------------------------------------------:|
| fw12-backend-collab.vercel.app/auth/login                | POST  |                                        LOGIN |
| fw12-backend-collab.vercel.app/auth/register-employe     | POST  |                             REGISTER EMPLOYE |
| fw12-backend-collab.vercel.app/auth/register-recruiter   | POST  |                           REGISTER RECRUITER |
| fw12-backend-collab.vercel.app/profile/:id               | GET   |                 GET PROFILE BY ID WHEN CLICK |
| fw12-backend-collab.vercel.app/profile/portofolio/:id    | GET   |                       GET PORTOFOLIO PROFILE |
| fw12-backend-collab.vercel.app/profile/experiences/:id   | GET   |                       GET EXPERINCES PROFILE |
| fw12-backend-collab.vercel.app/profile/myAccount         | GET   |       GET PROFILE BY USER LOGIN (With token) |
| fw12-backend-collab.vercel.app/profile                   | PATCH |          UPDATE PROFILE EMPLOYE (With token) |
| fw12-backend-collab.vercel.app/profile/skills            | POST  |  ADD SKILL IN EDIT PROFILE PAGE (With token) |
| /users                                                   | GET   |                               READ ALL USERS |
| /users/skill                                             | GET   |                           READ USER BY SKILL |
| /users/company/:id                                       | GET   |                     READ COMPANY BY USERS ID |
| /users/:id                                                | GET   |                                  READ USERS |
| /users                                                   | POST  |                                  CREATE USER |
| /users/:id                                               | PATCH |                                  UPDATE USER |
| /users/:id                                               | DELETE|                                  DELETE USER |
| /userSkill                                               | GET   |                         READ ALL USER SKILLS |
| /userSkill/:id                                           | GET   |                             READ USERS SKILL |
| /uuserSkill                                              | POST  |                            CREATE USER SKILL |
| /userSkill/:id                                           | PATCH |                            UPDATE USER SKILL |
| /userSkill/:id                                           | DELETE|                            DELETE USER SKILL |
| /skills                                                  | GET   |                              READ ALL SKILLS |
| /skills/:id                                              | GET   |                                   READ SKILL |
| /skills                                                  | POST  |                                 CREATE SKILL |
| /skills/:id                                              | PATCH |                                 UPDATE SKILL |
| /skills/:id                                              | DELETE|                                 DELETE SKILL |
| /resetPassword                                           | GET   |                      READ ALL RESET PASSWORD |
| /resetPassword/:id                                       | GET   |                          READ RESET PASSWORD |
| /resetPassword                                           | POST  |                        CREATE RESET PASSWORD |
| /resetPassword/:id                                       | PATCH |                        UPDATE RESET PASSWORD |
| /resetPassword/:id                                       | DELETE|                        DELETE RESET PASSWORD |
| /purpose                                                 | GET   |                             READ ALL PURPOSE |
| /purpose/:id                                             | GET   |                                 READ PURPOSE |
| /purpose                                                 | POST  |                               CREATE PURPOSE |
| /purpose/:id                                             | PATCH |                               UPDATE PURPOSE |
| /purpose/:id                                             | DELETE|                               DELETE PURPOSE |
| /profile/myAccount                                       | GET   |                        READ PROFILE BY TOKEN |
| /profile/experiences/:id                                 | GET   |                              READ EXPERIENCE |
| /profile/portofolio/:id                                  | GET  |                               READ PORTOFOLIO |
| /profile/skills                                          | GET |                           READ SKILLS BY TOKEN |
| /profile/:id                                             | GET   |                                 READ PROFILE |
| /profile                                                 | PATCH |                              UPDATE EMPLOYEE |
| /profile/skills                                          | POST |                                 UPDATE SKILLS |
| /portofolio                                              | GET   |                         READ ALL PORTOFOLIOS |
| /portofolio/:id                                          | GET   |                              READ PORTOFOLIO |
| /portofolio                                              | POST  |                            CREATE PORTOFOLIO |
| /portofolio/:id                                          | PATCH |                            UPDATE PORTOFOLIO |
| /portofolio/:id                                          | DELETE|                            DELETE PORTOFOLIO |
| /experiences                                             | GET   |                         READ ALL EXPERIENCES |
| /experiences/:id                                         | GET   |                              READ EXPERIENCE |
| /experiences                                             | POST  |                            CREATE EXPERIENCE |
| /experiences/:id                                         | PATCH |                            UPDATE EXPERIENCE |
| /experiences/:id                                         | DELETE|                            DELETE EXPERIENCE |
| /contacts                                                | GET   |                            READ ALL CONTACTS |
| /contacts/:id                                            | GET   |                                 READ CONTACT |
| /contacts                                                | POST  |                               CREATE CONTACT |
| /contacts/:id                                            | PATCH |                               UPDATE CONTACT |
| /contacts/:id                                            | DELETE|                               DELETE CONTACT |
| /company                                                 | GET   |                           READ ALL COMPANIES |
| /company/:id                                             | GET   |                                 READ COMPANY |
| /company                                                 | POST  |                               CREATE COMPANY |
| /company/:id                                             | PATCH |                               UPDATE COMPANY |
| /company/:id                                             | DELETE|                               DELETE COMPANY |




