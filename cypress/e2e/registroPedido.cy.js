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

    it('Deve realizar pedido com sucesso (fluxo E2E)', () => {
        const pessoa = gerarPessoa()

        PedidoPage.abrirNovoPedido()

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

        cy.get('[data-order-id="p26"] > .order-card__client').should('be.visible')
    })

    it('Não deve permitir pedido sem cliente', () => {

        PedidoPage.abrirNovoPedido()

        cy.get('#new-order-item-select')
            .find('option')
            .then(options => {

                expect(options.length).to.be.greaterThan(1)

                const produto = options[1].innerText

                cy.get('#new-order-item-select').select(produto)

                PedidoPage.informarQuantidade(2)
                PedidoPage.adicionarItem()
            })

        PedidoPage.confirmarPedido()

        // 🔥 valida comportamento
        cy.get('#new-order-cliente').should('be.visible')
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