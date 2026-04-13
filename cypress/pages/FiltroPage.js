class FiltroPage {

    preencherDataInicio(data) {
        cy.get('[name="dataInicio"]').clear().type(data)
    }

    preencherDataFim(data) {
        cy.get('[name="dataFim"]').clear().type(data)
    }

    preencherValorMinimo(valor) {
        cy.get('[name="valorMinimo"]').clear().type(valor)
    }

    preencherNomeCliente(nome) {
        cy.get('[name="nomeCliente"]').clear().type(nome)
    }

    buscar() {
        cy.get('.filter-section__btn--primary').click()
    }

    limpar() {
        cy.get('#btn-limpar').click()
    }

    validarResultado(nomeCliente) {
        cy.get('.order-card__client')
            .should('contain', nomeCliente)
    }

    validarListaVisivel() {
        cy.get('.order-card').should('be.visible')
    }
}

export default new FiltroPage()