# 🧪 QA Painel Administrativo Festival

Projeto de automação de testes end-to-end utilizando Cypress, desenvolvido para validar as funcionalidades de um painel administrativo de gerenciamento de pedidos, clientes e produtos.

🔗 Repositório: https://github.com/emersonTSsantos/QA_painel_administrativo_Festival

---

## 🎯 Objetivo

Garantir a qualidade da aplicação através de testes automatizados, cobrindo:

- Login
- Cadastro de clientes (Pessoas)
- Cadastro de produtos
- Criação de pedidos
- Regras de negócio
- Filtros de pedidos
- Identificação de bugs

---

## 🛠️ Tecnologias utilizadas

- Cypress
- JavaScript
- Faker (dados dinâmicos)
- Page Object Model (POM)

---

## 📂 Arquitetura do Projeto

cypress/
│
├── e2e/
│ ├── login.cy.js
│ ├── cadastrarPessoa.cy.js
│ ├── cadastroProduto.cy.js
│ ├── registroPedido.cy.js
│ ├── FiltroPedidos.cy.js
│
├── pages/
│ ├── LoginPage.js
│ ├── PessoaPage.js
│ ├── ProdutoPage.js
│ ├── PedidoPage.js
│ ├── FiltroPage.js
│
├── support/
│ ├── commands.js


---

## 🧠 Estratégia de Testes

O projeto foi estruturado utilizando:

### ✔️ Page Object Model (POM)
Separação de responsabilidades entre:
- Camada de testes
- Camada de interação com a UI

### ✔️ Dados dinâmicos
Uso do Faker para:
- Evitar duplicidade
- Garantir independência dos testes

### ✔️ Testes E2E + Regras de Negócio
Cobertura não só funcional, mas também de regras críticas do sistema

---

## ✅ Cenários automatizados

### 🔐 Login
- Login com sucesso
- Login inválido (email/senha)
- Validação de formato de email

---

### 👤 Cadastro de Pessoas
- Cadastro com sucesso
- Validação de campos obrigatórios (nome e email)
- ❌ BUG: Sistema permite cadastro sem telefone

---

### 📦 Cadastro de Produtos
- Cadastro com sucesso
- ❌ BUG: Permite cadastro sem descrição
- ❌ BUG: Permite valor igual a 0

---

### 🧾 Pedidos
- Criação de pedido com sucesso
- Não permite pedido sem cliente
- Não permite pedido sem produto
- ❌ BUG: Permite pedido com valor menor que R$ 5

---

### 🔎 Filtros de pedidos
- Filtro por nome do cliente
- Filtro por intervalo de datas
- Filtro por valor mínimo
- Combinação de filtros
- Limpar filtros

---

## 🐞 Bugs encontrados

### 1. Cadastro de cliente sem telefone
- Sistema permite salvar sem telefone
- Regra esperada: campo obrigatório

---

### 2. Cadastro de produto sem descrição
- Produto é criado sem descrição

---

### 3. Cadastro de produto com valor zero
- Sistema aceita valor inválido

---

### 4. Pedido com valor menor que R$ 5
- Regra de negócio não respeitada

---

### 5. Modal com busca não funcional
- Campo de busca presente, porém não executa nenhuma ação

---

## 🚀 Como rodar o projeto

# instalar dependências

- npm install

# abrir Cypress

- npx cypress open

## 📈 Possíveis melhorias

# 🔧 Funcionais

- Remover ou corrigir campo de busca no modal

- Adicionar opção de remover cliente

- Adicionar opção de remover produto

- Implementar validação de valor mínimo no backend

 - Melhorar feedback visual de erros (mensagens)

## 👨‍💻 Autor

# Emerson Teixeira Souza Santos

Projeto desenvolvido com foco em automação e boas práticas.