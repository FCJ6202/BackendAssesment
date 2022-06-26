# BackendAssesment
Requirement :- you have npm tool in your computer, if you did not have this please install before fork. <br/>
Note :- I upload a Thunderclient collection also if you have thunderclient than simply import that collection in thunderclient and you will get all the endpoint which I was created for this project 

<br/>step 1:- After fork, You open that location in terminal and type command <b>npm install</b> <br/>
<br/>step 2: After completing installing you have to start a server for using the endpoint, Therfore type command <b> nodemon index.js </b> <br/>
<br/>step 3 : open postman or thunderclient to check the endpoint. <br/>
<br/>step 4 : first, you must authenticate yourself using sign up endpoint which is <b>http://localhost:4000/u/auth/create</b>. The method of this endpint is post and body of this endpoint accept four things which is :- username,name,email,password. Where username and email is always unique for a User<br/>
  for example :-  <br/>   "username" : "KHUS123",<br/>
                     "name" : "Khushi Rajak",<br/>
                     "email" : "rajakkhushi@gmail.com",<br/>
                     "password" : "123456"<br/>
<br/>step 5 : But, If you signup before than you have to use Login endpoint which is <b>http://localhost:4000/u/auth/login</b>. The method of this endpint is post and body of this endpoint accept four things which is :- email,password <br/>
  for example :-  <br/> "email" : "rajakkhushi@gmail.com",<br/>
                     "password" : "123456"<br/>
 
 <br/>step 6 : If you want to create a repository than you must authenticate yourself, because after authenticate you will get a token in response and this token you add into the header.<br/>
For repoCreate ending point is :- <b>http://localhost:4000/u/repo/createRepo</b><br/>
Method :- Post <br/>
header of this endpoint is :- <br/> auth-token: \<token>/<br/> 
                            Content-Type: application/json<br/>
eg:- auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoiS0hVUzEyMyJ9LCJpYXQiOjE2NTYwOTg5NDJ9.hUTkYM-V2l2hLcgj_MaDbEKAj87KLMMwmNBOiZW5nWI <br/>
     Content-Type: application/json<br/>

body of this endpoint is :- repoName,repoDescription,visibility. if you doesn't give visibility than it default take value false which means repo is private.<br/>
  eg:- "repoName" : "KhushiBackend",<br/>
    "repoDescription" : "This is a Again Backend project", <br/>
    "visibility" : true <br/>
  
<br/>step 7:- If want to see all Repo of the user than you have in a two condition if you are a authecated user and want to see himself repo than you see private as well as public repo but you want to see another user repo than you not able to see that private repo, you will only public repo.
<br/>See Repo of a user done by this endpoint which is :- <ins>http://localhost:4000/u/auth/repodata/<username\></ins>, In position of username you have to put username which all repo you want to see <br/>
  Method :- Get <br/>
 <br/>if you don't put auth-token in the header than this end point think that you doesn't authenticated yourself, than you will not able to see any private repo of the user.<br/>
If you want to put header than header of this endpoint like these :- <br/> auth-token: <token\>(You will get token when you authenticate himself using SignUP or Login endpoint) <br/>
                                                                      Content-Type: application/json<br/>
  eg:- auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoiS0hVUzEyMyJ9LCJpYXQiOjE2NTYwOTg5NDJ9.hUTkYM-V2l2hLcgj_MaDbEKAj87KLMMwmNBOiZW5nWI <br/>
     Content-Type: application/json<br/>
<br/>
  
