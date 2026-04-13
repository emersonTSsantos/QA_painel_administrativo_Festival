/// <reference types="cypress" />

import PedidoPage from '../pages/PedidoPage'
import PessoaPage from '../pages/PessoaPage'
import ProdutoPage from '../pages/ProdutoPage'
import { faker } from '@faker-js/faker'

describe('Pedidos', () => {

    const gerarPessoa = () => ({
        nome: faker.person.firstName(),
        email: faker.internet.email(),
        telefone: '11944556677'
    })

    const selecionarClienteExistente = () => {
        cy.get('#new-order-cliente')
            .find('option')
            .then(options => {
                const cliente = options[1].innerText
                cy.get('#new-order-cliente').select(cliente)
            })
    }

    const selecionarProdutoExistente = () => {
        cy.get('#new-order-item-select')
            .find('option')
            .then(options => {
                const produto = options[1].innerText
                const nomeProduto = produto.split(' - ')[0]

                cy.get('#new-order-item-select').select(produto)

                PedidoPage.informarQuantidade(1)
                PedidoPage.adicionarItem()

                PedidoPage.validarItemNoCarrinho(nomeProduto)
            })
    }

    beforeEach(() => {
        cy.login()
    })

    // ========================
    // 🛒 PEDIDOS
    // ========================

    it('Deve realizar pedido com sucesso (fluxo E2E)', () => {
        const pessoa = gerarPessoa()

        PedidoPage.abrirNovoPedido()

        PessoaPage.clicarNovoCliente()
        PessoaPage.preencherNome(pessoa.nome)
        PessoaPage.preencherEmail(pessoa.email)
        PessoaPage.preencherTelefone(pessoa.telefone)
        PessoaPage.salvarCliente()
        PessoaPage.validarClienteNoSelect(pessoa.nome)

        selecionarProdutoExistente()

        PedidoPage.confirmarPedido()

        cy.get('.order-card__id').should('be.visible')
    })

    it('Não deve permitir pedido sem cliente', () => {

        PedidoPage.abrirNovoPedido()

        selecionarProdutoExistente()

        PedidoPage.confirmarPedido()

        cy.get('#new-order-cliente').should('be.visible')
    })

    it('Não deve permitir pedido sem produto', () => {
        const pessoa = gerarPessoa()

        PedidoPage.abrirNovoPedido()

        PessoaPage.clicarNovoCliente()
        PessoaPage.preencherNome(pessoa.nome)
        PessoaPage.preencherEmail(pessoa.email)
        PessoaPage.preencherTelefone(pessoa.telefone)
        PessoaPage.salvarCliente()

        PedidoPage.confirmarPedido()

        cy.get('#new-order-item-select').should('exist')
    })

    it('Permite realizar pedido com valor menor que R$ 5 (BUG)', () => {
        const produto = {
            nome: faker.commerce.productName(),
            descricao: faker.commerce.productDescription(),
            valor: 4 
        }

        ProdutoPage.abrirMenu()
        ProdutoPage.acessarProdutos()
        ProdutoPage.preencherNome(produto.nome)
        ProdutoPage.preencherDescricao(produto.descricao)
        ProdutoPage.preencherValor(produto.valor)
        ProdutoPage.salvarProduto()

        ProdutoPage.abrirMenu()
        PedidoPage.acessarListaPedidos()

        PedidoPage.abrirNovoPedido()

        selecionarClienteExistente()

        cy.get('#new-order-item-select')
            .find('option')
            .then(options => {

                const produtoCriado = [...options]
                    .map(opt => opt.innerText)
                    .find(texto => texto.includes(produto.nome))

                cy.get('#new-order-item-select').select(produtoCriado)

                PedidoPage.informarQuantidade(1)
                PedidoPage.adicionarItem()

                PedidoPage.validarItemNoCarrinho(produto.nome)
            })

        PedidoPage.confirmarPedido()

        cy.get('.order-card__id').should('be.visible')
    })

    it.skip('Não deveria permitir pedido com valor menor que R$ 5 (REGRA)', () => {
        expect(true).to.equal(false)
    })
})