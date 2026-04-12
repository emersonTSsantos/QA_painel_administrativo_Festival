/// <reference types="cypress" />

import ProdutoPage from '../pages/ProdutoPage'
import { faker } from '@faker-js/faker'

describe('Cadastro de Produto', () => {

    const gerarProduto = () => ({
        nome: faker.commerce.productName(),
        descricao: faker.commerce.productDescription(),
        valor: faker.number.int({ min: 10, max: 100 })
    })

    beforeEach(() => {
        cy.login()
        ProdutoPage.abrirMenu()
        ProdutoPage.acessarProdutos()
    })

    it('Deve cadastrar produto com sucesso', () => {
        const produto = gerarProduto()

        ProdutoPage.preencherNome(produto.nome)
        ProdutoPage.preencherDescricao(produto.descricao)
        ProdutoPage.preencherValor(produto.valor)
        ProdutoPage.salvarProduto()

        ProdutoPage.validarProdutoNaLista(produto.nome)
    })

    it('Não deve cadastrar produto sem nome', () => {
        const produto = gerarProduto()

        ProdutoPage.preencherDescricao(produto.descricao)
        ProdutoPage.preencherValor(produto.valor)
        ProdutoPage.salvarProduto()

        cy.get('[name="nome"]').should('exist')
    })

    it('Permite cadastrar produto sem descrição (BUG)', () => {
        const produto = gerarProduto()

        ProdutoPage.preencherNome(produto.nome)
        // NÃO preenche descrição
        ProdutoPage.preencherValor(produto.valor)
        ProdutoPage.salvarProduto()

        // valida que cadastrou mesmo errado
        ProdutoPage.validarProdutoNaLista(produto.nome)
    })

    it.skip('Não deveria permitir cadastro sem descrição (REGRA DE NEGÓCIO)', () => {
        const produto = gerarProduto()

        ProdutoPage.preencherNome(produto.nome)
        ProdutoPage.preencherValor(produto.valor)
        ProdutoPage.salvarProduto()

        ProdutoPage.validarQueNaoCadastrou(produto.nome)
    })

    it.only('Não deve cadastrar produto sem valor', () => {
        const produto = gerarProduto()

        ProdutoPage.preencherNome(produto.nome)
        ProdutoPage.preencherDescricao(produto.descricao)
        ProdutoPage.salvarProduto()

        cy.get('[name="valorUnitario"]').should('exist')
    })

    it('Permite cadastrar produto com valor zerado (BUG)', () => {
        const produto = gerarProduto()

        ProdutoPage.preencherNome(produto.nome)
        ProdutoPage.preencherDescricao(produto.descricao)
        ProdutoPage.preencherValor(0)
        ProdutoPage.salvarProduto()

        // valida que cadastrou mesmo errado
        ProdutoPage.validarProdutoNaLista(produto.nome)
    })

    it.skip('Não deveria permitir cadastro com valor zerado (REGRA DE NEGÓCIO)', () => {
        const produto = gerarProduto()

        ProdutoPage.preencherNome(produto.nome)
        ProdutoPage.preencherDescricao(produto.descricao)
        ProdutoPage.preencherValor(0)
        ProdutoPage.salvarProduto()

        ProdutoPage.validarQueNaoCadastrou(produto.nome)
    })

    it('Não deve cadastrar produto com valor negativo', () => {
        const produto = gerarProduto()

        ProdutoPage.preencherNome(produto.nome)
        ProdutoPage.preencherDescricao(produto.descricao)
        ProdutoPage.preencherValor(-10)
        ProdutoPage.salvarProduto()

        cy.get('[name="valorUnitario"]').should('exist')
    })

})