const mysql = require('../mysql');

exports.postImagem = async (req, res, next) => {
    try {
        const query = 'INSERT INTO imagens_produtos (id_produto, caminho ) VALUES (?,?);'
        const result = await mysql.execute(query, [
            req.params.id_produto, req.file.path
        ]);

        const response = {
            mensagem: 'Imagem inserida com sucesso',
            imagemCriada: {
                id_imagem: result.insertId,
                id_produto: parseInt(req.params.id_produto),
                caminho: req.file.path,
                request:{
                    tipo: 'GET',
                    descrição: 'Retorna todos as imagens',
                    url: 'http://localhost:3000/produtos/' + req.params.id_produto + '/imagens'
                }
            }
        };
        res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error })
    }
};

exports.getImagem = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM imagens_produtos WHERE id_produto=?;'
        const result = await mysql.execute(query, [req.params.id_produto])
        const response = {
            quantidade: result.length,
            imagens: result.map(img => {
                return {
                    id_imagem: img.id_imagem,
                    id_produto: parseInt(req.params.id_produto),
                    caminho:'http://localhost:3000/produtos/'+img.caminho
                }
            })
        }
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }

};

exports.deleteImagem = async (req, res, next) => {
    try {
        const query = 'DELETE FROM imagens_produtos WHERE id_imagem =?;'
        await mysql.execute(query, [
            req.params.id_imagem
        ])
        const response = {
            mensagem: 'Imagem removida com sucesso com sucesso',
            request: {
                tipo: 'POST',
                descricao: 'Insere uma imagem',
                url: 'http://localhost:3000/produtos/'+ req.body.id_produto +'/imagem',
                body: {
                    id_produto: 'Number',
                    imagem_produto: 'file'
                }
            }
        }
        res.status(202).send(response);
    } catch (error) {
        return res.status(500).send({ error: error })
    }
};