const express = require('express');
const app = express();

app.use(express.json());

// --- CONFIGURAÇÃO DO BANCO DE DADOS ---
const Database = require('better-sqlite3');
const db = new Database('database.db');


function inicializarDados() {
    // Verifica se já existem filmes para não duplicar toda vez que reiniciar o server
    const rowCount = db.prepare('SELECT count(*) as count FROM filmes').get().count;

    if (rowCount === 0) {
        console.log("🌱 Populando banco de dados inicial...");
        
        const insert = db.prepare('INSERT INTO filmes (nome, preco, categoria, duracao) VALUES (?, ?, ?, ?)');

        const listaDeFilmes = [
            ['O Poderoso Chefão', 29.90, 'Drama', 175],
            ['Matrix', 19.90, 'Ficção Científica', 136],
            ['Interestelar', 24.90, 'Ficção Científica', 169],
            ['O Auto da Compadecida', 15.00, 'Comédia', 104],
            ['Cidade de Deus', 18.00, 'Crime', 130],
            ['Pulp Fiction', 22.00, 'Crime', 154],
            ['O Senhor dos Anéis', 35.00, 'Fantasia', 178],
            ['Batman: O Cavaleiro das Trevas', 25.00, 'Ação', 152],
            ['Parasita', 20.00, 'Suspense', 132],
            ['A Viagem de Chihiro', 14.90, 'Animação', 125]
        ];

        // Executa a inserção para cada item da lista
        listaDeFilmes.forEach(filme => {
            insert.run(filme[0], filme[1], filme[2], filme[3]);
        });

        console.log("✅ 10 registros inseridos com sucesso!");
    }
}

// Chama a função logo após a criação das tabelas
inicializarDados();

// Criação das tabelas caso não existam
db.exec(`
    CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        preco REAL NOT NULL,
        categoria TEXT NOT NULL,
        estoque INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS filmes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        preco REAL NOT NULL,
        categoria TEXT NOT NULL,
        duracao INTEGER NOT NULL
    );
`);

// --- ROTAS DE PRODUTOS ---

// POST /api/produtos - Criar
app.post('/api/produtos', (req, res) => {
    const { nome, preco, categoria, estoque } = req.body;

    // Validações
    if (!nome || preco === undefined || !categoria) {
        return res.status(400).json({ erro: "Campos obrigatórios: nome, preco, categoria" });
    }
    if (typeof preco !== 'number' || preco <= 0) {
        return res.status(400).json({ erro: "Preço deve ser um número maior que zero" });
    }
    if (nome.length < 3) {
        return res.status(400).json({ erro: "Nome deve ter pelo menos 3 caracteres" });
    }

    try {
        const stmt = db.prepare('INSERT INTO produtos (nome, preco, categoria, estoque) VALUES (?, ?, ?, ?)');
        const info = stmt.run(nome, preco, categoria, estoque || 0);
        
        res.status(201).json({ id: info.lastInsertRowid, nome, preco, categoria, estoque: estoque || 0 });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao salvar produto" });
    }
});

// GET /api/produtos - Listar com filtros
app.get('/api/produtos', (req, res) => {
    try {
        const { categoria, preco_max, preco_min } = req.query;
        let sql = 'SELECT * FROM produtos WHERE 1=1';
        const params = [];

        if (categoria) {
            sql += ' AND categoria = ?';
            params.push(categoria);
        }
        if (preco_max) {
            sql += ' AND preco <= ?';
            params.push(parseFloat(preco_max));
        }
        if (preco_min) {
            sql += ' AND preco >= ?';
            params.push(parseFloat(preco_min));
        }

        const produtos = db.prepare(sql).all(...params);
        res.json(produtos);
    } catch (error) {
        res.status(500).json({ erro: 'Erro na busca' });
    }
});

// PUT /api/produtos/:id - Atualizar
app.put('/api/produtos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, preco, categoria, estoque } = req.body;

    const produtoExistente = db.prepare('SELECT * FROM produtos WHERE id = ?').get(id);
    if (!produtoExistente) {
        return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    if (!nome || !preco || !categoria) {
        return res.status(400).json({ erro: 'Campos obrigatórios faltando' });
    }

    try {
        const stmt = db.prepare(`
            UPDATE produtos 
            SET nome = ?, preco = ?, categoria = ?, estoque = ?
            WHERE id = ?
        `);
        stmt.run(nome, preco, categoria, estoque || 0, id);
        
        res.json({ id: Number(id), nome, preco, categoria, estoque });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao atualizar' });
    }
});

// DELETE /api/produtos/:id - Deletar
app.delete('/api/produtos/:id', (req, res) => {
    const { id } = req.params;
    const produto = db.prepare('SELECT * FROM produtos WHERE id = ?').get(id);

    if (!produto) {
        return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    db.prepare('DELETE FROM produtos WHERE id = ?').run(id);
    res.status(204).send();
});

// --- ROTAS DE FILMES ---

app.post('/api/filmes', (req, res) => {
    const { nome, preco, categoria, duracao } = req.body;

    if (!nome || !preco || !categoria || !duracao) {
        return res.status(400).json({ erro: "Campos obrigatórios: nome, preco, categoria, duracao" });
    }

    if (typeof duracao !== 'number' || duracao < 60) {
        return res.status(400).json({ erro: "O filme deve conter no mínimo 60 minutos (valor numérico)" });
    }

    try {
        const stmt = db.prepare('INSERT INTO filmes (nome, preco, categoria, duracao) VALUES (?, ?, ?, ?)');
        const info = stmt.run(nome, preco, categoria, duracao);
        
        res.status(201).json({ id: info.lastInsertRowid, nome, preco, categoria, duracao });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao salvar filme" });
    }
});

app.get('/api/filmes', (req, res) => {
    const filmes = db.prepare('SELECT * FROM filmes').all();
    res.json(filmes);
}); 

// Inicialização do Servidor
app.listen(3000, () => {
    console.log('🚀 Servidor rodando em http://localhost:3000');
    console.log('📦 Banco de Dados SQLite conectado.');
});
