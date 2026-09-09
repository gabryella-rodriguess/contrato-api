const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'aluno',
    port: '3302',
    database: 'aula_crud'
});

conexao.connect((erro) => {
    if (erro) {
        console.log('Erro ao conectar com o banco', erro);
        return;
    }

    console.log('Conectado ao MySQL')

});

app.get('/produtos', (req, res) => {
    const sql = 'CALL sp_listar_produtos()'

    conexao.query(sql, (erro, resultados) => {

        if (erro) {
            return res.status(500).json({
                erro: 'erro ao buscar produtos'

            });

            
        }

        res.status(200).json(resultados[0])

    })

});


app.post('/produtos', (req, res) => {

    const {nome, preco} = req.body;

    const sql = 'CALL sp_cadastrar_produto(?, ?)'

    conexao.query(
        sql,
        [nome, preco],
        (erro, resultados) => {

            if (erro) {
                return express.status(500).json({
                    erro: 'Erro ao cadastrar produto'
                })
                
            }

            const id = resultados[0][0].id;

            res.status(201).json({

                mensagem: 'Produto cadastrado com sucesso',
                produto: {
                    id,
                    nome,
                    preco
                }
            })

        }
    )
});

app.put('/produtos/:id', (req, res) => {

    const id = req.params.id;

    const { nome, preco } = req.body

    const sql = 'CALL sp_atualizar_produto(?, ?, ?)'

    conexao.query(

        sql,
        [id, nome, preco],
        (erro, resultados) => {

            if(erro){

                return res.status(500).json({
                    erro: 'Erro ao atualizar produto'
                })
            }

        const linhasAfetadas = 
            resultados[0][0].linhasAfetadas

        if(linhasAfetadas === 0){
            return res.status(404).json({
                erro: 'Produto não encontrado'
            });
        }

        res.status(200).json({
            mensagem: 'Produto atualizado com sucesso',
            produto: {
                id,
                nome,
                preco
            }
        })
      }
    )
});

app.delete('/produtos/:id', (req, res) => {

    const id = req.params.id;

    const sql = 'CALL sp_excluir_produto(?)'

    conexao.query(

        sql,
        [id],
        (erro, resultados)=>{

            if(erro){

                return res.status(500).json({
                    erro: 'Erro ao excluir produto'
                })
            }

            const linhasAfetadas = 
                resultados[0][0].linhasAfetadas;

            if(linhasAfetadas === 0){
                return res.status(404).json({
                    erro: 'Produto não encontrado'
                });
            }

            res.status(200).json({
                mensagem: 'Produto excluído com sucesso'
            })
        }
    )
})

app.listen(PORT, () => {

    console.log(
        `Servidor rodando em http://localhost:${PORT}`
    );
});