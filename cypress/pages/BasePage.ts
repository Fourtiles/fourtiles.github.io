export class BasePage {
  protected wrap(chainable: Cypress.Chainable): this {
    void chainable
    return this
  }

  visit(path: string): this {
    return this.wrap(cy.visit(path))
  }
}
