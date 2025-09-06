import con from '../config/database.js';
import bcrypt from 'bcryptjs';

let password_hash = "";

export const postLogin = (req, res) => {
    const email = req.params.email;
    const password = req.params.password;
    
    con.query("SELECT * FROM users WHERE email = ?", [email], function (err, result) {
        console.log("Result:", result);
        if (err) {
            return res.status(500).send({ error: "Erro interno do servidor" });
        }
        
        if (result.length > 0) {
            console.log(result.length);
            return res.status(400).send({ error: "Email já cadastrado" });
        }
        
        password_hash = bcrypt.hashSync(password, 10);
        
        con.query("INSERT INTO users (email, password_hash) VALUES (?, ?)", [email, password_hash], function (err, result) {
            if (err) {
                console.error("Erro ao inserir usuário:", err);
                return res.status(500).send({ error: "Erro ao criar usuário" });
            }
            
            console.log("Login inserido:", email, password_hash);
            res.send({ message: "Usuário criado com sucesso", result: result });
        });
    });
};

export const loginExists = (req, res) => {
    const { email, password } = req.body; 
    
    con.query("SELECT * FROM users WHERE email = ?", [email], function (err, result) {
        if (err) {
            return res.status(500).send({ error: "Erro no servidor" });
        }
        
        if (result.length === 0) {
            return res.status(401).send({ error: "Email ou senha incorretos" });
        }
        
        const isValidPassword = bcrypt.compareSync(password, result[0].password_hash);
        
        if (isValidPassword) {
            res.send({ success: true, message: "Login realizado com sucesso" });
        } else {
            res.status(401).send({ error: "Email ou senha incorretos" });
        }
    });
};