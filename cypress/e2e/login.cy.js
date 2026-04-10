/// <reference types="cypress" />

describe('template spec', () => {
  const url = 'https://desafio-feng-qa-ab3c59.gitlab.io/'

  beforeEach(() => {
    cy.visit(url)
  })

  const user = {
    email : 'admin@festival.com ',
    password : '123456'
  }

  it('Deve realizar login com sucesso', () => {
      cy.get('#email').type(user.email)
      cy.get('#password').type(user.password)
      cy.get('#login-submit').click()
      cy.get('.header__user-name').should('be.visible')
  })
})