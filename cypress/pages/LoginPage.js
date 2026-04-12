class LoginPage {

    acessar() {
        cy.visit('/')
    }

    preencherEmail(email) {
        cy.get('#email').clear().type(email)
    }

    validarEmailInvalido() {
        cy.get('#email:invalid').should('contain', '#email:invalid')
    }

    preencherSenha(senha) {
        cy.get('#password').clear().type(senha)
    }

    submeter() {
        cy.get('#login-submit').click()
    }

    validarSucesso() {
        cy.get('.header__user-name').should('be.visible')
    }

    validarErro() {
        cy.get('#login-error')
            .should('be.visible')
            .and('contain', 'E-mail ou senha inválidos.')
    }

    login(email, senha) {
        this.acessar()
        this.preencherEmail(email)
        this.preencherSenha(senha)
        this.submeter()
    }
}

export default new LoginPage()