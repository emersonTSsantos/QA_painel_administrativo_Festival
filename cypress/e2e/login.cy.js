/// <reference types="cypress" />

import LoginPage from '../pages/LoginPage'

describe('Funcionalidade: Login', () => {

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

  it('Dado que estou na tela de login, quando informo credenciais válidas, então devo realizar login com sucesso', () => {
    LoginPage.login(user.valido.email, user.valido.senha)
    LoginPage.validarSucesso()
  })

  it('Dado que estou na tela de login, quando informo um email inválido, então não devo conseguir logar', () => {
    LoginPage.login(user.invalido.email, user.valido.senha)
    LoginPage.validarErro()
  })

  it('Dado que estou na tela de login, quando informo uma senha inválida, então não devo conseguir logar', () => {
    LoginPage.login(user.valido.email, user.invalido.senha)
    LoginPage.validarErro()
  })

  it('Dado que estou na tela de login, quando informo email e senha inválidos, então não devo conseguir logar', () => {
    LoginPage.login(user.invalido.email, user.invalido.senha)
    LoginPage.validarErro()
  })

  it('Dado que estou na tela de login, quando informo um email em formato inválido, então o sistema deve exibir validação de campo', () => { 
    LoginPage.acessar()

    LoginPage.preencherEmail('email-invalido')
    LoginPage.preencherSenha('123456')

    LoginPage.submeter()

    cy.get('#email:invalid').should('exist')

    cy.get('#email')
      .then($input => {
        expect($input[0].validationMessage).to.not.be.empty
      })
  })

})