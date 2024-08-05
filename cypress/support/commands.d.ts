/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      tiles(): Chainable<string[]>
      words(): Chainable<string[]>
      fourtiles(): Chainable<string[]>
      foundWords(): Chainable<string[]>
      tilesForWord(word: string): Chainable<string[] | null>
      invalidWord(): Chainable<string[] | null>
      validWord(): Chainable<string[] | null>
      validFourtile(): Chainable<string[] | null>
      alreadyGuessedWord(): Chainable<string[] | null>
    }
  }
}

export {}
