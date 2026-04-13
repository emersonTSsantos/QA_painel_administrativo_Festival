/// <reference types="cypress" />

import FiltroPage from '../pages/FiltroPage'

describe('Funcionalidade: Filtro de Pedidos', () => {

    beforeEach(() => {
        cy.login()
    })

    it('Dado que informo o nome do cliente, e clico em Realizar busca, Então deve filtrar pedidos corretamente', () => {

        FiltroPage.preencherNomeCliente('Bruno Santos')
        FiltroPage.buscar()

        FiltroPage.validarResultado('Bruno Santos')
    })

    it('Dado que informo um intervalo de datas, e clico em Realizar busca, Então deve filtrar pedidos corretamente', () => {

        FiltroPage.preencherDataInicio('2025-02-01')
        FiltroPage.preencherDataFim('2025-02-15')
        FiltroPage.buscar()

        FiltroPage.validarListaVisivel()
    })

    it('Dado que informo um valor mínimo, e clico em Realizar busca, Então deve filtrar pedidos corretamente', () => {

        FiltroPage.preencherValorMinimo('100')
        FiltroPage.buscar()

        FiltroPage.validarListaVisivel()
    })

    it('Dado que combino filtros de data, nome e valor, e clico em Realizar busca, Então deve retornar resultados compatíveis', () => {
        
        FiltroPage.preencherDataInicio('2025-02-01')
        FiltroPage.preencherDataFim('2025-02-15')
        FiltroPage.preencherNomeCliente('Diego Costa')
        FiltroPage.preencherValorMinimo('10')

        FiltroPage.buscar()

        FiltroPage.validarResultado('Diego Costa')
    })

    it('Dado que aplico filtros e limpo a busca, e clico em Limpar, Então deve resetar os campos e exibir todos os pedidos', () => {

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