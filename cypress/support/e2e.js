// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

afterEach(function () {
  const testName = this.currentTest.title
  .replace(/[^a-zA-Z0-9 ]/g, '') 
  .replace(/\s+/g, '-')
  .substring(0, 50)

  if (this.currentTest.state === 'passed') {
    cy.screenshot(`SUCESSO-${testName}`)
  }

  if (this.currentTest.state === 'failed') {
    cy.screenshot(`ERRO-${testName}`)
  }
})