/// <reference types="cypress" />

import LoginPage from '../pages/LoginPage'

describe('Login', () => {

  const user = {
    valido: {
      email: 'admin@festival.com',
      senha: '123456'
    },
    invalido: {
      email_invalido: 'invalid-email',
      email: 'invalid@email.com',
      senha: '1234567'
    }
  }

  it('Deve realizar login com sucesso', () => {
    LoginPage.login(user.valido.email, user.valido.senha)
    LoginPage.validarSucesso()
  })

  it('Não deve logar com email inválido', () => {
    LoginPage.login(user.invalido.email, user.valido.senha)
    LoginPage.validarErro()
  })

  it('Não deve logar com senha inválida', () => {
    LoginPage.login(user.valido.email, user.invalido.senha)
    LoginPage.validarErro()
  })

  it('Não deve logar com email e senha inválidos', () => {
    LoginPage.login(user.invalido.email, user.invalido.senha)
    LoginPage.validarErro()
  })

  it.only('Não deve logar com email em formato inválido', () => {
    LoginPage.acessar()

    LoginPage.preencherEmail('email-invalido')
    LoginPage.preencherSenha('123456')

    LoginPage.submeter()

    // 🔍 valida que o campo está inválido (HTML5)
    cy.get('#email:invalid').should('exist')

    cy.get('#email')
      .then($input => {
        expect($input[0].validationMessage).to.not.be.empty
      })

  })

})