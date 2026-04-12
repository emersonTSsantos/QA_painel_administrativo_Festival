class ProdutoPage {

    abrirMenu() {
        cy.get('#btn-menu').click()
    }

    acessarProdutos() {
        cy.get('[data-tab="produtos"]').click()
    }

    preencherNome(nome) {
        cy.get('[name="nome"]').clear().type(nome)
    }

    preencherDescricao(descricao) {
        cy.get('[name="descricao"]').clear().type(descricao)
    }

    preencherValor(valor) {
        cy.get('[name="valorUnitario"]').clear().type(valor)
    }

    salvarProduto() {
        cy.get('.products-section__btn').click()
    }

    validarProdutoNaLista(nome) {
        cy.contains(nome).should('be.visible')
    }

    validarQueNaoCadastrou(nome) {
        cy.contains(nome).should('not.exist')
    }
}

export default new ProdutoPage()