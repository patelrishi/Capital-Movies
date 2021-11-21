

### Env Variables

Create a .env file in then root and add the following

```

PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'

```




### run following commands in terminal
first open the teriminal in root directory which will be look like this

![image](https://user-images.githubusercontent.com/53328265/117643628-39f55900-b1a6-11eb-8e76-647666d9f579.png)

### then run this command (it will install the backend dependency) 

npm install

![image](https://user-images.githubusercontent.com/53328265/117643771-64dfad00-b1a6-11eb-99f6-cbd896fdefd9.png)

### then run this command (it will install the Frontend dependency) 
```
cd frontend
npm install

```
![image](https://user-images.githubusercontent.com/53328265/117644084-bf790900-b1a6-11eb-9370-0fa10c918f57.png)

### then run this command to run frontend and backend at a same time 

```
cd ..
npm run dev
```

![image](https://user-images.githubusercontent.com/53328265/117644400-1088fd00-b1a7-11eb-91b7-f85e2ed6288c.png)

### you can use  these commands for running backend and frontend separately (all of these commands are mentioned in package.json)
### npm run server 
(for backend)
### npm run client
(for frontend)

### Reminder Dont forget to add your MONGO_URI , PORT and  JWT_SECRET in your .env  file it is very important
