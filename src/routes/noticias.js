import con from "../config/database.js";

export const getNoticias = (req, res) => {
  con.query("SELECT * FROM noticias", function (err, result) {
    if (err) {
      return res.status(500).send({ error: "Erro ao carregar notícias" });
    }
    res.send({
      message: "Notícias carregadas com sucesso",
      result: result,
      success: true,
    });
  });
};

export const postNoticias = (req, res) => {
  const { title, description, image } = req.body;
  const date = new Date();
  con.query(
    "INSERT INTO noticias (nomeNoticia, descricaoNoticia, imagemNoticia, data) VALUES (?, ?, ?, ?)",
    [title, description, image, date],
    function (err, result) {
      if (err) {
        return res.status(500).send({ error: "Erro ao criar notícia" });
      }
      res.send({ message: "Notícia criada com sucesso", success: true });
    }
  );
};

export const deleteNoticias = (req, res) => {
  const { nomeNoticia } = req.body;
  con.query(
    "DELETE FROM noticias WHERE nomeNoticia = ?",
    [nomeNoticia],
    function (err, result) {
      if (err) {
        return res.status(500).send({ error: "Erro ao deletar notícia" });
      }
      res.send({ message: "Notícia deletada com sucesso", success: true });
    }
  );
};

export const updateNoticias = (req, res) => {
  const {
    newNomeNoticia,
    newDescricaoNoticia,
    newImagemNoticia, 
    id,
  } = req.body;

  console.log("Dados recebidos:", req.body);

  con.query(
    "UPDATE noticias SET nomeNoticia = ?, descricaoNoticia = ?, imagemNoticia = ? WHERE id = ?",
    [
      newNomeNoticia,
      newDescricaoNoticia,
      newImagemNoticia,
      id,
    ],
    function (err, result) {
      if (err) {
        console.error("Erro na query:", err);
        return res.status(500).send({ error: "Erro ao atualizar notícia" });
      }
      console.log("Resultado da atualização:", result);
      res.send({ message: "Notícia atualizada com sucesso", success: true });
    }
  );
};

export const getSixNoticias = (req, res) => {
  con.query("SELECT * FROM noticias WHERE id > 0 ORDER BY id DESC LIMIT 8", function (err, result) {
    if (err) {
      return res.status(500).send({ error: "Erro ao carregar notícias" });
    }
    res.send({
      message: "Notícias carregadas com sucesso",
      result: result,
      success: true,
    });
  });
};


export const getNoticiasById = (req, res) => {
  const { id } = req.params;
  con.query("SELECT * FROM noticias WHERE id = ?", [id], function (err, result) {
    if (err) {
      return res.status(500).send({ error: "Erro ao carregar notícia" });
    }
    res.send({
      message: "Notícia carregada com sucesso",
      result: result,
      success: true,
    });
  });
};