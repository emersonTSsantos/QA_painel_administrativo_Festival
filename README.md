## 🧪 QA Painel Administrativo Festival

Projeto de automação de testes end-to-end utilizando Cypress, desenvolvido para validar as principais funcionalidades de um painel administrativo de gerenciamento de pedidos, clientes e produtos.

# 🔗 Repositório:

https://github.com/emersonTSsantos/QA_painel_administrativo_Festival

---

# 🎯 Objetivo

Garantir a qualidade da aplicação através de testes automatizados, cobrindo:

- Fluxos críticos do sistema
- Regras de negócio
- Validações de formulário
- Cenários positivos e negativos
- Identificação e documentação de bugs

---

# 🛠️ Tecnologias utilizadas

Cypress → Automação E2E
JavaScript → Linguagem principal
Faker → Geração de dados dinâmicos
Page Object Model (POM) → Organização e reutilização de código

---

# 📂 Arquitetura do Projeto

# Estrutura

- **e2e/** → Contém os testes automatizados organizados por funcionalidade  

- **pages/** → Implementação do padrão Page Object Model (POM)  

- **support/** → Comandos customizados e configurações globais do Cypress  

---

# 🧠 Estratégia de Testes

# ✔️ Page Object Model (POM)

Separação clara entre:

- Testes (e2e) → foco no comportamento

- Pages → interação com elementos da UI

👉 Benefícios:

- Reutilização de código

- Facilidade de manutenção

- Melhor legibilidade

# ✔️ Dados dinâmicos com Faker

- Evita conflitos entre execuções
- Garante independência dos testes
- Simula comportamento real do usuário

# ✔️ Abordagem BDD (Behavior Driven Development)

Os testes seguem o padrão:

- Dado que (contexto)
- Quando (ação)
- Então (resultado esperado)

👉 Facilita:

- Leitura por pessoas não técnicas
- Comunicação com o time
- Clareza dos cenários

--- 

✔️ Cobertura de regras de negócio

# Além do fluxo funcional, foram testadas regras críticas como:

- Valor mínimo de pedido
- Campos obrigatórios
- Integridade de cadastro

✅ Cenários automatizados

# 🔐 Login
    - Login com sucesso
    - Login inválido (email/senha)
    - Validação de formato de email

    ---

# 👤 Cadastro de Pessoas
    - Cadastro com sucesso
    - Validação de campos obrigatórios
    - ❌ BUG: sistema permite cadastro sem telefone
# 📦 Cadastro de Produtos
    - Cadastro com sucesso
    - ❌ BUG: permite cadastro sem descrição
    - ❌ BUG: permite valor igual a 0
    - Validação de valor negativo
# 🧾 Pedidos
    - Criação de pedido com sucesso (E2E completo)
    - Não permite pedido sem cliente
    - Não permite pedido sem produto
    - ❌ BUG: permite pedido com valor menor que R$ 5
# 🔎 Filtros de pedidos
    - Filtro por nome do cliente
    - Filtro por intervalo de datas
    - Filtro por valor mínimo
    - Combinação de filtros
    - Limpar filtros
# 🐞 Bugs encontrados

    1. Cadastro de cliente sem telefone
    Sistema permite salvar sem telefone
    Esperado: campo obrigatório

    2. Cadastro de produto sem descrição
    Produto é criado mesmo sem descrição

    3. Cadastro de produto com valor zero
    Sistema aceita valor inválido

    4. Pedido com valor menor que R$ 5
    Regra de negócio não é respeitada

    5. Campo de busca no modal não funcional
    Input existe, mas não executa nenhuma ação

---

# 🚀 Como rodar o projeto

# Instalar dependências
- npm install

# Abrir o Cypress
- npx cypress open

## 📈 Possíveis melhorias

# 🔧 Funcionais

- Remover ou corrigir campo de busca no modal
- Adicionar funcionalidade de remover cliente
- Adicionar funcionalidade de remover produto
- Implementar validação de valor mínimo no backend
- Melhorar feedback visual de erros

# 🧪 Testes

- Adicionar testes de API (integração)
- Implementar fixtures para dados fixos
- Criar testes de performance básicos
- Integrar com CI/CD (GitHub Actions)

# 🏗️ Arquitetura
- Separar testes por domínio (ex: pedidos, produtos, pessoas)
- Criar camada de services para API (futuro)
- Melhorar reutilização de comandos customizados

# 👨‍💻 Autor

Emerson Teixeira Souza Santos

Projeto desenvolvido com foco em:

- Qualidade de software
- Boas práticas de automação
- Organização e escalabilidade de testes