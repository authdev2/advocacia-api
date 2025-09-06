import con from '../config/database.js';

let resultSelect = [];

con.query("SELECT * FROM noticias", function (err, result) {
    console.log("Notícias carregadas:", result.length);
    resultSelect = result;
});

export const getNoticias = (req, res) => {
    res.send(resultSelect);
};

export const postNoticias = (req, res) => {    
    con.query(
        "INSERT INTO noticias (nomeNoticia, descricaoNoticia, imagemNoticia) VALUES (?, ?, ?)", 
        [req.params.title, req.params.description, req.params.image], 
        function (err, result) {
            res.send(result);
        }
    );
};
