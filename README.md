# ProjetoApi-DesenvolvimentoDeAplicativosMoveis

## 📑 Documentação da API de Filmes

Esta API permite o gerenciamento de um catálogo de filmes, contando com um sistema de registros iniciais (seed) e validações rigorosas para garantir a qualidade dos dados cadastrados.

---

 ## 🚀 Como rodar o projeto

```bash
npm install express
```

Inicie o servidor:

```bash
node index.js
```

A API estará disponível em: `http://localhost:3000`

---

## 🛠 Endpoints

### 1. Criar Filme

Cria um novo filme e o adiciona ao banco de dados.

**Método:** `POST`

**URL:** `/api/filmes`

**Corpo da Requisição (JSON):**

```json
{
  "nome": "Interestelar",
  "preco": 24.90,
  "categoria": "Ficção Científica",
  "duracao": 169
}
```

**Resposta de Sucesso:**
- **Status:** `201 Created`
- **Body:** Objeto do filme criado com o ID gerado pelo SQLite.

---

## ✅ Validações Implementadas

O código possui um sistema de tratamento de erros que retorna `400 Bad Request` caso:

- **Campos Obrigatórios:** Verifica se nome, preco, categoria e duracao foram enviados.
- **Tipo de Dado:** Os campos preco e duracao devem ser obrigatoriamente números.
- **Regra de Negócio (Duração):** O filme deve conter no mínimo 60 minutos de duração.
- - **Regra de Negócio (Preço):** Não é permitido cadastrar filmes com preço igual ou menor que zero.
- **Tamanho do Nome:** O nome do film deve ter, no mínimo, 3 caracteres.

---

## 📸 Testes Realizados (Postman)

###Teste 1: Sucesso ao Listar (Seed Inicial)

Ao realizar um GET, a API retorna os 10 filmes inseridos automaticamente na inicialização.
<img width="1084" height="905" alt="image" src="https://github.com/user-attachments/assets/27a9548a-9a91-4363-9594-165e14d85751" />
<img width="1091" height="956" alt="image" src="https://github.com/user-attachments/assets/3d3a7f06-5923-4b06-8fb4-d4770b8f926f" />

###Teste 2: Sucesso ao Deletar

Remoção de um filme através do ID. O servidor retorna o status correto de confirmação sem conteúdo.
<img width="1086" height="541" alt="image" src="https://github.com/user-attachments/assets/e8950eb4-da07-4a7a-9f73-fa8d50453b54" />

###Teste 3: Erro de Duração Insuficiente
Tentativa de inserir um filme com duração inferior a 60 minutos. A validação impede o cadastro.
<img width="1077" height="529" alt="image" src="https://github.com/user-attachments/assets/29ab60f1-0192-4086-a6b7-4dba0d506714" />
