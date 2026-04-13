Cypress.Commands.add('login', () => {
    cy.visit('/')
    cy.get('#email').type('admin@festival.com')
    cy.get('#password').type('123456')
    cy.get('#login-submit').click()
    cy.get('.header__user-name').should('be.visible')
})