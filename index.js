const express = require('express');
const app = express();

app.use(express.json());

let produtos = [];
let filmes = [];
let proximoId = 1;

app.post('/api/produtos', (req, res) => {
    // 1. Extrair dados do body
    const { nome, preco, categoria } = req.body;
    
    // 2. VALIDAÇÕES - Campos obrigatórios
    if (!nome || !preco || !categoria) {
        return res.status(400).json({
            erro: "Campos obrigatórios: nome, preco, categoria"
        });
    }
    
    // 3. VALIDAÇÕES - Tipo de dado
    if (typeof preco !== 'number') {
        return res.status(400).json({
            erro: "Preço deve ser um número"
        });
    }
    
    // 4. VALIDAÇÕES - Regra de negócio (preço positivo)
    if (preco <= 0) {
        return res.status(400).json({
            erro: "Preço deve ser maior que zero"
        });
    }
    
    // 5. VALIDAÇÕES - Tamanho mínimo
    if (nome.length < 3) {
        return res.status(400).json({
            erro: "Nome deve ter pelo menos 3 caracteres"
        });
    }
    
    // 6. Se passou em TODAS as validações, criar produto
    const novoProduto = {
        id: proximoId++,
        nome,
        preco,
        categoria
    };
    
    // 7. Adicionar ao array
    produtos.push(novoProduto);
    
    // 8. Retornar sucesso com 201 Created
    res.status(201).json(novoProduto);
});


app.post('/api/filmes', (req, res) => {

const {nome , preco, categoria,duracao} = req.body;

if(!nome || !preco || !categoria || !duracao){
     return res.status(400).json({
            erro: "Campos obrigatórios: nome, preco, categoria,duracao"
        });
}

// 3. VALIDAÇÕES - Tipo de dado
    if (typeof preco !== 'number') {
        return res.status(400).json({
            erro: "Preço deve ser um número"
        });
    }
    
    // 4. VALIDAÇÕES - Regra de negócio (preço positivo)
    if (preco <= 0) {
        return res.status(400).json({
            erro: "Preço deve ser maior que zero"
        });
    }
    
    // 5. VALIDAÇÕES - Tamanho mínimo
    if (nome.length < 3) {
        return res.status(400).json({
            erro: "Nome deve ter pelo menos 3 caracteres"
        });
    }

    if(duracao <= 60 ){
        return res.status(400).json({
            erro: "O filme deve conter no minimo 60 minutos "
        })
    }
    
    // 6. Se passou em TODAS as validações, criar produto
    const novoProduto = {
        id: proximoId++,
        nome,
        preco,
        categoria,
        duracao
    };
    
    // 7. Adicionar ao array
    filmes.push(novoProduto);
    
    // 8. Retornar sucesso com 201 Created
    res.status(201).json(novoProduto);


})
app.listen(3000, () => console.log('🚀 API na porta 3000'));
