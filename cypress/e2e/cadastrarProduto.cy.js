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

    it('Dado que preencho todos os campos, Então deve cadastrar produto com sucesso', () => {
        const produto = gerarProduto()

        ProdutoPage.preencherNome(produto.nome)
        ProdutoPage.preencherDescricao(produto.descricao)
        ProdutoPage.preencherValor(produto.valor)
        ProdutoPage.salvarProduto()

        ProdutoPage.validarProdutoNaLista(produto.nome)
    })

    it('Dado que não informo o nome, Então não deve cadastrar produto', () => {
        const produto = gerarProduto()

        ProdutoPage.preencherDescricao(produto.descricao)
        ProdutoPage.preencherValor(produto.valor)
        ProdutoPage.salvarProduto()

        cy.get('[name="nome"]').should('exist')
    })

    it('Dado que não informo a descrição, permite cadastrar produto (BUG)', () => {
        const produto = gerarProduto()

        ProdutoPage.preencherNome(produto.nome)
        ProdutoPage.preencherValor(produto.valor)
        ProdutoPage.salvarProduto()

        ProdutoPage.validarProdutoNaLista(produto.nome)
    })

    it.skip('Dado que não informo a descrição, não deveria permitir cadastro (REGRA DE NEGÓCIO)', () => {
        const produto = gerarProduto()

        ProdutoPage.preencherNome(produto.nome)
        ProdutoPage.preencherValor(produto.valor)
        ProdutoPage.salvarProduto()

        ProdutoPage.validarQueNaoCadastrou(produto.nome)
    })

    it('Dado que não informo o valor,   Então não deve cadastrar produto', () => {
        const produto = gerarProduto()

        ProdutoPage.preencherNome(produto.nome)
        ProdutoPage.preencherDescricao(produto.descricao)
        ProdutoPage.salvarProduto()

        cy.get('[name="valorUnitario"]').should('exist')
    })

    it('Dado que informo valor zero, Então permite cadastrar produto (BUG)', () => {
        const produto = gerarProduto()

        ProdutoPage.preencherNome(produto.nome)
        ProdutoPage.preencherDescricao(produto.descricao)
        ProdutoPage.preencherValor(0)
        ProdutoPage.salvarProduto()

        ProdutoPage.validarProdutoNaLista(produto.nome)
    })

    it.skip('Dado que informo valor zero, não deveria permitir cadastro (REGRA DE NEGÓCIO)', () => {
        const produto = gerarProduto()

        ProdutoPage.preencherNome(produto.nome)
        ProdutoPage.preencherDescricao(produto.descricao)
        ProdutoPage.preencherValor(0)
        ProdutoPage.salvarProduto()

        ProdutoPage.validarQueNaoCadastrou(produto.nome)
    })

    it('Dado que informo valor negativo, Então não deve cadastrar produto', () => {
        const produto = gerarProduto()

        ProdutoPage.preencherNome(produto.nome)
        ProdutoPage.preencherDescricao(produto.descricao)
        ProdutoPage.preencherValor(-10)
        ProdutoPage.salvarProduto()

        cy.get('[name="valorUnitario"]').should('exist')
    })

})