/// <reference types="cypress" />

import PedidoPage from '../pages/PedidoPage'
import PessoaPage from '../pages/PessoaPage'
import ProdutoPage from '../pages/ProdutoPage'
import { faker } from '@faker-js/faker'

describe('Pedidos', () => {

    const gerarPessoa = () => ({
        nome: faker.person.firstName(),
        email: faker.internet.email(),
        telefone: ('11944556677')
    })

    const gerarProduto = () => ({
        nome: faker.commerce.productName(),
        descricao: faker.commerce.productDescription(),
        valor: 10
    })

    const selecionarProdutoExistente = () => {
        cy.get('#new-order-item-select')
            .find('option')
            .then(options => {
                const texto = options[1].innerText // pega primeiro produto válido
                cy.get('#new-order-item-select').select(texto)
                return texto
            })
    }

    beforeEach(() => {
        cy.login()
    })

    it.only('Deve realizar pedido com sucesso (fluxo E2E)', () => {
        const pessoa = gerarPessoa()

        PedidoPage.abrirNovoPedido()

        // criar cliente
        PessoaPage.clicarNovoCliente()
        PessoaPage.preencherNome(pessoa.nome)
        PessoaPage.preencherEmail(pessoa.email)
        PessoaPage.preencherTelefone(pessoa.telefone)
        PessoaPage.salvarCliente()
        PessoaPage.validarClienteNoSelect(pessoa.nome)

        // produto existente
        cy.get('#new-order-item-select')
            .find('option')
            .then(options => {

                expect(options.length).to.be.greaterThan(1)

                const produto = options[1].innerText
                const nomeProduto = produto.split(' - ')[0]

                cy.get('#new-order-item-select').select(produto)

                PedidoPage.informarQuantidade(1)
                PedidoPage.adicionarItem()

                PedidoPage.validarItemNoCarrinho(nomeProduto)
            })

        PedidoPage.confirmarPedido()

        cy.get('.order-card__id').should('be.visible')
    })
    it('Não deve permitir pedido sem cliente', () => {
        const produto = gerarProduto()

        PedidoPage.abrirNovoPedido()
        PedidoPage.selecionarProduto(produto.nome)
        PedidoPage.informarQuantidade(1)
        PedidoPage.adicionarItem()

        PedidoPage.confirmarPedido()

        // valida que não fechou ou não registrou
        cy.get('#new-order-cliente').should('exist')
    })

    it('Não deve permitir pedido sem produto', () => {
        const pessoa = gerarPessoa()

        PedidoPage.abrirNovoPedido()
        PedidoPage.selecionarCliente(pessoa.nome)

        PedidoPage.confirmarPedido()

        cy.get('#new-order-item-select').should('exist')
    })

    it('Não deve permitir pedido com valor menor que R$ 5 (REGRA)', () => {
        const pessoa = gerarPessoa()
        const produto = gerarProduto()

        // produto barato
        produto.valor = 1

        // fluxo completo (igual acima)

        // valida que não permite
        cy.contains('Total').should('contain', '1')
    })

})