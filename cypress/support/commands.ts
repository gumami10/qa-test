// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// Must be declared global to be detected by typescript (allows import/export)
// eslint-disable @typescript/interface-name
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable<Subject> {
      addTodo: (description: string) => void
      editTodo: () => Chainable<any>
      removeTodo: () => void
      assertHowManyTodos: (listLenght: number) => void
    }
  }
}

/**
 * Example:
 * Add Todo
 * with parameter description
 */
Cypress.Commands.add('addTodo', (description: string) => {
  cy.get('.new-todo').type(description + '\n')
})

/**
 * Example:
 * Edit Todo
 * Return chainable
 */
Cypress.Commands.add('editTodo', () => {
  cy.get('.view > label').dblclick()
  return cy.get('.edit')
})

/**
 * Example:
 * Remove Todo
 */
Cypress.Commands.add('removeTodo', () => {
  cy.get('.view').trigger('mouseover')
  cy.get('.destroy').click()
})

/**
 * Example:
 * Assert How many todos have in the list
 * parameter; lenght of the list
 */
Cypress.Commands.add('assertHowManyTodos', (listLength) => {
  cy.get('.todo-list').should(($list) => {
    expect($list[0].children).to.have.length(listLength)
  })
})

import 'cypress-file-upload'

// https://testing-library.com/docs/cypress-testing-library/intro
import '@testing-library/cypress/add-commands'

// Convert this to a module instead of script (allows import/export)
export {}
