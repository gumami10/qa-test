/// <reference types="cypress"/>

context('todo page persistence', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('host'))
  })

  it('created todos should persist', () => {
    cy.addTodo('Aldair pereira o grandioso')

    cy.visit(Cypress.env('host'))

    cy.assertHowManyTodos(1)

    cy.get('body').should(() => {
      expect(localStorage.getItem('todos-vanillajs')).to.be.not.null
    })
  })

  it('completed todos should persist', () => {
    cy.addTodo('Aldair pereira o grandioso')

    cy.get('.toggle').check()
    cy.get('.toggle').should('be.checked')

    cy.visit(Cypress.env('host'))

    cy.assertHowManyTodos(1)

    cy.get('body').should(() => {
      expect(localStorage.getItem('todos-vanillajs')).to.be.not.null
    })
  })

  afterEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })
})