<br/>step 8 :- For Delete Repository :- <br/>
  Note :- You have to delete own repository not another user repository. So, you have to authenticate himself than you have power to delete a own repository. If violet any rule this endpoint gives you <b><u>invalid request<u/></b> <br/> 
  Endpoint :- <ins>http://localhost:4000/u/repo/delete/<repoName\></ins> , In position of repoName you have to put repository Name which repository you want to delete. <br/>
  Method :- Delete <br/>
  Header :- <br/> auth-token: <token\> (You will get token when you authenticate himself using SignUP or Login endpoint) <br/>
            Content-Type: application/json<br/>
  eg:- auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoiS0hVUzEyMyJ9LCJpYXQiOjE2NTYwOTg5NDJ9.hUTkYM-V2l2hLcgj_MaDbEKAj87KLMMwmNBOiZW5nWI <br/>
     Content-Type: application/json<br/>
  
  <br/>step 9:- For Update Repository :- <br/>
  Note :- You have to Update own repository not another user repository. So, you have to authenticate himself than you have power to Update a own repository. If violet any rule this endpoint gives you <b><u>invalid request<u/></b> <br/>
  Endpoint :- <ins>http://localhost:4000/u/repo/update/<repoName\> </ins> , In position of repoName you have to put repository Name which repository you want to update. <br/>
  Method :- Put <br/>
  Header :- <br/> auth-token: <token\> (You will get token when you authenticate himself using SignUP or Login endpoint) <br/>
            Content-Type: application/json<br/>
  eg:- auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoiS0hVUzEyMyJ9LCJpYXQiOjE2NTYwOTg5NDJ9.hUTkYM-V2l2hLcgj_MaDbEKAj87KLMMwmNBOiZW5nWI <br/>
     Content-Type: application/json<br/>
  
  <br/> step 10 :- For Add Contributer :- <br/>
  Note :- You have to Authenticate himself because only creater have the power to invite another user as a contributer.<br/>
  Endpoint :- <ins>http://localhost:4000/u/repo/<repoName\>/contributer/<userName\> </ins> , there is a repoName section in which authenticate user repository name put and in the place of userName another user will be put, which authenticate user want to contribute in this repository.<br/>
  Method :- Post <br/>
  Header :- <br/> auth-token: <token\> (You will get token when you authenticate himself using SignUP or Login endpoint) <br/>
            Content-Type: application/json<br/>
  eg:- auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoiS0hVUzEyMyJ9LCJpYXQiOjE2NTYwOTg5NDJ9.hUTkYM-V2l2hLcgj_MaDbEKAj87KLMMwmNBOiZW5nWI <br/>
     Content-Type: application/json<br/>
  
  <br/> step 11 :- For Add stargazers :- <br/>
  Note :- You have to Authenticate himself because user will give the star to the repo and if you want to became a user you must authenticate himself in this site<br/>
  Endpoint :- <ins> http://localhost:4000/u/repo/addstar/<userName\>/<repoName\> </ins> , there is a repoName and userName which is also know as address of repository because two repository name can't same in the particular user but two repository same in different user. and if repository is public than authenticate user will power to give the star else not.<br/>
  Method :- Post <br/>
  Header :- <br/> auth-token: <token\> (You will get token when you authenticate himself using SignUP or Login endpoint) <br/>
            Content-Type: application/json<br/>
  eg:- auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoiS0hVUzEyMyJ9LCJpYXQiOjE2NTYwOTg5NDJ9.hUTkYM-V2l2hLcgj_MaDbEKAj87KLMMwmNBOiZW5nWI <br/>
     Content-Type: application/json<br/>
  
  <br/> step 11 :- For Add fork :- <br/>
  Note :- You have to Authenticate himself because user will fork the repo and if you want to became a user you must authenticate himself in this site<br/>
  Endpoint :- <ins> http://localhost:4000/u/repo/fork/<userName\>/<repoName\> </ins> , there is a repoName and userName which is also know as address of repository because two repository name can't same in the particular user but two repository same in different user. and if repository is public than authenticate user will power to fork else not.<br/>
  Method :- Post <br/>
  Header :- <br/> auth-token: <token\> (You will get token when you authenticate himself using SignUP or Login endpoint) <br/>
            Content-Type: application/json<br/>
  eg:- auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoiS0hVUzEyMyJ9LCJpYXQiOjE2NTYwOTg5NDJ9.hUTkYM-V2l2hLcgj_MaDbEKAj87KLMMwmNBOiZW5nWI <br/>
     Content-Type: application/json<br/>
  
  <br/> step 11 :- For See List of Contributers :- <br/>
  Note :- For private repo only creater will see All contributer but for public repo anyone can see the Contributers list.
  Endpoint :- <ins> http://localhost:4000/u/repo/see/contributors/<userName\>/<repoName\> </ins> , there is a repoName and userName which is also know as address of repository because two repository name can't same in the particular user but two repository same in different user. and if repository is public than user will able to see  else for private repo, It get <b><u>invalid request<u/></b>.<br/>
  Method :- Get <br/>
  Header :- <br/> auth-token: <token\> (You will get token when you authenticate himself using SignUP or Login endpoint) <br/>
            Content-Type: application/json<br/>
  eg:- auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoiS0hVUzEyMyJ9LCJpYXQiOjE2NTYwOTg5NDJ9.hUTkYM-V2l2hLcgj_MaDbEKAj87KLMMwmNBOiZW5nWI <br/>
     Content-Type: application/json<br/>
  
  <br/> step 12 :- For See no of repo which star>5 and fork>5 :- <br/>
  Note :- For private repo only creater will see that but for public repo anyone can see that.
  Endpoint :- <ins> http://localhost:4000/u/repo/filter </ins> ,<br/>
  Method :- Get <br/>
  Header :- <br/> auth-token: <token\> (You will get token when you authenticate himself using SignUP or Login endpoint) <br/>
            Content-Type: application/json<br/>
  eg:- auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoiS0hVUzEyMyJ9LCJpYXQiOjE2NTYwOTg5NDJ9.hUTkYM-V2l2hLcgj_MaDbEKAj87KLMMwmNBOiZW5nWI <br/>
     Content-Type: application/json<br/>
  
