# BackendAssesment
Requirement :- you npm features in your computer, if you did not have this please install before fork.

step 1:- After fork, You open that location in terminal and type command <b>npm install</b> <br/>
step 2: After completing installing you have to start a server for using the endpoint, Therfore type command <b> nodemon index.js <b/> <br/>
step 3 : open postman or thunderclient to check the endpoint. <br/>
step 4 : first, you must authenticate yourself using sign up endpoint which is <b>http://localhost:4000/u/auth/create<b/>. The method of this endpint is post and body of this endpoint accept four things which is :- username,name,email,password. Where username and email is always unique for a User<br/>
  for example :-  <br/>   "username" : "KHUS123",<br/>
                     "name" : "Khushi Rajak",<br/>
                     "email" : "rajakkhushi@gmail.com",<br/>
                     "password" : "123456"<br/>
step 5 : But, If you signup before than you have to use Login endpoint which is <b>http://localhost:4000/u/auth/login<b/>. The method of this endpint is post and body of this endpoint accept four things which is :- email,password <br/>
  for example :-  <br/> "email" : "rajakkhushi@gmail.com",<br/>
                     "password" : "123456"<br/>
 
 step 6 : If you want to create a repository than you must authenticate yourself, because after authenticate you will get a token in response and this token you add into the header.<br/>
For repoCreate ending point is :- <b>http://localhost:4000/u/repo/createRepo<b/><br/>
header of this endpoint is :- <br/> auth-token: \<token>/<br/> 
                            Content-Type: application/json<br/>
eg:- auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoiS0hVUzEyMyJ9LCJpYXQiOjE2NTYwOTg5NDJ9.hUTkYM-V2l2hLcgj_MaDbEKAj87KLMMwmNBOiZW5nWI <br/>
     Content-Type: application/json<br/>

body of this endpoint is :- repoName,repoDescription,visibility. if you doesn't give visibility than it default take value false which means repo is private.<br/>
  eg:- "repoName" : "KhushiBackend",<br/>
    "repoDescription" : "This is a Again Backend project", <br/>
    "visibility" : true <br/>
  
step 7:- If want to see all Repo of the user than you have in a two condition if you are a authecated user and want to see himself repo than you see private as well as public repo but you want to see another user repo than you not able to see that private repo, you will only public repo.
<br/>See Repo of a user done by this endpoint which is :- http://localhost:4000/u/auth/repodata/<username\>, In position of username you have to username which you want to see the repo <br/>
 <br/>if you don't put auth-token in the header than this end point think that you doesn't authenticated yourself, than you will not able to see any private repo of the user.<br/>
If you want to put header than header of this endpoint like these :- <br/> auth-token: \<token>/<br/> 
                                                                      Content-Type: application/json<br/>
  eg:- auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoiS0hVUzEyMyJ9LCJpYXQiOjE2NTYwOTg5NDJ9.hUTkYM-V2l2hLcgj_MaDbEKAj87KLMMwmNBOiZW5nWI <br/>
     Content-Type: application/json<br/>
  
 
  
  
