const mysql = require('../mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.cadastroUsuario = async (req, res, next) => {
    try {
        const usuarioEncontrado = await encontraUsuario(req.body.email)

        if (usuarioEncontrado) {
            return res.status(409).send({ message: 'Usuário já cadastrado' })
        }

        const usuario = [ req.body.email, bcrypt.hashSync(req.body.senha, 10)]
        const query2 = 'INSERT INTO usuarios (email, senha) VALUES (?,?);';
        const results = await mysql.execute(query2, usuario);

        const response = {
            mensagem: 'Usuário criado com sucesso',
            usuarioCriado: {
                id_usuario: results.insertId,
                email: req.body.email
            }
        }
        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error })
    }
};

async function encontraUsuario(email) {
    const query = `SELECT * FROM usuarios WHERE email = ?;`;
    const results = await mysql.execute(query, [email]);
    return  results[0]
}

exports.loginUsuario = async (req, res, next) => {
    try {
        const usuarioEncontrado = await encontraUsuario(req.body.email)

        if (!usuarioEncontrado) {
            return res.status(401).send({ mensagem: 'Falha na autenticação' })
        }

        if ( bcrypt.compareSync(req.body.senha, usuarioEncontrado.senha)) {
            const token = jwt.sign({
                id_usuario: usuarioEncontrado.id_usuario,
                email: usuarioEncontrado.email
            },
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                });
            return res.status(200).send({
                mensagem: 'Autenticado com sucesso',
                token: token
            });
        }
        return res.status(401).send({ mensagem: 'Falha na autenticação' })

    } catch (error) {
        return res.status(500).send({ error: error })
    }
};
