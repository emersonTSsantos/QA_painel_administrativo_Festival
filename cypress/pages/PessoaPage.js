class PessoaPage {

    abrirModalNovoPedido() {
        cy.get('#btn-novo-pedido').click()
    }

    clicarNovoCliente() {
        cy.get('#btn-add-cliente').click()
    }

    preencherNome(nome) {
        cy.get('#nc-nome').type(nome)
    }

    preencherEmail(email) {
        cy.get('#nc-email').type(email)
    }

    preencherTelefone(telefone) {
        cy.get('#nc-telefone').type(telefone)
    }

    salvarCliente() {
        cy.get('#btn-save-cliente').click()
    }

    validarClienteNoSelect(nome) {
        cy.get('#new-order-cliente')
            .should('be.visible')
            .and('contain', nome)
    }

    validarErro(mensagem) {
        cy.contains(mensagem).should('be.visible')
    }
}

export default new PessoaPage()