import { BasePage } from './BasePage'

export class FourtileStarsPanel extends BasePage {
  getFilledStars(): Cypress.Chainable {
    return cy.findAllByTestId('star-filled')
  }

  getOpenStars(): Cypress.Chainable {
    return cy.findAllByTestId('star-open')
  }
}
