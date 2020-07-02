import axios from 'axios';


const jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1OTM2NzI0NzEsImV4cCI6MTU5MzcwODQ3MSwiYXVkIjoiYjk1NDQyNjlkNDg0NjMwZTJiYmE3NDg5NjJjMDE5NDliMGM0OTJmNiIsImRhdGEiOnsiZW1haWwiOiJqYWx2YXJlekB2YWRlbWVjdW0uZXMiLCJmaXJzdG5vbWJyZSI6IldlYiIsImxhc3RuYW1lIjoiTWFzdGVyIiwibG9naW4iOiJhZG1pbiJ9fQ.uWsl-8oNKI4SXdibJqQdKNffe5uKKxdEYQx1xK3PF58';



const clienteAxios = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    jwt
  }
   
});

export default clienteAxios;
