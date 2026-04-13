/// <reference types="cypress" />

import FiltroPage from '../pages/FiltroPage'

describe('Filtro de Pedidos', () => {

    beforeEach(() => {
        cy.login()
    })

    it('Deve filtrar pedidos por nome do cliente', () => {

        FiltroPage.preencherNomeCliente('Bruno Santos')
        FiltroPage.buscar()

        FiltroPage.validarResultado('Bruno Santos')
    })

    it('Deve filtrar pedidos por intervalo de datas', () => {

        FiltroPage.preencherDataInicio('2025-02-01')
        FiltroPage.preencherDataFim('2025-02-15')
        FiltroPage.buscar()

        FiltroPage.validarListaVisivel()
    })

    it('Deve filtrar pedidos por valor mínimo', () => {

        FiltroPage.preencherValorMinimo('100')
        FiltroPage.buscar()

        FiltroPage.validarListaVisivel()
    })

    it('Deve combinar filtros (data + nome + valor)', () => {
        
        FiltroPage.preencherDataInicio('2025-02-01')
        FiltroPage.preencherDataFim('2025-02-15')
        FiltroPage.preencherNomeCliente('Bruno Santos')
        FiltroPage.preencherValorMinimo('100')

        FiltroPage.buscar()

        FiltroPage.validarResultado('Bruno Santos')
    })

    it('Deve limpar filtros corretamente', () => {

        FiltroPage.preencherDataInicio('2025-02-01')
        FiltroPage.preencherDataFim('2025-02-15')
        FiltroPage.preencherNomeCliente('Diego Costa')
        FiltroPage.preencherValorMinimo('100')
        FiltroPage.buscar()

        FiltroPage.limpar()

        cy.get('.filter-section').should('have.value', '')

        FiltroPage.validarListaVisivel()
    })

})