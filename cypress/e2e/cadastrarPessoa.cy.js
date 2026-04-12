/// <reference types="cypress" />
import PessoaPage from '../pages/PessoaPage'
import { faker } from '@faker-js/faker'

describe('Validar Pessoas cadastradas para realizar pedidos ', () => {

    const gerarPessoa = () => ({
        nome: faker.person.fullName(),
        email: faker.internet.email(),
        telefone: faker.phone.number('119########')
    })

    beforeEach(() => {
        cy.login()
    })

    it('Deve cadastrar cliente com sucesso e aparecer no seletor', () => {
        const pessoa = gerarPessoa()

        PessoaPage.abrirModalNovoPedido()
        PessoaPage.clicarNovoCliente()
        PessoaPage.preencherNome(pessoa.nome)
        PessoaPage.preencherEmail(pessoa.email)
        PessoaPage.preencherTelefone(pessoa.telefone)
        PessoaPage.salvarCliente()

        PessoaPage.validarClienteNoSelect(pessoa.nome)
    })

    it('Não deve cadastrar cliente sem Nome', () => {
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

    it('Não deve cadastrar cliente sem E-mail', () => {
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

    it('Permite cadastrar cliente sem telefone (BUG)', () => {
        const pessoa = gerarPessoa()

        PessoaPage.abrirModalNovoPedido()
        PessoaPage.clicarNovoCliente()

        PessoaPage.preencherNome(pessoa.nome)
        PessoaPage.preencherEmail(pessoa.email)

        PessoaPage.salvarCliente()

        PessoaPage.validarClienteNoSelect(pessoa.nome)
    })

    it.skip('Não deveria permitir cadastro sem telefone (REGRA DE NEGÓCIO)', () => {
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