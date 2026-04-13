/// <reference types="cypress" />

import PessoaPage from '../pages/PessoaPage'
import { faker } from '@faker-js/faker'

describe('Funcionalidade: Cadastro de Pessoas para realização de pedidos', () => {

    const gerarPessoa = () => ({
        nome: faker.person.fullName(),
        email: faker.internet.email(),
        telefone: faker.phone.number('119########')
    })

    beforeEach(() => {
        cy.login()
    })

    it('Dado que estou criando um novo cliente, quando informo todos os dados válidos, e clico em salvar cliente, então o cliente deve ser cadastrado e aparecer no seletor', () => {
        const pessoa = gerarPessoa()

        PessoaPage.abrirModalNovoPedido()
        PessoaPage.clicarNovoCliente()
        PessoaPage.preencherNome(pessoa.nome)
        PessoaPage.preencherEmail(pessoa.email)
        PessoaPage.preencherTelefone(pessoa.telefone)
        PessoaPage.salvarCliente()

        PessoaPage.validarClienteNoSelect(pessoa.nome)
    })

    it('Dado que estou criando um novo cliente, quando não informo o nome, e clico em salvar cliente, então o cliente não deve ser cadastrado', () => {
        const pessoa = gerarPessoa()

        PessoaPage.abrirModalNovoPedido()
        PessoaPage.clicarNovoCliente()

        PessoaPage.preencherEmail(pessoa.email)
        PessoaPage.preencherTelefone(pessoa.telefone)
        PessoaPage.salvarCliente()

        cy.get('#nc-nome').should('exist')

        cy.get('#new-order-cliente')
            .should('not.contain', pessoa.nome)
    })

    it('Dado que estou criando um novo cliente, quando não informo o e-mail, e clico em salvar cliente, então o cliente não deve ser cadastrado', () => {
        const pessoa = gerarPessoa()

        PessoaPage.abrirModalNovoPedido()
        PessoaPage.clicarNovoCliente()

        PessoaPage.preencherNome(pessoa.nome)
        PessoaPage.preencherTelefone(pessoa.telefone)
        PessoaPage.salvarCliente()

        cy.get('#nc-nome').should('exist')

        cy.get('#new-order-cliente')
            .should('not.contain', pessoa.nome)
    })

    it('Dado que estou criando um novo cliente, quando não informo o telefone, e clico em salvar cliente, então o sistema permite o cadastro (BUG)', () => {
        const pessoa = gerarPessoa()

        PessoaPage.abrirModalNovoPedido()
        PessoaPage.clicarNovoCliente()

        PessoaPage.preencherNome(pessoa.nome)
        PessoaPage.preencherEmail(pessoa.email)

        PessoaPage.salvarCliente()

        PessoaPage.validarClienteNoSelect(pessoa.nome)
    })

    it.skip('Dado que o telefone é obrigatório, quando não informo o telefone, e clico em salvar cliente, então o sistema não deveria permitir o cadastro (REGRA DE NEGÓCIO)', () => {
        const pessoa = gerarPessoa()

        PessoaPage.abrirModalNovoPedido()
        PessoaPage.clicarNovoCliente()

        PessoaPage.preencherNome(pessoa.nome)
        PessoaPage.preencherEmail(pessoa.email)

        PessoaPage.salvarCliente()

        // comportamento esperado (MAS NÃO acontece)
        cy.get('#new-order-cliente')
            .should('not.contain', pessoa.telefone)
    })

})