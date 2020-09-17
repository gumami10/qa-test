/// <reference types="cypress"/>

context('todo page', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('host'))
  })

  // it('should be possible to add as many todos as user requires', () => {
  //   for(let i = 0; i < 10; i++) {
  //     cy.addTodo('Aldair pereira o grandioso')
  //   }
  //   cy.assertHowManyTodos(10)
  // })

  it('should be possible to finish a todo', () => {
    cy.addTodo('Aldair pereira o grandioso')

    cy.get('.toggle').check()
    cy.get('.toggle').should('be.checked')
  })

  it('should be possible edit a todo', () => {
    cy.addTodo('Aldair pereira o grandioso')

    cy.editTodo().type('{backspace}', {force: true})

    cy.get('.view > label').should('contain', 'Aldair pereira o grandios')
  })

  // teste está dando errado, a label não está aceitando a propriedade mouseover do JQuery, feels bad :(
  // it('should exclude a todo', () => {
  //   cy.addTodo('Aldair pereira o grandioso')

  //   cy.removeTodo()

  //   cy.assertHowManyTodos(0)
  // })

  it('should be possible to view according to filter', () => {
    cy.addTodo('Aldair pereira o grandioso')

    cy.get('.filters > :nth-child(2) > a').click()

    cy.assertHowManyTodos(1)

    cy.get('.filters > :nth-child(3) > a').click()

    cy.assertHowManyTodos(0)
  })

  it('should be possible to clean concluded tasks', () => {
    cy.addTodo('Aldair pereira o grandioso')

    cy.get('.toggle').check()
    cy.get('.toggle').should('be.checked')

    cy.get('.clear-completed').click()

    cy.assertHowManyTodos(0)
  })

  afterEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })
})
