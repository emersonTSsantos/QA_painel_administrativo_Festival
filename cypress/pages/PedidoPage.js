class PedidoPage {

    abrirNovoPedido() {
        cy.get('#btn-novo-pedido').click()
    }

    selecionarCliente(nome) {
        cy.get('#new-order-cliente').select(nome)
    }

    selecionarProduto(produto) {
        cy.get('#new-order-item-select').select(produto)
    }

    informarQuantidade(qtd) {
        cy.get('#new-order-item-qty').clear().type(qtd)
    }

    adicionarItem() {
        cy.get('#btn-add-item').click()
    }

    validarItemNoCarrinho(nomeProduto) {
        cy.get('.new-order__item-line')
            .should('contain', nomeProduto)
            .and('contain', 'x 1')
    }

    removerItem() {
        cy.get('.new-order__btn-remove').click()
    }

    confirmarPedido() {
        cy.get('.new-order__btn--primary').click()
    }

    cancelarPedido() {
        cy.get('#btn-cancel').click()
    }

}
export default new PedidoPage()