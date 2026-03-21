# ProjetoApi-DesenvolvimentoDeAplicativosMoveis
📑 Documentação da API de Produtos
Esta API permite o gerenciamento de uma lista de produtos, com validações rigorosas de dados para garantir a integridade do inventário.

🚀 Como rodar o projeto
Certifique-se de ter o Node.js instalado.

Na pasta do projeto, instale as dependências:

Bash
npm install express
Inicie o servidor:

Bash
node index.js
A API estará disponível em: http://localhost:3000

🛠 Endpoints
1. Criar Produto
Cria um novo produto e o adiciona à lista.

Método: POST

URL: /api/produtos

Corpo da Requisição (JSON):

JSON
{
  "nome": "Teclado Mecânico",
  "preco": 250.50,
  "categoria": "Periféricos"
}
Resposta de Sucesso:

Status: 201 Created

Body: Objeto criado com o id gerado.

✅ Validações Implementadas
O código possui um sistema de tratamento de erros que retorna 400 Bad Request caso:

Campos Obrigatórios: Verifica se nome, preco e categoria foram enviados.

Tipo de Dado: O campo preco deve ser obrigatoriamente um número e nome deve ser uma string.

Regra de Negócio (Preço): Não é permitido cadastrar produtos com preço igual ou menor que zero.

Tamanho do Nome: O nome do produto deve ter, no mínimo, 3 caracteres.

📸 Testes Realizados (Postman)
Teste 1: Sucesso ao Criar
Ao enviar todos os dados corretamente, o servidor retorna o objeto com seu ID único.

<img width="1437" height="918" alt="image" src="https://github.com/user-attachments/assets/1ea81fcf-56d3-40b4-afda-6ca0351769dd" />


Teste 2: Erro de Tamanho de Nome
Tentativa de criar produto com nome "Te". A API bloqueia e solicita pelo menos 3 caracteres.

<img width="1435" height="929" alt="image" src="https://github.com/user-attachments/assets/edfd05e0-bcad-448f-8e0f-f6b3390a8d2d" />


Teste 3: Erro de Preço Negativo
Tentativa de inserir preço -4. A validação impede a operação.

<img width="1434" height="921" alt="image" src="https://github.com/user-attachments/assets/1f43b4ae-d009-4ad4-89f0-29cb22b48c45" />
