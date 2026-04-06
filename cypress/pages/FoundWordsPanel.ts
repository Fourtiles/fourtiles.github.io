import { BasePage } from './BasePage'

export class FoundWordsPanel extends BasePage {
  getWordsRemaining(): Cypress.Chainable {
    return cy.findByTestId('words-remaining')
  }

  getFoundWordsContainer(): Cypress.Chainable {
    return cy.findByTestId('found-words')
  }

  clickShowAllWords(): this {
    return this.wrap(cy.findByText('Show all words').click())
  }

  clickStartNewGame(): this {
    return this.wrap(cy.findByText('Start a new game').click())
  }
}
