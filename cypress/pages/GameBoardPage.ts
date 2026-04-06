import { BasePage } from './BasePage'

export class GameBoardPage extends BasePage {
  clickTile(tileName: string): this {
    return this.wrap(cy.findByRole('button', { name: tileName }).click())
  }

  clickTiles(tiles: string[]): this {
    tiles.forEach((tile) => cy.findByRole('button', { name: tile }).click())
    return this
  }

  clickAdd(): this {
    return this.wrap(cy.findByRole('button', { name: 'Add' }).click())
  }

  clickShuffle(): this {
    return this.wrap(cy.findByLabelText('Shuffle').click())
  }

  clickSort(): this {
    return this.wrap(cy.findByRole('button', { name: 'Sort' }).click())
  }

  getAllTiles(): Cypress.Chainable {
    return cy.findAllByTestId('tile')
  }

  getCurrentWord(): Cypress.Chainable {
    return cy.findByTestId('current-word')
  }

  submitWord(tiles: string[]): this {
    this.clickTiles(tiles)
    return this.clickAdd()
  }
}
