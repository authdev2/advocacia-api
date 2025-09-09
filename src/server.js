import express from 'express';
import cors from 'cors';
import { getNoticias, postNoticias, deleteNoticias, updateNoticias, getSixNoticias, getNoticiasById } from './routes/noticias.js';
import {postLogin, loginExists, deleteUser, loginUsers, updateUser } from './routes/login.js';

let app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

//NOTICIAS
app.get('/noticias', getNoticias);
app.post("/noticias/create", postNoticias);
app.delete("/noticias/delete", deleteNoticias);
app.put("/noticias/update", updateNoticias);
app.get("/noticias/six", getSixNoticias);
app.get("/noticias/:id", getNoticiasById);

//LOGUN
app.get("/login/users", loginUsers);
app.post("/login/create", postLogin);
app.post("/login", loginExists);

app.delete("/login/delete", deleteUser);
app.put("/login/update", updateUser);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});