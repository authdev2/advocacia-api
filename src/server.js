import express from 'express';
import cors from 'cors';
import { getNoticias, postNoticias } from './routes/noticias.js';
import {postLogin, loginExists, deleteUser, loginUsers } from './routes/login.js';

let app = express();
app.use(cors());
app.use(express.json());
let port = 3000;

//NOTICIAS
app.get('/noticias', getNoticias);
app.post("/noticias/:title/:description/:image", postNoticias);


//LOGUN
app.get("/login/users", loginUsers);
app.post("/login/create", postLogin);
app.post("/login", loginExists);

app.delete("/login/delete", deleteUser);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});