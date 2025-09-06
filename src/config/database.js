import mysql from 'mysql';

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "noticias"
});

con.connect(function() {
    console.log("Conectado ao banco de dados");
});

export default con;
